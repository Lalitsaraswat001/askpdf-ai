import { useTheme } from "../context/ThemeContext";

function IconButton({
  children,
  onClick,
  className = "",
}) {
  const { darkMode } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`
        w-10
        h-10
        rounded-xl
        border
        flex
        items-center
        justify-center
        transition
        ${
          darkMode
            ? "bg-white/5 border-white/10 hover:bg-white/10"
            : "bg-white border-slate-300 hover:bg-slate-100"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default IconButton;