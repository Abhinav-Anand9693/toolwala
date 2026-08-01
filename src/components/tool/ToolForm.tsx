export default function ToolForm() {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-xl font-semibold">
        Tool Input
      </h2>

      <div className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Enter your prompt..."
          className="w-full rounded-lg border p-3"
        />

        <button className="rounded-lg bg-black px-6 py-3 text-white">
          Run Tool
        </button>
      </div>
    </div>
  );
}