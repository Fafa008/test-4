"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import ProblemCard from "../Card/ProblemCard";

interface Problem {
  title: string;
  description: string;
  color: string;
}

const problems: Problem[] = [
  {
    title: "Limite d'accès",
    description:
      "Absence de navigation au clavier pour les personnes avec un handicap",
    color: "#1e3a8a",
  },
  {
    title: "Difficulté de navigation",
    description:
      "Certains boutons et champs de formulaires ne sont pas bien lisibles ou accessibles et manque d'alternatives pour les personnes ayant des difficultés cognitives.",
    color: "#1e3a8a",
  },
  {
    title: "Interface complexe",
    description:
      "Trop d'éléments visuels, animations rapides, ou pop-ups peuvent gêner certaines personnes ayant des troubles cognitifs.",
    color: "#1e3a8a",
  },
  {
    title: "Sécurité",
    description:
      "Les captchas visuels sont une barrière pour les personnes malvoyantes.",
    color: "#1e3a8a",
  },
];

export const ProblemSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    if (
      !sectionRef.current ||
      !circleRef.current ||
      !titleRef.current ||
      !cardsContainerRef.current
    )
      return;

    const section = sectionRef.current;
    const circle = circleRef.current;
    const title = titleRef.current;
    const cardsContainer = cardsContainerRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    // Reset any previous animations
    gsap.set(circle, {
      xPercent: -50,
      yPercent: -50,
      scale: 0.5,
      opacity: 0,
    });

    gsap.set(cards, {
      y: 100,
      opacity: 0,
      scale: 0.8,
    });

    gsap.set(title, {
      opacity: 0,
      y: -50,
    });

    // Create main timeline for initial animations
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "center center",
        toggleActions: "play none none reverse",
        scrub: false,
      },
    });

    // Circle animation
    mainTl.to(circle, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out",
    });

    // Title animation
    mainTl.to(
      title,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      },
      "-=0.5"
    );

    // Create a separate timeline for the circle expansion on scroll
    const circleTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 30%",
        end: "bottom 70%",
        scrub: 1.5,
      },
    });

    circleTl.to(circle, {
      scale: 25,
      opacity: 0.15,
      duration: 3,
      ease: "power1.inOut",
    });

    // Individual scroll-triggered animations for each card
    cards.forEach((card, index) => {
      // Create a scroll trigger for each card
      gsap.fromTo(
        card,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotateX: -10,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsContainer,
            start: `top ${80 - index * 5}%`, // Stagger the start position
            end: `center ${70 - index * 5}%`,
            toggleActions: "play none none reverse",
            scrub: 0.5, // Smooth animation tied to scroll
            // markers: true, // Uncomment for debugging
          },
        }
      );

      // Add a subtle parallax effect on scroll
      gsap.to(card, {
        y: -20 + index * 5,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hover animations for cards
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -15,
          scale: 1.05,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    return () => {
      // Clean up all animations
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([circle, title, cards, cardsContainer]);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div
        ref={circleRef}
        className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-blue-900 opacity-55 z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2
          ref={titleRef}
          className="text-6xl md:text-8xl font-extrabold text-center mb-16 opacity-0"
        >
          <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
            Problème ?
          </span>
        </h2>

        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {problems.map((problem, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="transform transition-all duration-300 ease-in-out"
            >
              <ProblemCard {...problem} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
