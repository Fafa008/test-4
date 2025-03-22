"use client";
import { Link, useNavigate } from "react-router-dom";

interface RedirectButtonProps {
  to: string;
  label: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  useNavigateHook?: boolean;
}

export function RedirectButton({
  to,
  label,
  variant = "default",
  useNavigateHook = false,
}: RedirectButtonProps) {
  const navigate = useNavigate();

  // Button styles based on variant
  const getButtonStyles = () => {
    const baseStyles =
      "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

    switch (variant) {
      case "destructive":
        return `${baseStyles} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`;
      case "outline":
        return `${baseStyles} border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary`;
      case "secondary":
        return `${baseStyles} bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500`;
      case "ghost":
        return `${baseStyles} text-gray-700 hover:bg-gray-100 focus:ring-gray-500`;
      case "link":
        return "text-primary hover:underline focus:outline-none";
      default:
        return `${baseStyles} bg-primary text-white hover:bg-primary/90 focus:ring-primary`;
    }
  };

  // If using programmatic navigation
  if (useNavigateHook) {
    return (
      <button className={getButtonStyles()} onClick={() => navigate(to)}>
        {label}
      </button>
    );
  }

  // Default: using Link component
  return (
    <Link to={to} className="w-fit">
      <button className={getButtonStyles()}>{label}</button>
    </Link>
  );
}
