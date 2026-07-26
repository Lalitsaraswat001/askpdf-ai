function Button({
  children,
  onClick,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        rounded-xl
        px-4
        py-2.5
        font-semibold
        transition-all
        duration-300
        bg-gradient-to-r
        from-violet-600
        to-blue-600
        hover:from-violet-500
        hover:to-blue-500
        hover:scale-[1.02]
        text-white
        shadow-lg
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;