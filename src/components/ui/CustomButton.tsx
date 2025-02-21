import React from "react";

interface ButtonProps {
  text: string;
  icon?: React.ElementType;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<ButtonProps> = ({ text, icon: Icon, onClick, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex justify-center items-center gap-2 px-5 py-3 text-white bg-secondary rounded-md shadow-md transition-all duration-300 active:scale-95 ${className}`}
    >
      <span className="text-base uppercase">{text}</span>
      {Icon && <Icon className="text-xl" />}
    </button>
  );
};

export default CustomButton;
