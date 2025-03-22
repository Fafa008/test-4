"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 0.5,
  className = "",
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Create a spring animation for smooth counting
  const springValue = useSpring(value, {
    stiffness: 100,
    damping: 30,
    duration,
  });

  // Transform the spring value to always show an integer
  const displayValue = useTransform(springValue, (latest) =>
    Math.round(latest)
  );

  // Update the spring target value when the value prop changes
  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  // Setup intersection observer to detect when counter is in view
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.span ref={nodeRef} className={className}>
      {displayValue}
    </motion.span>
  );
}
