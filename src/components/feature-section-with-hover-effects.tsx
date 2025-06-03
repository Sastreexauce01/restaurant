import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHelp,
} from "@tabler/icons-react";

import { ChartLine, ListTodo, TruckElectric, Users } from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Gestion des tâches",
      description:
        "Organisez le nettoyage, les préparations et toutes les tâches quotidiennes.",
      icon: <ListTodo  size={32} color="var(--primary)"/>,
    },
    {
      title: "Facilité d'utilisation",
      description:
        "Aussi simple à utiliser qu’un produit Apple… aussi coûteux aussi ? 😅.",
      icon: <IconEaseInOut  size={32} color="var(--primary)"/>,
    },
    {
      title: "Tarification inégalée",
      description:
        "Des prix imbattables. Sans engagement, sans carte bancaire, sans triche",
      icon: <IconCurrencyDollar size={32} color="var(--primary)" />,
    },

    {
      title: "Gestion du personnel",
      description: "Accès personnalisés selon le rôle de chaque employé.",
      icon: <Users  size={32} color="var(--primary)" />,
    },
    {
      title: " Support client 24/7",
      description:
        "Toujours disponibles. Enfin, nos agents IA le sont en tout cas.",
      icon: <IconHelp size={32} color="var(--primary)" />,
    },
    {
      title: " satisfait ou remboursé",
      description:
        "Si vous n’aimez pas EveryAI, on saura vous faire changer d’avis..",
      icon: <IconAdjustmentsBolt  size={32} color="var(--primary)"/>,
    },

    {
      title: "Gestion de livraison",
      description:
        "Optimisez vos livraisons : suivez, attribuez, livrez efficacement.",
      icon: <TruckElectric  size={32} color="var(--primary)" />,
    },
    {
      title: "Rapports et statistiques",
      description: "Prenez des décisions basées sur des données concrètes.",
      icon: <ChartLine  size={32} color="var(--primary)"/>,
    },
  ];
  return (
    <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}

      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
