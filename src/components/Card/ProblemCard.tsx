import React, { useState } from "react";
import { motion } from "framer-motion";

interface Problem {
  title: string;
  description: string;
  color: string;
}

interface CarouselProps {
  problems: Problem[];
}

const ProblemCard: React.FC<Problem> = ({ title, description, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        rotateX: -10,
        rotateY: 10,
        scale: 1.05,
        boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.3)",
      }}
      transition={{ type: "spring", stiffness: 150, damping: 10 }}
      className="w-[300px] h-[300px] p-6 rounded-xl shadow-xl text-white z-10 flex flex-col justify-between relative"
      style={{
        backgroundColor: color,
        transformStyle: "preserve-3d",
      }}
    >
      <h3 className="text-2xl font-extrabold">{title}</h3>
      <p className="mt-2 text-sm opacity-80">{description}</p>

      {/* Effet lumineux 3D */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-10 blur-3xl rounded-xl" />
    </motion.div>
  );
};

const Carousel: React.FC<CarouselProps> = ({ problems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % problems.length);
  };

  const prevCard = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + problems.length) % problems.length
    );
  };

  return (
    <div className="relative w-full h-[400px] flex justify-center items-center">
      {/* Carousel container */}
      <div className="flex items-center justify-center overflow-hidden w-full h-full">
        <motion.div
          className="flex w-full"
          initial={{ x: "-100%" }}
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {problems.map((problem, index) => (
            <div
              key={index}
              className="w-full flex justify-center items-center"
            >
              <ProblemCard {...problem} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevCard}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-4 bg-purple-500 text-white rounded-full shadow-lg"
      >
        &lt;
      </button>
      <button
        onClick={nextCard}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-4 bg-purple-500 text-white rounded-full shadow-lg"
      >
        &gt;
      </button>
    </div>
  );
};

export default ProblemCard;
