"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addUser_Demo, createFedaPayTransaction } from "@/app/action";

import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { toast } from "react-toastify";

// 1. Schéma de validation
const formSchema = z.object({
  restaurantName: z.string().min(2, "Nom trop court"),
  Name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro invalide"),
  location: z.string().min(2, "Localisation requise"),
});

// 2. Type TypeScript dérivé du schéma
export type FormValues = z.infer<typeof formSchema>;

export interface AbonnementSelection {
  name: string;
  duree: number;
  prixMois: number;
  prixTotal: number;
}

export interface AbonnementSelectionProps {
  abonnementSelection: AbonnementSelection | null;
}

export function Formulaire({ abonnementSelection }: AbonnementSelectionProps) {
  // 3. Initialisation du formulaire
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      Name: "",
      email: "",
      phone: "01",
      location: "",
    },
  });

  // 4. Fonction de soumission
  const onSubmit = async (values: FormValues) => {
    try {
      if (!abonnementSelection) {
        const response = await addUser_Demo(values);
        if (response.success == true) {
          toast.success(response.message);
          return;
        }
        toast.error(response.message);
      } else {

        const payment_url = await createFedaPayTransaction(
          values,
          abonnementSelection
        );
        if (payment_url) {
          window.location.href = payment_url; // redirige vers FedaPay
        }
      }
      
    } catch (error) {
      toast.error("Erreur lors de la soumission");
      console.error("Erreur :", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="restaurantName"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel className="text-sm ">Nom du restaurant</FormLabel>
              <FormMessage />
              <FormControl className="py-4 ">
                <Input
                  placeholder="Le Gourmet"
                  {...field}
                  className="rounded-md ring-primary"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votre nom</FormLabel>
              <FormControl>
                <Input placeholder="Jean Dupont" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="0600000000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localisation</FormLabel>
              <FormControl>
                <Input placeholder="Cotonou,Benin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? "Envoi en cours..."
            : abonnementSelection == null
            ? "Finaliser la demande "
            : "Finaliser l'abonnement"}
        </Button>
      </form>
    </Form>
  );
}
