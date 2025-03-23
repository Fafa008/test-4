import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import ConnectButton from "../ui/btn";

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
      x: mousePosition.x - 17,
      y: mousePosition.y - 17,
      transition: { type: "ease", stiffness: 200 },
    },
    text: {
      height: 220,
      width: 220,
      x: mousePosition.x - 60,
      y: mousePosition.y - 60,
      backgroundColor: "#fff",
      mixBlendMode: "color",
      transition: { type: "linear " },
    },
    background: {
      height: 220,
      width: 220,
      x: mousePosition.x - 60,
      y: mousePosition.y - 60,
      backgroundColor: "#000",
      mixBlendMode: "color",
      transition: { type: "linear " },
      overflow: "hidden",
      zIndex: -1,
    },
  };

  return (
    <>
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

        <div className="absolute bottom-0 left-0 w-full h-32 from-black to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row h-screen items-center justify-center px-8 md:px-16 text-white">
        <div className="space-y-8 text-center md:text-left">
          <motion.h1
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
            className="text-6xl md:text-9xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent animate-pulse"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            SIGN ALL
          </motion.h1>

          <motion.h1
            className="flex items-center justify-center text-2xl md:text-4xl font-bold tracking-wide"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Bienvenue dans l'application
          </motion.h1>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ConnectButton to="/dashboard" refreshOnRedirect={true} />
          </motion.div>
        </div>
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
