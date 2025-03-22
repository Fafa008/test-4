import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Hero from "./Hero";
import HorizontalScroll from "./Horizontal.tsx";

import { Section } from "./Section.tsx";
import NavBar from "./NavBar.tsx";
import DarkModeButton from "../ui/DarkModeButton.tsx";
import NounoursFooterWithText from "./Footer.tsx";
import Functionality from "./Functionality";
import Apropo from "./Apropo.tsx";
import GetInTouch from "./GetInTouch.tsx";

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
      <Section color="bg-green-500" title="Section 2" />
      <HorizontalScroll />
      <Functionality className="h-screen w-full bg-green-500 dark:bg-green-900">
        4
      </Functionality>
      <Apropo className="h-screen w-full bg-purple-500 dark:bg-purple-900">
        5
      </Apropo>
      <GetInTouch className="h-screen w-full bg-purple-500 dark:bg-purple-900">
        5
      </GetInTouch>
      <NounoursFooterWithText />
      <DarkModeButton />
    </>
  );
};

export default LandinPage;
