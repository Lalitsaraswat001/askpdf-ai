function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-slate-400">
        Loading...
      </p>
    </div>
  );
}

export default Loader;