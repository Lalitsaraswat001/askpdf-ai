import { useTheme } from "../context/ThemeContext";

function Input(props) {
  const { darkMode } = useTheme();

  return (
    <input
      {...props}
      className={`
        w-full
        rounded-xl
        border
        px-4
        py-3
        outline-none
        transition
        ${
          darkMode
            ? "bg-white/5 border-white/10 text-white placeholder:text-slate-500"
            : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
        }
        focus:border-violet-500
        focus:ring-2
        focus:ring-violet-500/30
        ${props.className || ""}
      `}
    />
  );
}

export default Input;