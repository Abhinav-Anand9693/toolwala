import {
  Check,
  Clipboard,
  Download,
  FileJson,
  RotateCcw,
  Sparkles,
} from "lucide-react";

type Props = {
  onFormat: () => void;
  onClear: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onLoadSample: () => void;
  copied: boolean;
};

export default function JsonToolbar({
  onFormat,
  onClear,
  onCopy,
  onDownload,
  onLoadSample,
  copied,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onFormat}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        <Sparkles className="h-4 w-4" />
        Format
      </button>

      <button
        type="button"
        onClick={onCopy}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-500" />
        ) : (
          <Clipboard className="h-4 w-4" />
        )}

        {copied ? "Copied" : "Copy"}
      </button>

      <button
        type="button"
        onClick={onDownload}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <Download className="h-4 w-4" />
        Download
      </button>

      <button
        type="button"
        onClick={onLoadSample}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <FileJson className="h-4 w-4" />
        Sample
      </button>

      <button
        type="button"
        onClick={onClear}
        className="ml-auto inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
      >
        <RotateCcw className="h-4 w-4" />
        Clear
      </button>
    </div>
  );
}