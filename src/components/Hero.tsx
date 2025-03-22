import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
<<<<<<< HEAD
import { h1 } from "framer-motion/client";
import RoundedSliderButton from "./btn";
import ConnectButton from "./btn";

=======
import { RedirectButton } from "./Button";
>>>>>>> 8a01996cfa1532e9449d2098dc10cc88af718336
function App() {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState<string>("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants: Variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "yellow",
      mixBlendMode: "difference" as const,
    },
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
<<<<<<< HEAD
    <>
      <div className="fixed inset-0 -z-10 min-h-screen w-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="/assets/img/background.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas les vidéos HTML5.
        </video>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-between pl-10 pr-10 text-white text-start">
        {/* Contenu à gauche */}
        <div>
          <h1 className="text-4xl font-bold">Bienvenu dans L'application</h1>
          <h1
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
            className="text-9xl font-bold"
          >
            SING ALL
          </h1>
          <div className="mt-6">
            <ConnectButton />
          </div>
        </div>

        {/* Image à droite */}
        <div className="w-1/2 text-end"></div>

        {/* Curseur personnalisé */}
        <motion.div
          className="w-8 h-8 bg-black rounded-full fixed top-0 left-0 pointer-events-none"
          variants={variants}
          animate={cursorVariant}
        />
      </div>
    </>
=======
    <div className="flex flex-col gap-5 items-center justify-center h-screen bg-yellow-400">
      <h1
        onMouseEnter={textEnter}
        onMouseLeave={textLeave}
        className="text-9xl font-bold"
      >
        Hello World
      </h1>
      <motion.div
        className="w-8 h-8 bg-black rounded-full fixed top-0 left-0 pointer-events-none"
        variants={variants}
        animate={cursorVariant}
      />
      <RedirectButton
        to="/Client"
        label="Navigation programmatique"
        variant="secondary"
        useNavigateHook={true}
        refreshOnRedirect={true}
      />
    </div>
>>>>>>> 8a01996cfa1532e9449d2098dc10cc88af718336
  );
}

export default App;
