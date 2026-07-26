import { Sparkles, Loader2 } from "lucide-react";

function SummaryButton({
  onClick,
  loading,
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="
      flex
      items-center
      gap-2
      rounded-xl
      bg-gradient-to-r
      from-violet-600
      to-blue-600
      hover:from-violet-500
      hover:to-blue-500
      px-5
      py-3
      text-white
      font-medium
      transition-all
      hover:scale-105
      shadow-lg
      disabled:opacity-60
      "
    >
      {loading ? (
        <Loader2
          size={18}
          className="animate-spin"
        />
      ) : (
        <Sparkles size={18} />
      )}

      AI Summary
    </button>
  );
}

export default SummaryButton;