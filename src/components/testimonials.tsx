/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "motion/react";


// Définition du type pour un témoignage
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
} 
export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full" key={i}>
                  <div>{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};



const testimonials = [
  {
    text: "RestauManager a révolutionné nos opérations en simplifiant la gestion financière et des stocks. La plateforme cloud nous permet de rester productifs, même à distance.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Responsable des opérations",
  },
  {
    text: "La mise en place de RestauManager a été fluide et rapide. L'interface personnalisable et intuitive a rendu la formation de l’équipe très simple.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "Responsable informatique",
  },
  {
    text: "L'équipe de support de RestauManager est exceptionnelle. Elle nous a guidés durant l'installation et continue de nous accompagner efficacement.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Responsable du support client",
  },
  {
    text: "L’intégration de RestauManager a été fluide et a considérablement amélioré notre efficacité. Je recommande fortement cette solution pour son interface intuitive.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "PDG",
  },
  {
    text: "Grâce à ses fonctionnalités puissantes et à son support réactif, RestauManager a transformé notre manière de travailler.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Cheffe de projet",
  },
  {
    text: "La mise en œuvre de RestauManager a dépassé nos attentes. Il a simplifié nos processus et amélioré notre performance globale.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Analyste d'affaires",
  },
  {
    text: "Nos opérations commerciales se sont améliorées grâce à RestauManager et aux retours positifs de nos clients.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Directeur marketing",
  },
  {
    text: "RestauManager a su répondre à nos besoins en livrant une solution qui a dépassé nos attentes et amélioré nos opérations.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Responsable des ventes",
  },
  {
    text: "Avec RestauManager, notre présence en ligne et notre taux de conversion ont fortement progressé, boostant nos performances commerciales.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "Responsable e-commerce",
  },
];
const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            Ce que les clients disent
          </h2>
          <p className="text-center mt-5 opacity-75">
            Voir ce nos clients disent a propos de nous .
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
