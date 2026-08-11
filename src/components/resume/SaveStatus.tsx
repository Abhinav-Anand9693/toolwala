"use client";

type Props = {
  isSaving: boolean;
  lastSaved: Date | null;
};

export default function SaveStatus({
  isSaving,
  lastSaved,
}: Props) {
  if (isSaving) {
    return (
      <span className="text-xs font-medium text-slate-400">
        Saving...
      </span>
    );
  }

  if (!lastSaved) {
    return (
      <span className="text-xs font-medium text-slate-400">
        Not saved yet
      </span>
    );
  }

  return (
    <span className="text-xs font-medium text-emerald-600">
      ✓ Saved locally
    </span>
  );
}