import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Hero from "./components/Hero.tsx";
import HorizontalScroll from "./components/Horizontal.tsx";

import { Section } from "./components/section/Section.tsx";
import DarkModeButton from "./components/DarkModeButton.tsx";
import NavBar from "./components/NavBar.tsx";
import { Route, Routes } from "react-router-dom";
import Client from "./components/pages/Client.tsx";

function App() {
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
      <Routes>
        <Route path="/Client" element={<Client />} />
      </Routes>
      <NavBar />
      <Hero />
      <Section color="bg-green-500" title="Section 2" />
      <HorizontalScroll />
      <section className="h-screen w-full bg-green-500 dark:bg-green-900">
        4
      </section>
      <section className="h-screen w-full bg-purple-500 dark:bg-purple-900">
        5
      </section>
      <section className="h-screen w-full bg-orange-500 dark:bg-orange-900">
        footer
      </section>
      <DarkModeButton />
    </>
  );
}

export default App;
