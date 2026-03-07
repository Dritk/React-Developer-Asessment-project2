import type { ButtonHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = ({ onClick, label }: ButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      className="cursor-pointer "
      onClick={onClick || (() => navigate("/"))}
    >
      {label}
    </button>
  );
};

export default Button;
