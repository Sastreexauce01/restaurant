"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

// 1. Schéma de validation
const formSchema = z.object({
  restaurantName: z.string().min(2, "Nom trop court"),
  Name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro invalide"),
  location: z.string().min(2, "Localisation requise"),
});

// 2. Type TypeScript dérivé du schéma
type FormValues = z.infer<typeof formSchema>;

interface AbonnementSelection {
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
  const onSubmit = (values: FormValues) => {
    console.log("Form submitted:", values ,abonnementSelection);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="restaurantName"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel className="text-sm ">Nom du restaurant</FormLabel>
              <FormControl className="py-4 ">
                <Input
                  placeholder="Le Gourmet"
                  {...field}
                  className="rounded-md ring-primary"
                />
              </FormControl>
              <FormMessage />
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
            : "Finaliser l'abonnement"}
        </Button>
      </form>
    </Form>
  );
}
