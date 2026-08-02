type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function JsonInput({
  value,
  onChange,
}: Props) {
  return (
    <textarea
      rows={18}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Paste JSON here..."
      className="w-full rounded-xl border p-4 font-mono"
    />
  );
}