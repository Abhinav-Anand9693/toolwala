type Props = {
  onFormat: () => void;
  onClear: () => void;
};

export default function JsonToolbar({
  onFormat,
  onClear,
}: Props) {
  return (
    <div className="mb-6 flex gap-4">
      <button
        onClick={onFormat}
        className="rounded-lg bg-black px-6 py-3 text-white"
      >
        Format JSON
      </button>

      <button
        onClick={onClear}
        className="rounded-lg border px-6 py-3"
      >
        Clear
      </button>
    </div>
  );
}