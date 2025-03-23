import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Hero from "./components/section/Hero.tsx";
import GetInTouch from "./components/section/GetInTouch.tsx";

import ProblemSection from "./components/section/Problem.tsx";
import NavBar from "./components/section/NavBar.tsx";
import NounoursFooterWithText from "./components/section/Footer.tsx";
import Functionality from "./components/section/Functionality.tsx";
import { VerticalScrollSection } from "./components/section/VerticalScrollSection.tsx";

const verticalItems = [
  {
    id: 1,
    title: "Wildlife in Action: A Glimpse into Nature's Daily Drama",
    description:
      "Witness the fascinating lives of animals in their natural habitats, from playful cubs to stealthy predators.",
    video:
      "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4",
  },
  {
    id: 2,
    title: "The Changing Seasons: Nature's Everlasting Cycle",
    description:
      "Experience the beauty of nature's transitions, from blooming spring flowers to snowy winter landscapes.",
    video:
      "https://videos.pexels.com/video-files/3214448/3214448-uhd_2560_1440_25fps.mp4",
  },
  {
    id: 3,
    title: "Guardians of Nature: Protecting Our Planet's Future",
    description:
      "Learn about the importance of conservation and how we can work together to preserve the beauty of nature for generations to come.",
    video:
      "https://videos.pexels.com/video-files/4328514/4328514-uhd_2560_1440_30fps.mp4",
  },
  {
    id: 4,
    title: "Astral Aesthetics: Portraits from the Infinite",
    description:
      "Experience the boundless beauty of the cosmos through striking portraits that capture its infinite aesthetic appeal.",
    video:
      "https://videos.pexels.com/video-files/2871916/2871916-hd_1920_1080_30fps.mp4",
  },
];

const LandinPage = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "bounce.out",
      });
    }

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <>
      <NavBar />
      <Hero />
      <VerticalScrollSection items={verticalItems} />
      <ProblemSection />
      <Functionality />
      <GetInTouch />
      <NounoursFooterWithText />
    </>
  );
};

export default LandinPage;
