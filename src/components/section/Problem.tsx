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
    title: "Manque de données fiables",
    description:
      "L'accès à des données précises est limité, ce qui complique l'analyse et la prise de décision.",
    color: "#FF6B6B",
  },
  {
    title: "Contraintes budgétaires",
    description:
      "Les ressources financières limitées entravent la mise en œuvre de solutions adéquates.",
    color: "#FFD93D",
  },
  {
    title: "Conditions environnementales",
    description:
      "Les variations climatiques rendent difficile la stabilité des projets à long terme.",
    color: "#1B9C85",
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
        className="absolute top-[-50px] left-0 w-16 h-16 rounded-full bg-black z-0"
      />
      <h2 className="text-3xl font-bold text-center mb-8">
        Problèmes de l'Étude
      </h2>
      <div className="flex gap-4 z-10 justify-center items-center mr-[200px]">
        {problems.map((problem, index) => (
          <ProblemCard key={index} {...problem} />
        ))}
      </div>
    </div>
  );
};

export default ProblemSection;
