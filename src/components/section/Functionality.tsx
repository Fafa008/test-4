import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextCard from "../Card/TextCard";
import { AnimatedCounter } from "../ui/Counter";

const fonctionnalites = [
  {
    title: "Fonctionnalité 1",
    description: "Description de la fonctionnalité 1",
    color: "#FF6B6B",
  },
  {
    title: "Fonctionnalité 2",
    description: "Description de la fonctionnalité 2",
    color: "#FFD93D",
  },
  {
    title: "Fonctionnalité 3",
    description: "Description de la fonctionnalité 3",
    color: "#1B9C85",
  },
];

// Initialiser ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Functionality: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContent = scrollRef.current;
    if (!container || !scrollContent) return;

    gsap.to(scrollContent, {
      x: () => -scrollContent.scrollWidth + container.clientWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollContent.scrollWidth - container.clientWidth}`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (scrollContent.childElementCount - 1),
          duration: 0.5,
          delay: 0.1,
        },
        anticipatePin: 1,
      },
    });

    // Animation pour countRef
    gsap.fromTo(
      countRef.current,
      { opacity: 0, y: 50, x: 100 }, // Starting properties
      { opacity: 1, y: 50, x: 100, duration: 1 } // Ending properties
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div
        ref={scrollRef}
        className="flex w-[400vw] h-full text-4xl text-white"
      >
        <div className="box w-screen h-screen flex-shrink-0 bg-white flex items-center justify-center">
          <TextCard />
        </div>
        <div className="box w-screen h-screen flex-shrink-0 bg-green-500 flex items-center justify-center">
          <TextCard />
        </div>
        <div className="box w-screen h-screen flex-shrink-0 bg-red-500 flex items-center justify-center">
          <TextCard />
        </div>
        <div className="box w-screen h-screen flex-shrink-0 bg-yellow-500 flex items-center justify-center">
          <TextCard />
        </div>
      </div>
    </div>
  );
};
export default Functionality;
