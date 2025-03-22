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
    <motion.div
      initial={{ opacity: 0, y: 50, x: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[300px] h-[300px] p-6 rounded-xl shadow-lg text-white z-10 "
      style={{ backgroundColor: color }}
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm">{description}</p>
    </motion.div>
  );
};

export default ProblemCard;
