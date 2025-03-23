import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextCard from "../Card/TextCard";

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

  const features = [
    "Adapte le contraste",
    "Ajoute une assistance AI",
    "Augmente la taille du texte",
    "Visibilité par rapport aux visiteurs",
  ]
  
  // Icône personnalisée pour le badge
  const eyeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  )

  const featuresCognitive = [
    "Interface simplifiée",
    "Navigation intuitive",
    "Contenu adaptatif",
    "Aide contextuelle",
  ]

  const brainIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    > 
      <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0 1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5"></path>
      <path d="m15.7 10.4-.9.4"></path>
      <path d="m9.2 13.2-.9.4"></path>
      <path d="m13.6 15.7-.4-.9"></path>
      <path d="m10.8 9.2-.4-.9"></path>
      <path d="m15.7 13.5-.9-.4"></path>
      <path d="m9.2 10.9-.9-.4"></path>
      <path d="m10.5 15.7.4-.9"></path>
      <path d="m13.1 9.2.4-.9"></path>
    </svg>
  )

  const featuresMotor = [
    "Commandes vocales",
    "Cibles élargies",
    "Raccourcis clavier",
    "Délai ajustable",
  ]

  const micIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" x2="12" y1="19" y2="22"></line>
    </svg>
  )
  

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div
        ref={scrollRef}
        className="flex w-[400vw] h-full text-4xl text-white"
      >
        <div className="box w-screen h-screen flex-shrink-0 flex items-center justify-center">
          
      <TextCard
        features={features}
        deficiencyType="Déficience Visuelle"
        badgeIcon={eyeIcon}
        imageSrc="/assets/img/visuel1.jpg"
        imageAlt="Description de l'image"
      />
        </div>
        <div className="box w-screen h-screen flex-shrink-0 flex items-center justify-center">
        <TextCard 
          features={featuresMotor}
          deficiencyType="Déficience Motrice"
          badgeIcon={micIcon}
          imageSrc="/assets/img/motrice.jpg"
          imageAlt="Description de l'image"
        />
        </div>
        <div className="box w-screen h-screen flex-shrink-0 flex items-center justify-center">
          <TextCard 
            features={featuresCognitive}
            deficiencyType="Déficience Cognitive"
            badgeIcon={brainIcon}
            imageSrc="/assets/img/cognitive.jpg"
            imageAlt="Description de l'image"
          />
        </div>
      </div>
    </div>
  );
};
export default Functionality;
