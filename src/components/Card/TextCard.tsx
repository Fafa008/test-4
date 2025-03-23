import React, { useEffect, useRef } from "react";
import Line from "../ui/Line";

const TextCard: React.FC = () => {
  const features = [
    "Feature 1: Lorem ipsum dolor sit amet",
    "Feature 2: Consectetur adipiscing elit",
    "Feature 3: Sed do eiusmod tempor",
    "Feature 4: Ut labore et dolore magna",
  ];

  const path = useRef<SVGPathElement>(null);
  let progress = 0;

  useEffect(() => {
    setPath(progress);
  }, []);

  const setPath = (progress: number) => {
    const { innerHeight } = window;
    const height = innerHeight * 0.7;
    if (path.current) {
      path.current.setAttributeNS("", "d", `M50 0 V${height}`);
    }
  };
  return (
    <div className="relative flex">
      {/* Right side - Image */}
      <div className="flex-1">
        <div className="rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=400"
            alt="Project visualization"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Vertical Line Separator */}
      <Line />

      {/* Left side - Features List */}
      <div className="flex-1 pr-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Project Features
        </h2>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index}>
              <div className="flex items-center gap-3">
                <p className="text-black">{feature}</p>
              </div>
              {index < features.length - 1 && (
                <div className="h-px bg-black my-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextCard;
