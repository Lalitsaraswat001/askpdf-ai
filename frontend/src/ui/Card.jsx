import { useTheme } from "../context/ThemeContext";

function Card({ children, className = "" }) {
  const { darkMode } = useTheme();

  return (
    <div
      className={`
        rounded-3xl
        border
        shadow-lg
        transition-all
        duration-300
        ${
          darkMode
            ? "bg-[#111827] border-white/10"
            : "bg-white border-slate-200"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;