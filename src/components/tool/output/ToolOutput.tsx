type Props = {
  result: string;
};

export default function ToolOutput({ result }: Props) {
  return (
    <div className="mt-10 rounded-xl border bg-slate-900 p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Output
        </h2>

        <button className="rounded-md bg-white px-4 py-2 text-black">
          Copy
        </button>
      </div>

      <pre className="overflow-auto whitespace-pre-wrap">
        {result}
      </pre>
    </div>
  );
}