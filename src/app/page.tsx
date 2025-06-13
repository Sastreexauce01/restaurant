import { Faq3 } from "@/components/faq3";
import { FeaturesSectionWithHoverEffects } from "@/components/feature-section-with-hover-effects";
import { Feature74 } from "@/components/feature74";
import { HeroSection } from "@/components/hero-section-1";
import { Pricing } from "@/components/pricing";
import Testimonials from  "@/components/testimonials";
import Wrapper from "@/components/Wrapper";

export default function Home() {
  const demoData = {
    heading: "FAQs",
    description:
      "Everything you need to know about shadcnblocks. Can't find the answer you're looking for? Feel free to contact our support team.",
    items: [
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
    ],
    supportHeading: "Vous avez encore des questions ?",
    supportDescription:
      "Vous ne trouvez pas la réponse que vous cherchez ? Notre équipe d’assistance est là pour vous aider avec toutes vos questions ou préoccupations techniques.",
    supportButtonText: "Contact Support",
    supportButtonUrl: "https://shadcnblocks.com",
  };

  const demoPlans = [
    {
      name: "Premium",
      price: "49.99",
      yearlyPrice: "39.99",
      period: "par mois",
      total: 2,
      features: [
        "Gestion des commandes",
        "Gestion des stocks",
        "Gestion du personnel",
        "Gestion des tâches",
        "Analyse des performances",
        "Boutique virtuelle",
        "Support prioritaire",
      ],
      description: "Parfait pour les petits projets restaurants",
      buttonText: "Selctionner",
      href: "/",
      isPopular: false,
    },
    {
      name: "Business",
      price: "99.99",
      yearlyPrice: "79.99",
      period: "par mois",
      total: 4,
      features: [
        "Gestion des commandes",
        "Gestion des stocks",
        "Gestion du personnel",
        "Gestion des tâches",
        "Analyse des performances",
        "Boutique virtuelle",
        "Support prioritaire",
      ],
      description: "Idéal pour les équipes et les entreprises en croissance",
      buttonText: "Selctionner",
      href: "/",
      isPopular: true,
    },
    {
      name: "Cloud Startup",
      price: "299.99",
      yearlyPrice: "239.99",
      period: "par mois ",
      total: 6,
      features: [
        "Gestion des commandes",
        "Gestion des stocks",
        "Gestion du personnel",
        "Gestion des tâches",
        "Analyse des performances",
        "Boutique virtuelle",
        "Support prioritaire",
      ],
      description:
        "Pour les grandes organisations ayant des besoins spécifiques",
      buttonText: "Selctionner",
      href: "/",
      isPopular: false,
    },
  ];

  return (
    <Wrapper>
      <HeroSection />

      {/* Description  */}
      <Feature74 />

      <FeaturesSectionWithHoverEffects />

      {/* Temoignage */}
      <Testimonials />

      {/* Tarif */}
      <Pricing
        plans={demoPlans}
        title="Choisissez votre plan idéal"
        description="Commencez en toute confiance. Notre garantie satisfait ou remboursé de 30 jours vous assure une utilisation sans risque."
      />

      {/* FAQs */}
      <Faq3 {...demoData} />
    </Wrapper>
  );
}
