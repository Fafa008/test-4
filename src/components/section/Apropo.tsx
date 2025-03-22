import React from "react";

interface ApropoProps {
  children?: React.ReactNode;
  className?: string;
}

const Apropo: React.FC<ApropoProps> = ({}) => {
  return (
    <div className="h-screen w-full bg-white dark:bg-purple-900">
      <h1 className="text-black text-6xl"></h1>
    </div>
  );
};

export default Apropo;
