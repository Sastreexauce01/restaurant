"use server";
import { FormValues, AbonnementSelection } from "@/components/Formulaire";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { FedaPay, Transaction } from "fedapay";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/Email_Informations";
import { ReactElement } from "react";
import { User as userType } from "@/generated/prisma";
import { UTApi } from "uploadthing/server";
import generatorPdf from "@/components/pdfDocument";

// Configuration de FedaPay
FedaPay.setApiKey(process.env.FEDAPAY_API_KEY!);
FedaPay.setEnvironment(
  process.env.NODE_ENV === "production" ? "live" : "sandbox"
);

const resend = new Resend(process.env.RESEND_API_KEY);
const utapi = new UTApi();

export async function generateAccessKey(): Promise<string> {
  let key: string;
  let existingKey;

  do {
    const uuid = uuidv4().replace(/-/g, "");
    key =
      uuid.slice(0, 4) +
      "-" +
      uuid.slice(4, 8) +
      "-" +
      uuid.slice(8, 12) +
      "-" +
      uuid.slice(12, 16);

    existingKey = await prisma.user.findUnique({
      where: { accessKey: key },
    });
  } while (existingKey); // continue tant qu'une clé identique existe

  return key;
}

export async function addUser_Demo(formsValues: FormValues) {
  if (!formsValues) return { success: false, message: "Formulaire invalide." };

  try {
    const user = await prisma.user.create({
      data: {
        restaurantName: formsValues.restaurantName,
        fullName: formsValues.Name,
        email: formsValues.email,
        phone: formsValues.phone,
        address: formsValues.location,
        accessKey: await generateAccessKey(),
        dateExpiration: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 jours
      },
    });

    await sendEmail(user);

    revalidatePath("/");
    return { success: true, message: "Demande envoye  avec succès." };
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    return { success: false, message: "Erreur serveur." };
  }
}

// Ajoute un utilisateur avec abonnement payant

export async function addUser_Abonne(
  formsValues: FormValues,
  abonnementSelection: AbonnementSelection,
  transactionId: string
) {
  if (!formsValues || !abonnementSelection) {
    return { success: false, message: "Champs requis manquants." };
  }

  try {
    // Vérifier si l'email existe déj
    const user = await prisma.user.create({
      data: {
        type: "PAID",
        restaurantName: formsValues.restaurantName,
        fullName: formsValues.Name,
        email: formsValues.email,
        phone: formsValues.phone,
        address: formsValues.location,
        transactionId: transactionId,
        price: abonnementSelection.prixTotal,
        abonnementName: abonnementSelection.name,
        accessKey: await generateAccessKey(),
        dateExpiration: new Date(
          Date.now() + abonnementSelection.duree *30 * 24 * 60 * 60 * 1000
        ),
      },
    });

    await sendEmail(user);

    return { success: true, message: "Abonnement effectué avec succès" };
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    return { success: false, message: "Erreur serveur." };
  }
}

// fonction pour l'url de telechargement  le pdf

export async function uploadUrl(
  user: userType,
  pdfBuffer: Buffer
): Promise<string | null> {
  try {
    const fileName = `${user.restaurantName.toLowerCase()}-${Date.now()}.pdf`;

    // Créer un File à partir du buffer
    const file = new File([pdfBuffer], fileName, {
      type: "application/pdf",
    });

    const response = await utapi.uploadFiles([file]);

    if (response[0]?.data?.ufsUrl) {
      return response[0].data.ufsUrl;
    } else {
      console.error("Erreur upload UploadThing:", response[0]?.error);
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de l'upload du PDF:", error);
    return null;
  }
}
export async function sendEmail(user: userType) {
  try {
    const downloadUrl = await generatorPdf(user);

    if (!downloadUrl) {
      console.error("Échec génération du PDF.");
      return { success: false, message: "Échec de la génération du PDF" };
    }

    const { data, error } = await resend.emails.send({
     from: 'RestauManager <onboarding@resend.dev>',
      to: [user.email],
      subject: "Clé d'accès à votre espace",
      react: EmailTemplate({ user, downloadUrl }) as ReactElement,
    });

    if (error) {
      console.error("Erreur envoi email:", error);
      return { success: false, message: "Échec de l'envoi de l'email" };
    }

    console.log("Email envoyé:", data);
    return { success: true, message: "Email envoyé avec succès" };
  } catch (error) {
    console.error("Erreur dans sendEmail:", error);
    return { success: false, message: "Erreur serveur" };
  }
}


// Crée une transaction FedaPay
export async function createFedaPayTransaction(
  formsValues: FormValues,
  abonnementSelection: AbonnementSelection
) {
  if (!formsValues || !abonnementSelection) {
    throw new Error("Données de formulaire ou d'abonnement manquantes");
  }

  try {
    const transaction = await Transaction.create({
      description: `Abonnement ${abonnementSelection.name} - ${formsValues.restaurantName}`,
      amount: Math.round(abonnementSelection.prixTotal * 650),
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/Confirmation`,
      currency: {
        iso: "XOF",
      },
      customer: {
        firstname: formsValues.Name.split(" ")[0] || formsValues.Name,
        lastname: formsValues.Name.split(" ").slice(1).join(" ") || "",
        email: formsValues.email,
        phone_number: {
          number: formsValues.phone,
          country: "BJ",
        },
      },
      custom_metadata: {
        formsValues: JSON.stringify(formsValues),
        abonnementSelection: JSON.stringify(abonnementSelection),
      },
    });

    return {
      success: true,
      payment_url: transaction.payment_url,
      transaction_id: transaction.id,
    };
  } catch (error) {
    console.error("Erreur création transaction FedaPay:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Erreur lors de la création de la transaction",
    };
  }
}

// Traite le callback de paiement FedaPay
export async function handlePaymentCallback(transactionId: string) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { transactionId: transactionId },
    });

    if (existingUser) {
      return { success: true, message: "Utilisateur déjà enregistré." };
    }

    const transaction = await Transaction.retrieve(transactionId);
    console.log("Transaction récupérée:", transaction);

    if (transaction.status === "approved") {
     
      const data = transaction.custom_metadata;
      const formsValues = JSON.parse(data.forms_values); // ✔️
      const abonnementSelection = JSON.parse(data.abonnement_selection); // ✔️

      if (!formsValues || !abonnementSelection) {
        return { success: false, message: "Donnees manquantes " };
      }

      // Créer l'utilisateur après paiement réussi
      await addUser_Abonne(formsValues, abonnementSelection, transactionId);

      return { success: true, message: "Paiment  reussi " };
    } else {
      return { success: false, message: "Paiement échoué " };
    }
  } catch (error) {
    console.error("Erreur traitement callback:", error);
    return { success: false, message: "Erreur lors du traitement du paiement" };
  }
}
