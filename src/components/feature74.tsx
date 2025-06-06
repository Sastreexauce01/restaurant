"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Feature74 = () => {
  const demoModules = [
    {
      name: "Gestion des commandes",
      description:
        "Prenez les commandes rapidement, transmettez-les en cuisine et suivez leur statut en temps réel. Interface intuitive adaptée aux besoins locaux",
      img: "https://shadcnblocks.com/images/block/placeholder-1.svg",
    },
    {
      name: "Gestion des commandes",
      description:
        "Prenez les commandes rapidement, transmettez-les en cuisine et suivez leur statut en temps réel. Interface intuitive adaptée aux besoins locaux",
      img: "https://shadcnblocks.com/images/block/placeholder-1.svg",
    },
    {
      name: "Gestion des commandes",
      description:
        "Prenez les commandes rapidement, transmettez-les en cuisine et suivez leur statut en temps réel. Interface intuitive adaptée aux besoins locaux",
      img: "https://shadcnblocks.com/images/block/placeholder-1.svg",
    },
    {
      name: "Gestion des commandes",
      description:
        "Prenez les commandes rapidement, transmettez-les en cuisine et suivez leur statut en temps réel. Interface intuitive adaptée aux besoins locaux",
      img: "https://shadcnblocks.com/images/block/placeholder-1.svg",
    },
    {
      name: "Gestion des commandes",
      description:
        "Prenez les commandes rapidement, transmettez-les en cuisine et suivez leur statut en temps réel. Interface intuitive adaptée aux besoins locaux",
      img: "https://shadcnblocks.com/images/block/placeholder-1.svg",
    },
  ];
  return (
    <section className=" px-5 sm:px-32 py-32  ">
      <div className="container flex flex-col gap-16 lg:px-16  ">
        <div className="   flex flex-col justify-center  items-center ">
          <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            Take Control of Your Restaurant
          </h2>
          <p className="mb-8 text-muted-foreground lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
            doloremque mollitia fugiat omnis! Porro facilis quo animi
            consequatur. Explicabo.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {demoModules.map(({ name, description, img }, i) => (
            <div
              key={i}
              className="overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8"
            >
              <div
                className={cn(
                  "flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12",
                  i % 2 === 0 && "md:order-last"
                )}
              >
                <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                  {name}
                </h3>
                <p className="text-muted-foreground lg:text-lg">
                  {description}
                </p>
              </div>

              <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
                <Image
                  src={img}
                  alt={name}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export { Feature74 };
