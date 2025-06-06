import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq3Props {
  heading: string;
  description: string;
  items?: FaqItem[];
  supportHeading: string;
  supportDescription: string;
  supportButtonText: string;
}

const faqItems = [
  {
    id: "faq-1",
    question: "Comment puis-je m'inscrire sur RestauManager ?",
    answer:
      "Cliquez sur le bouton 'Créer un compte', remplissez vos informations et suivez les étapes pour configurer votre restaurant.",
  },
  {
    id: "faq-2",
    question: "Puis-je gérer plusieurs restaurants avec un seul compte ?",
    answer:
      "Oui, RestauManager vous permet de gérer plusieurs établissements à partir d’un seul tableau de bord.",
  },
  {
    id: "faq-3",
    question: "Comment suivre mes commandes en temps réel ?",
    answer:
      "Une fois connecté, accédez à l’onglet 'Commandes' pour voir toutes les commandes en cours, en attente et terminées.",
  },
  {
    id: "faq-4",
    question: "Est-ce que je peux personnaliser mon menu ?",
    answer:
      "Oui, vous pouvez créer, modifier ou supprimer des plats à tout moment dans la section 'Menu' de votre interface.",
  },
  {
    id: "faq-5",
    question: "Quels moyens de paiement sont pris en charge ?",
    answer:
      "RestauManager prend en charge les paiements par carte bancaire, PayPal et espèces à la livraison si vous l’activez.",
  },
  {
    id: "faq-6",
    question: "Comment contacter l’assistance RestauManager ?",
    answer:
      "Vous pouvez nous écrire à support@restaumanager.com ou utiliser le chat en ligne disponible sur la plateforme.",
  },
  {
    id: "faq-7",
    question: "Y a-t-il une version d’essai gratuite ?",
    answer:
      "Oui, vous pouvez tester RestauManager gratuitement pendant 14 jours sans engagement.",
  },
];

const Faq3 = ({
  heading = "FAQs",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  items = faqItems,
  supportHeading = "Need more support?",
  supportDescription = "Our dedicated support team is here to help you with any questions or concerns. Get in touch with us for personalized assistance.",
  supportButtonText = "Contact Support",
}: Faq3Props) => {
  return (
    <section className=" p-5 sm:p-10  lg:p-15">
      <div className="container space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-accent p-4 text-center md:rounded-xl md:p-6 lg:p-8">
          <div className="relative">
            <Avatar className="absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-2.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <Avatar className="absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-3.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <Avatar className="mb-4 size-16 border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-1.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
          </div>
          <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
            {supportHeading}
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            {supportDescription}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto" asChild>
              <a href={"/"}>
                {supportButtonText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Faq3 };
