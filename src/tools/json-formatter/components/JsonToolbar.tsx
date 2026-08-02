type Props = {
  onFormat: () => void;
  onClear: () => void;
  onCopy: () => void;
};

export default function JsonToolbar({
  onFormat,
  onClear,
  onCopy,
}: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <button
        onClick={onFormat}
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        Format
      </button>

      <button
        onClick={onCopy}
        className="rounded-lg border px-5 py-2 hover:bg-gray-100"
      >
        Copy
      </button>

      <button
        onClick={onClear}
        className="rounded-lg border px-5 py-2 hover:bg-gray-100"
      >
        Clear
      </button>
    </div>
  );
}