"use client";

import Wrapper from "@/components/Wrapper";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { handlePaymentCallback } from "../server";

const Page = () => {
  const params = useSearchParams();
  const status = params.get("status");
  const transactionId = params.get("id");
  const isApproved = status === "approved";

  useEffect(() => {
    const checkTransaction = async () => {
      if (!transactionId) return;

      const response = await handlePaymentCallback(transactionId);

      if (response.success) {
        toast.success(response.message);
        // redirect("/Confirmation");
      } else {
        toast.error(response.message);
      }
    };

    checkTransaction();
  }, [transactionId]);

  return (
    <Wrapper>
      <div className="text-center py-32 px-8">
        <h1 className="text-2xl font-bold mb-4">
          {isApproved ? "✅ Paiement validé" : "❌ Paiement non confirmé"}
        </h1>
        <p className="text-gray-600">
          {isApproved
            ? "Votre inscription a bien été prise en compte. Vous recevrez un e-mail de confirmation sous peu."
            : "Une erreur est survenue ou le paiement n’a pas été finalisé. Veuillez réessayer."}
        </p>
      </div>
    </Wrapper>
  );
};

export default Page;
