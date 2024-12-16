"use client";

import React from "react";
import classNames from "classnames";

interface ButtonProps {
  isSolid?: boolean; // Optional, default is `true`
  title: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "red"; // Restrict colors to valid options
  className?: string; // New prop for custom Tailwind CSS classes
}

const colorClasses = {
  primary: {
    solid: "bg-green-500 hover:bg-green-600 text-white",
    outline: "border border-primary-300 text-primary-500 hover:bg-primary-50",
  },
  secondary: {
    solid: "bg-secondary-500 hover:bg-secondary-600 text-white",
    outline:
      "border border-secondary-500 text-secondary-500 hover:bg-secondary-50",
  },
  red: {
    solid: "bg-red-500 hover:bg-red-600 text-white",
    outline: "border border-red-500 text-red-500 hover:bg-red-50",
  },
};

const Button: React.FC<ButtonProps> = ({
  isSolid = true,
  title,
  onClick,
  color = "primary",
  className = "", // Default to an empty string if no custom class is passed
}) => {
  const baseClasses = `px-6 py-2 rounded font-medium focus:outline-none transition duration-200`;
  const selectedColorClasses =
    colorClasses[color][isSolid ? "solid" : "outline"];

  // Combine default styles with any custom styles passed via className prop
  return (
    <button
      onClick={onClick}
      className={classNames(baseClasses, selectedColorClasses, className)}
    >
      {title}
    </button>
  );
};

export default Button;
