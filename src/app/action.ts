"use server";
import { FormValues, AbonnementSelection } from "@/components/Formulaire";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { FedaPay, Transaction } from "fedapay";

// Configuration de FedaPay
FedaPay.setApiKey(process.env.FEDAPAY_API_KEY!);
FedaPay.setEnvironment("sandbox"); // ou 'live' en production

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
    const existingUser = await prisma.user.findUnique({
      where: { email: formsValues.email },
    });

    if (existingUser) {
      return { success: false, message: "Cet email existe déjà." };
    }

    await prisma.user.create({
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

    revalidatePath("/");

    return { success: true, message: "Utilisateur ajouté avec succès." };
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    return { success: false, message: "Erreur serveur." };
  }
}


export async function addUser_Abonne(
  formsValues: FormValues,
  abonnementSelection: AbonnementSelection
) {
  try {
    if (!formsValues || !abonnementSelection) {
      return { success: false, message: "Champs requis." };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: formsValues.email },
    });

    if (!existingUser) {
      // Creation
      await prisma.user.create({
        data: {
          type: "PAID",
          restaurantName: formsValues.restaurantName,
          fullName: formsValues.Name,
          email: formsValues.email,
          phone: formsValues.phone,
          address: formsValues.location,
          // transactionId:
          price: abonnementSelection.prixTotal,
          abonnementName: abonnementSelection.name,
          accessKey: await generateAccessKey(),
          dateExpiration: new Date(
            Date.now() + abonnementSelection.duree * 24 * 60 * 60 * 1000
          ), 
        },
      });

      return { success: true, message: "Abonnenment effectue avec succes" };
    } else {


      //  Mise a jour 
      await prisma.user.update({
        where:{
          email:formsValues.email
        },
        data:{
          abonnementName: abonnementSelection.name,
          price: abonnementSelection.prixTotal,
          accessKey: await generateAccessKey(),
          dateExpiration: new Date(
            Date.now() + abonnementSelection.duree * 24 * 60 * 60 * 1000
          ),  // a revoir pour les user etant en cours d'abonnement
        }
      })
       
      return { success: true, message: "Cet email existe déjà." };
    }
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    return { success: false, message: "Erreur serveur." };
  }
}

export async function createFedaPayTransaction(
  formsValues: FormValues,
  abonnementSelection: AbonnementSelection
) {
  try {
    // verifier si l'email existe deja
    const transaction = await Transaction.create({
      description: "Description",
      amount: 2000,
      callback_url: "http://localhost:3000/",
      currency: {
        iso: "XOF",
      },
      customer: {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        phone_number: {
          number: "90090909",
          country: "BJ",
        },
      },
      metadata: {
        formsValues,
        abonnementSelection,
      },
    });

    console.log("nouvelle:", transaction);

    // Rediriger l’utilisateur vers la page de paiement

    return transaction.payment_url;
  } catch (error) {
    console.error("Erreur création transaction FedaPay:", error);
    return {};
  }
}

