import React from "react";

interface ApropoProps {
  children?: React.ReactNode;
  className?: string;
}

const Apropo: React.FC<ApropoProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default Apropo;
