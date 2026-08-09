type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function JsonInput({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex min-h-[520px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h3 className="font-semibold text-slate-900">
            Input
          </h3>

          <p className="text-xs text-slate-500">
            Paste or type your JSON
          </p>
        </div>

        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
          JSON
        </span>
      </div>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={`{
  "name": "Toolwala",
  "type": "AI Workspace"
}`}
        spellCheck={false}
        className="min-h-[450px] flex-1 resize-none bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100 outline-none placeholder:text-slate-600"
      />
    </div>
  );
}