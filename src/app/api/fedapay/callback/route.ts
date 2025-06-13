/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { handlePaymentCallback } from "@/app/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    const transactionId = body?.id;

    if (!transactionId) {
      return NextResponse.json(
        { success: false, message: "ID manquant" },
        { status: 400 }
      );
    }
    const result = await handlePaymentCallback(transactionId);
    return NextResponse.json(result);

  } catch (error: any) {

    console.error(error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur", error: error.message },
      { status: 500 }
    );
  }
}


