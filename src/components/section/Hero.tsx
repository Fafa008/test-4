import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import ConnectButton from "./btn";

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<"default" | "text">(
    "default"
  );

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const variants: Variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: { type: "spring", stiffness: 200 },
    },
    text: {
      height: 120,
      width: 120,
      x: mousePosition.x - 60,
      y: mousePosition.y - 60,
      backgroundColor: "#FACC15",
      mixBlendMode: "difference",
      boxShadow: "0 0 20px rgba(250, 204, 21, 0.5)",
      transition: { type: "spring", stiffness: 200 },
    },
  };

  return (
    <>
      {/* 🔹 Vidéo en arrière-plan */}
      <div className="absolute top-0 left-0 w-full h-[109.5vh] -z-10 overflow-hidden">
        <video
          className="w-full h-full object-cover brightness-75"
          autoPlay
          loop
          muted
        >
          <source src="/assets/img/Demo.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas les vidéos HTML5.
        </video>

        {/* Effet de fondu en bas */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* 🔹 Contenu principal */}
      <div className="relative z-10 flex flex-col md:flex-row h-screen items-center justify-between px-8 md:px-16 text-white">
        {/* Texte à gauche */}
        <div className="space-y-8 text-center md:text-left">
          <motion.h1
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
            className="text-6xl md:text-9xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent animate-pulse"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            SING ALL
          </motion.h1>

          <motion.h1
            className="text-2xl md:text-4xl font-bold tracking-wide"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Bienvenue dans l'application
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ConnectButton />
          </motion.div>
        </div>

        {/* 🔹 Image à droite */}

        {/* 🔹 Curseur personnalisé */}
        <motion.div
          className="w-8 h-8 bg-black rounded-full fixed top-0 left-0 pointer-events-none shadow-lg"
          variants={variants}
          animate={cursorVariant}
        />
      </div>
    </>
  );
}

export default App;
