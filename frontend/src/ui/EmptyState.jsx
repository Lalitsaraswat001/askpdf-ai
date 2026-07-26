function EmptyState({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">

      <div className="mb-6">
        {icon}
      </div>

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-2 text-slate-400">
        {description}
      </p>

    </div>
  );
}

export default EmptyState;