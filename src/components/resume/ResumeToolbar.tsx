"use client";

import {
  Download,
  Printer,
  RotateCcw,
} from "lucide-react";

type Props = {
  onPrint: () => void;
  onClear: () => void;
};

export default function ResumeToolbar({
  onPrint,
  onClear,
}: Props) {
  function handleClear() {
    const confirmed =
      window.confirm(
        "Are you sure you want to clear this resume? All entered information will be removed."
      );

    if (!confirmed) {
      return;
    }

    onClear();
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <button
        type="button"
        onClick={onPrint}
        className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
      >
        <Download className="h-4 w-4" />

        Download PDF
      </button>

      <button
        type="button"
        onClick={onPrint}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <Printer className="h-4 w-4" />

        Print
      </button>

      <button
        type="button"
        onClick={handleClear}
        className="inline-flex items-center gap-2 rounded-xl border border-red-100 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
      >
        <RotateCcw className="h-4 w-4" />

        Clear
      </button>

    </div>
  );
}