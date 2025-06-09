/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { accessKey } = body;

    if (!accessKey || typeof accessKey !== "string") {
      return NextResponse.json(
        { success: false, message: "Clé requise et doit être une chaîne" },
        { status: 400 }
      );
    }

    // Formatage correct de la clé
    const formatAcceskey = accessKey.toLowerCase();

    // Vérification dans la base de données
    const existingUser = await prisma.user.findUnique({
      where: { accessKey: formatAcceskey },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Clé inexistante ou utilisateur introuvable",
        },
        { status: 400 }
      );
    }

    // Vérifier que la clé n'est pas expirée
    const now = new Date();
    const expirationDate = new Date(existingUser.dateExpiration);

    if (expirationDate < now) {
      return NextResponse.json(
        { success: false, message: "Clé expirée ou invalide" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Clé valide", data: existingUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur de vérification", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur", error: error.message },
      { status: 500 }
    );
  }
}
