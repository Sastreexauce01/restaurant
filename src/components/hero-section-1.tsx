/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "./ui/dialog";

import { Formulaire } from "./Formulaire";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  return (
    <>
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
        >
          <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section>
          <div className="relative pt-24 md:pt-36">
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 1,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className="absolute inset-0 -z-20"
            >
              <img
                src="https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120"
                alt="background"
                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
                width="3276"
                height="4095"
              />
            </AnimatedGroup>
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <h1 className="mt-8 max-w-4xl mx-auto font-semibold text-balance text-5xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                    Gérez votre restaurant en toute simplicité
                  </h1>
                  <p className="mx-auto mt-8 max-w-2xl text-balance text-lg">
                    Solution complète de gestion conçue spécifiquement pour les
                    restaurants africains. Commandes, stocks, personnel et
                    livraisons - tout en un seul endroit.
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div
                    key={1}
                    className="bg-foreground/10 rounded-[14px] border p-0.5"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="lg" className="rounded-xl px-5 text-base">
                          <span className="text-nowrap">
                            Demandez une Demo{" "}
                          </span>
                          <ArrowRight className="ml-2" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="w-full  sm:max-w-2xl lg:max-w-3xl bg-gray-100  ">
                        <DialogHeader className="flex flex-col ">
                          <DialogTitle className="text-lg font-semibold ">
                            <p className="flex items-center  font-lg   font-bold">
                              Restau
                              <span className="text-primary">Manager</span>
                            </p>
                          </DialogTitle>
                          <DialogDescription className="text-xs text-muted-foreground">
                            Complétez le formulaire et terminez le processus de
                            la demande
                          </DialogDescription>
                        </DialogHeader>
                        <Formulaire abonnementSelection={null} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div
                  aria-hidden
                  className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                />
                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                  <img
                    className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                    src="https://tailark.com//_next/image?url=%2Fmail2.png&w=3840&q=75"
                    alt="app screen"
                    width="2700"
                    height="1440"
                  />
                  <img
                    className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                    src="https://tailark.com/_next/image?url=%2Fmail2-light.png&w=3840&q=75"
                    alt="app screen"
                    width="2700"
                    height="1440"
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
        {/* Section partenaire */}
        <section className="bg-background pb-16 pt-16 md:pb-32">
          <div className="group relative m-auto max-w-5xl px-6">
            {/* <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
              <Link
                href="/"
                className="block text-sm duration-150 hover:opacity-75"
              >
                <span> Nos partenairess</span>

                <ChevronRight className="ml-1 inline-block size-3" />
              </Link>
            </div> */}
            <div className="-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/nvidia.svg"
                  alt="Nvidia Logo"
                  height="20"
                  width="auto"
                />
              </div>

              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/column.svg"
                  alt="Column Logo"
                  height="16"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/github.svg"
                  alt="GitHub Logo"
                  height="16"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/nike.svg"
                  alt="Nike Logo"
                  height="20"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                  alt="Lemon Squeezy Logo"
                  height="20"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/laravel.svg"
                  alt="Laravel Logo"
                  height="16"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-7 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/lilly.svg"
                  alt="Lilly Logo"
                  height="28"
                  width="auto"
                />
              </div>

              <div className="flex">
                <img
                  className="mx-auto h-6 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/openai.svg"
                  alt="OpenAI Logo"
                  height="24"
                  width="auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const menuItems = [
  { name: "Fonctionalites", href: "#features" },
  { name: "Tarifs", href: "#pricing" },
  { name: "FAQs", href: "#faqs" },
];

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2 group"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2 font-lg   font-bold"
              >
                {/* <Logo /> */}
                Restau<span className="text-primary">Manager</span>
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={cn(` hover:text-primary block duration-200`)}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background  group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                {/* <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={cn(isScrolled && "lg:hidden")}
                >
                  <Link href="#">
                    <span>Connexion</span>
                  </Link>
                </Button> */}
                <Button
                  asChild
                  size="sm"
                  className={cn(isScrolled && "sm:hidden")}
                >
                  <Link href="#pricing">
                    <span>S&apos;inscrire</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className={cn( isScrolled ? " hidden sm:inline-flex" : "hidden")}
                >
                  <Link href="#pricing">
                    <span>S&apos;inscrires</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default HeroHeader;
