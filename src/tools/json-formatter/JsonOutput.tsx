type Props = {
  value: string;
};

export default function JsonOutput({
  value,
}: Props) {
  return (
    <textarea
      rows={18}
      value={value}
      readOnly
      className="w-full rounded-xl border bg-slate-900 p-4 font-mono text-green-400"
    />
  );
}