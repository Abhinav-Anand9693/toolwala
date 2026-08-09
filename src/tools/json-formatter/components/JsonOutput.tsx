type Props = {
  value: string;
};

export default function JsonOutput({
  value,
}: Props) {
  return (
    <div className="flex min-h-[520px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h3 className="font-semibold text-slate-900">
            Output
          </h3>

          <p className="text-xs text-slate-500">
            Formatted JSON
          </p>
        </div>

        <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600">
          Formatted
        </span>
      </div>

      <pre className="min-h-[450px] flex-1 overflow-auto bg-slate-900 p-5 font-mono text-sm leading-7 text-emerald-300">
        {value || (
          <span className="text-slate-600">
            Your formatted JSON will appear here...
          </span>
        )}
      </pre>
    </div>
  );
}