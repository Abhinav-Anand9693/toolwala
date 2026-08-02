"use client";

import { useState } from "react";
import JsonInput from "./components/JsonInput";
import JsonOutput from "./components/JsonOutput";
import JsonToolbar from "./components/JsonToolbar";
import { formatJson } from "./formatter";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleFormat() {
    const result = formatJson(input);

    if (result.success) {
      setOutput(result.output);
      setError("");
    } else {
      setOutput("");
      setError(result.error);
    }
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError("");
  }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
  }

  function handleLoadSample() {
    setInput(`{
  "name": "Toolwala",
  "creator": "Abhinav",
  "goal": "Build World's Best AI Workspace"
}`);
    setOutput("");
    setError("");
  }

  return (
    <div className="space-y-6">

      <JsonToolbar
        onFormat={handleFormat}
        onClear={handleClear}
        onCopy={handleCopy}
      />

      <button
        onClick={handleLoadSample}
        className="rounded-lg border px-5 py-2 hover:bg-gray-100"
      >
        Load Sample
      </button>

      {error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <JsonInput
          value={input}
          onChange={setInput}
        />

        <JsonOutput
          value={output}
        />
      </div>
    </div>
  );
}