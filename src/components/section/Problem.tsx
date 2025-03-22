import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll } from "framer-motion";
import ProblemCard from "../Card/ProblemCard";

interface Problem {
  title: string;
  description: string;
  color: string;
}

gsap.registerPlugin(ScrollTrigger);

const problems: Problem[] = [
  {
    title: "Limite d'acces",
    description:
      "Absence de navigation au clavier pour les personnes avec un handicap",

    color: "#1e3a8a",
  },
  {
    title: "Difficulte de navigation",
    description:
      "Certains boutons et champs de formulaires ne sont pas bien lisibles ou accessibles et manque d’alternatives pour les personnes ayant des difficultés cognitives.",
    color: "#1e3a8a",
  },
  {
    title: "Interface complexe",
    description:
      "Trop d'éléments visuels, animations rapides, ou pop-ups peuvent gêner certaines personnes ayant des troubles cognitifs.",
    color: "#1e3a8a",
  },
  {
    title: "Securite",
    description:
      "Les captchas visuels sont une barrière pour les personnes malvoyantes.",
    color: "#1e3a8a",
  },
];

export const ProblemSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (!sectionRef.current || !circleRef.current) return;

    const circle = circleRef.current;
    const section = sectionRef.current;

    gsap.set(circle, {
      xPercent: -50,
      scale: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top top",
        scrub: 1,
        toggleActions: "play none none reverse",
        anticipatePin: 1,
      },
    });

    tl.to(circle, {
      scale: 50,
      duration: 2,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-white h-screen overflow-hidden flex items-center justify-center"
    >
      <div
        ref={circleRef}
        className="absolute top-[px] left-0 w-16 h-16 rounded-full bg-black z-0"
      />
      <div className="text-center">
        <h1 className="text-6xl md:text-9xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent animate-pulse p-10">
          Probleme ?
          <br />
        </h1>
        <div className="flex gap-4 z-10 justify-center items-center mr-[200px]">
          {problems.map((problem, index) => (
            <ProblemCard key={index} {...problem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemSection;
