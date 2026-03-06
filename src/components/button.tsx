import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = ({ onClick, label }: ButtonProps) => {
  return (
    <button className="cursor-pointer " onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
