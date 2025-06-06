import { Faq3 } from "@/components/faq3";
import { FeaturesSectionWithHoverEffects } from "@/components/feature-section-with-hover-effects";
import { Feature74 } from "@/components/feature74";
import { HeroSection } from "@/components/hero-section-1";
import { Pricing } from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import Wrapper from "@/components/Wrapper";

export default function Home() {
  const demoData = {
    heading: "Frequently asked questions",
    description:
      "Everything you need to know about shadcnblocks. Can't find the answer you're looking for? Feel free to contact our support team.",
    items: [
      {
        id: "faq-1",
        question: "What is RestauManager",
        answer:
          "shadcnblocks is a collection of ready-to-use block components built on top of shadcn/ui, designed to help you build beautiful websites faster.",
      },
      {
        id: "faq-2",
        question: "How do I install shadcnblocks?",
        answer:
          "shadcnblocks components are designed to be copied and pasted into your project. Simply browse the components, click on the one you want to use, and copy the code directly into your project. This gives you full control over the code and allows for easy customization.",
      },
      {
        id: "faq-3",
        question: "Is shadcnblocks free to use?",
        answer:
          "Yes, shadcnblocks is open-source and free to use in both personal and commercial projects. You can customize and modify the blocks to suit your needs.",
      },
      {
        id: "faq-4",
        question: "Can I customize the blocks?",
        answer:
          "Absolutely! All blocks are built with customization in mind. You can modify the styling, content, and behavior through props and Tailwind CSS classes.",
      },
      {
        id: "faq-5",
        question: "Do you offer support?",
        answer:
          "Yes, we provide support through our GitHub repository where you can report issues, suggest features, or ask questions about implementation.",
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
      <Feature74/>

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
