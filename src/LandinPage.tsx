import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Hero from "./components/section/Hero.tsx";

import { Problem } from "./components/section/Problem.tsx";
import NavBar from "./components/section/NavBar.tsx";
import DarkModeButton from "./components/ui/DarkModeButton.tsx";
import NounoursFooterWithText from "./components/section/Footer.tsx";
import Functionality from "./components/section/Functionality.tsx";
import Apropo from "./components/section/Apropo.tsx";
import GetInTouch from "./components/section/GetInTouch.tsx";

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
      <Problem color="bg-green-500" title="Section 2" />
      <Functionality />
      <Apropo />
      <GetInTouch />
      <NounoursFooterWithText />
      <DarkModeButton />
    </>
  );
};

export default LandinPage;
