import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

interface Problem {
  title: string;
  description: string;
  color: string;
}

const ProblemCard: React.FC<Problem> = ({ title, description, color }) => {
  return (
    <>
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
    </>
  );
};

export default ProblemCard;
