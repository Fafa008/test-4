<<<<<<< HEAD
import { Route, Routes } from "react-router-dom";
import Client from "./components/pages/Client.tsx";
import LandinPage from "./components/LandinPage.tsx";
import Detection from "./components/pages/Detection.tsx";
=======
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Hero from "./components/Hero.tsx";
import HorizontalScroll from "./components/Horizontal.tsx";
import { Section } from "./components/section/section.tsx";
import { InfiniteScroll } from "./components/InfinitScroll.tsx";
import { Star } from "lucide-react";
import FooterPage from "./components/Footer.tsx";
>>>>>>> acfd4becb109a9d16b655bc9fee4a66555d3ca28

function App() {
  return (
    <>
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<LandinPage />} />
        <Route path="/Client" element={<Client />} />
        <Route path="/Detection" element={<Detection />} />
      </Routes>
=======
      <Hero />
      <Section color="bg-green-500" title="Section 2" />
      <HorizontalScroll />
      <section className="h-screen w-full bg-green-500 dark:bg-green-900">
        <InfiniteScroll direction="left" speed="fast">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-4 py-2 bg-gray-200 rounded-lg"
            >
              Item {index + 1}
            </div>
          ))}
        </InfiniteScroll>
      </section>
      <section className="h-screen w-full bg-yellow-500 dark:bg-yellow-900">
        4
      </section>
      <section className="h-screen w-full bg-purple-500 dark:bg-purple-900">
        5
      </section>
      <section className="h-screen w-full bg-orange-500 dark:bg-orange-900">
        <FooterPage />
      </section>
>>>>>>> acfd4becb109a9d16b655bc9fee4a66555d3ca28
    </>
  );
}

export default App;
