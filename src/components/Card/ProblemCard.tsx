import type React from "react";

interface ProblemCardProps {
  title: string;
  description: string;
  color: string;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  title,
  description,
  color,
}) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl border border-gray-100"
      style={{
        borderTop: `4px solid ${color}`,
      }}
    >
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 flex-1">{description}</p>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="w-12 h-1 bg-blue-900 rounded-full"></div>
      </div>
    </div>
  );
};

export default ProblemCard;
