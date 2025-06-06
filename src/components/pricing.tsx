"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Minus, Star } from "lucide-react";
// import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Formulaire } from "./Formulaire";

// import { DialogClose } from "@radix-ui/react-dialog";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  total: number;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}
interface AbonnementType {
  duree: number;
  reduction: number;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 100,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--secondary))",
          "hsl(var(--muted))",
        ],
        ticks: 500,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  const AbonnemnentTime = [
    {
      duree: 1,
      reduction: 0,
    },

    {
      duree: 12,
      reduction: 20,
    },
    {
      duree: 48,
      reduction: 35,
    },
  ];

  interface AbonnementSelection {
    name: string;
    duree: number;
    prixMois: number;
    prixTotal: number;
  }

  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [step, setStep] = useState(0);

  const [selectPricing, setselectPricing] = useState<AbonnementType>(
    AbonnemnentTime[2]
  );

  const [abonnementSelection, setAbonnementSelection] =
    useState<AbonnementSelection | null>(null);

  const priceTotal = (priceMonth: number, duration: number) => {
    return Number((duration * priceMonth).toFixed(2));
  };

  const priceMonth = (price: number, reduction: number) => {
    return Number((price - (price * reduction) / 100).toFixed(2));
  };

  useEffect(() => {
    if (selectedPlan) {
      const prixMois = priceMonth(
        Number(selectedPlan.price),
        selectPricing.reduction
      );
      const prixTotal = priceTotal(prixMois, selectPricing.duree);

      setAbonnementSelection({
        name: selectedPlan.name,
        duree: selectPricing.duree,
        prixMois,
        prixTotal,
      });
    }
  }, [selectedPlan, selectPricing]);

  return (
    <div className="container py-20 " id="pricing">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg whitespace-pre-line">
          {description}
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <label className="relative inline-flex items-center cursor-pointer">
          <Label>
            <Switch
              ref={switchRef as never}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative"
            />
          </Label>
        </label>
        <span className="ml-2 font-semibold">
          Bilan Annuel <span className="text-primary">( Reduction 20 %)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 sm:2  gap-4 ">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                  }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative`,
              plan.isPopular ? "border-primary border-2" : "border-border",
              "flex flex-col",
              !plan.isPopular && "mt-5",
              index === 0 || index === 2
                ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                : "z-10",
              index === 0 && "origin-right",
              index === 2 && "origin-left"
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                <Star className="text-primary-foreground h-4 w-4 fill-current" />
                <span className="text-primary-foreground ml-1 font-sans font-semibold">
                  Populaire
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-base font-semibold  text-muted-foreground ">
                {plan.name}
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  <NumberFlow
                    value={
                      isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                    }
                    transformTiming={{
                      duration: 500,
                      easing: "ease-out",
                    }}
                    willChange
                    className="font-variant-numeric: tabular-nums"
                  />
                  €
                </span>
                {plan.period !== "Next 3 months" && (
                  <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                    / {plan.period}
                  </span>
                )}
              </div>

              <p className="text-xs leading-5 text-muted-foreground">
                {isMonthly ? "bilan mensuel" : "bilan annuel"}
              </p>

              <ul className="mt-5 gap-2 flex flex-col">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    {idx <= plan.total ? (
                      <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    ) : (
                      <Minus className="h-4 w-4 text-ring mt-1 flex-shrink-0" />
                    )}

                    <span className="text-left">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-4" />

              <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
                <DialogTrigger asChild>
                  <Button
                    // href={plan.href}
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                      "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground",
                      plan.isPopular
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-foreground"
                    )}
                    onClick={() => {
                      setSelectedPlan(plan);
                      setOpen(true);
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </DialogTrigger>

                <DialogContent
                  // // ✅ Utilisez plutôt cette approche :
                  onInteractOutside={(e) => {
                    // Permettre la fermeture au step 0, demander confirmation au step 1
                    if (step === 1) {
                      e.preventDefault();
                      // Optionnel : afficher une confirmation
                      if (
                        confirm(
                          "Êtes-vous sûr de vouloir fermer ? Vos données seront perdues."
                        )
                      ) {
                        setOpen(false);
                        setStep(0); // Réinitialiser le step
                      }
                    }
                    // Sinon, laisser la fermeture normale se faire
                  }}
                  onEscapeKeyDown={(e) => {
                    if (step === 1) {
                      e.preventDefault();
                      if (
                        confirm(
                          "Êtes-vous sûr de vouloir fermer ? Vos données seront perdues."
                        )
                      ) {
                        setOpen(false);
                        setStep(0);
                      }
                    }
                  }}
                  className="w-full sm:max-w-3xl lg:max-w-5xl bg-gray-100"
                >
                  {step === 0 && (
                    <div className=" flex flex-col p-5 ">
                      <DialogTitle className="text-lg  font-semibold  ">
                        Abonnment {selectedPlan?.name}
                      </DialogTitle>

                      <DialogDescription className="py-2 text-xs ">
                        Choisissez une période de facturation et terminez le
                        processus d&lsquo;achat
                      </DialogDescription>

                      <div className="flex   flex-col-reverse  ">
                        {AbonnemnentTime.map(({ duree, reduction }) => (
                          <div
                            key={duree}
                            className={cn(
                              "border rounded-xs   cursor-pointer  flex flex-row py-2 px-5 gap-6 items-center justify-between mt-2  duration-100 ease-in",
                              duree === selectPricing?.duree
                                ? "border-primary  "
                                : ""
                            )}
                            onClick={() =>
                              setselectPricing({ duree, reduction })
                            }
                          >
                            <p className="font-normal text-xs ">
                              {duree} mois{" "}
                            </p>

                            {reduction != 0 && (
                              <p className="  rounded-md  p-1  text-xs font-mono bg-primary/10 ">
                                Reduction -{reduction}%
                              </p>
                            )}

                            <div className="flex flex-col sm:flex-row  items-center gap-1">
                              {reduction != 0 && (
                                <p className="  line-through  p-1 text-gray-500   font-semibold ">
                                  {selectedPlan?.price}€
                                </p>
                              )}

                              <p className="bg-gray-200  p-2   text-xs  rounded-md font-semibold ">
                                {priceMonth(
                                  Number(selectedPlan?.price),
                                  reduction
                                )}
                                €<span className="font-light"> /mois</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-row justify-between py-4 mt-4">
                        <h1 className="font-semibold text-2xl  ">Total</h1>
                        <p className="font-bold text-2xl ">
                          {priceTotal(
                            priceMonth(
                              Number(selectedPlan?.price),
                              selectPricing?.reduction
                            ),
                            selectPricing?.duree
                          )}
                          €
                        </p>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="flex flex-col-reverse sm:flex-row gap-4 p-2 overflow-y-auto">
                      <div className="flex flex-col bg-white border rounded-lg p-2 w-full sm:w-1/3  shadow-sm">
                        <DialogTitle className="text-xs sm:text-lg  pt-4  font-semibold  ">
                          Récapitulatif de l’abonnement
                        </DialogTitle>
                        <div className="my-8">
                          <div className="flex justify-between py-3 border-b ">
                            <p className="font-mono text-sm ">Plan </p>
                            <p className="font-medium text-sm ">
                              {selectedPlan?.name}
                            </p>
                          </div>

                          <div className="flex justify-between py-3 border-b">
                            <p className="font-mono text-sm ">Duree</p>
                            <p className="font-medium text-sm">
                              {abonnementSelection?.duree} mois{" "}
                            </p>
                          </div>

                          <div className="flex justify-between py-3 border-b">
                            <p className="font-mono text-sm "> Prix/mois</p>

                            <p className="font-medium text-sm">
                              {abonnementSelection?.prixMois}€
                            </p>
                          </div>

                          <div className="flex justify-between  py-3  font-semibold">
                            <p className="font-bold font-lg">Total</p>
                            <p className="font-bold font-lg ">
                              {abonnementSelection?.prixTotal} €
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="w-full sm:w-2/3 bg-white shadow-sm p-5 rounded-lg border  ">
                        <DialogHeader>
                          <DialogTitle className="text-lg font-semibold ">
                            Abonnement {selectedPlan?.name}
                          </DialogTitle>
                          <DialogDescription className="text-xs text-muted-foreground">
                            Complétez le formulaire et terminez le processus
                            d’abonnement
                          </DialogDescription>
                        </DialogHeader>
                        <Formulaire abonnementSelection={abonnementSelection} />
                      </div>
                    </div>
                  )}

                  <DialogFooter>
                    <Button
                      variant={"outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        if (step == 0) {
                          setOpen(false);
                        } else {
                          setStep(0);
                        }
                      }}
                    >
                      {step === -0 ? "  Annuler" : "retour"}
                    </Button>

                    <Button
                      className={cn("bg-primary", step == 1 && "hidden")}
                      onClick={() => setStep(step + 1)}
                    >
                      {step === 1 ? "  Finaliser l'abonnement" : "continuer"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <p className="mt-6 text-xs leading-5 text-muted-foreground">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
