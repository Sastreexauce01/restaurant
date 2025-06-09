import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateAccessKey } from "@/app/action";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const transactionId = body.transaction_id;

    if (!transactionId) {
      return NextResponse.json(
        { error: "ID de transaction manquant" },
        { status: 400 }
      );
    }

    // On récupère les infos depuis FedaPay
    const response = await fetch(
      `https://sandbox-api.fedapay.com/v1/transactions/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FEDAPAY_API_KEY!}`,
          Accept: "application/json",
        },
      }
    );

    const { transaction } = await response.json();

    if (transaction.status === "approved") {
      // Créer l’abonnement en base

      await prisma.user.create({
        data: {
          restaurantName: transaction.metadata.firstname,
          fullName: `${transaction.customer.firstname} ${transaction.customer.lastname}`,
          email: transaction.customer.email,
          phone: transaction.customer.phone_number.number,
          address: "-", // optionnel
          abonnementName: transaction.description,
          price: transaction.amount,
          accessKey: await generateAccessKey(),
          dateExpiration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          transactionId: transaction.id.toString(),
        },
      });
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Transaction non approuvée" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Erreur callback:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
