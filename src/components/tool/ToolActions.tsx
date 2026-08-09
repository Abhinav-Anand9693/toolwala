import { Share2 } from "lucide-react";

export default function ToolActions() {
  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: "Toolwala",
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(
        window.location.href
      );
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
    >
      <Share2 className="h-4 w-4" />
      Share
    </button>
  );
}