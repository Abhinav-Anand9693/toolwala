"use client";

import { useCallback,useEffect, useState } from "react";

import JsonInput from "./components/JsonInput";
import JsonOutput from "./components/JsonOutput";
import JsonToolbar from "./components/JsonToolbar";
import { formatJson } from "./formatter";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFormat = useCallback(() => {
    const result = formatJson(input);
    if (result.success) {
      setOutput(result.output);
      setError("");
    }else {
      setOutput("");
      setError(result.error);
    }
  }, [input]);

  function handleClear() {
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  }

  async function handleCopy() {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Unable to copy the formatted JSON.");
    }
  }

  function handleDownload() {
    if (!output) return;

    const blob = new Blob([output], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "formatted.json";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  function handleLoadSample() {
    const sample = `{
  "name": "Toolwala",
  "type": "AI Workspace",
  "features": [
    "JSON Formatter",
    "AI Tools",
    "Developer Tools"
  ],
  "status": "building"
}`;

    setInput(sample);
    setOutput("");
    setError("");
  }

  useEffect(() => {
    function handleKeyboard(event: KeyboardEvent) {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter"
      ) {
        event.preventDefault();
        handleFormat();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, [handleFormat]);

  const characterCount = input.length;

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <JsonToolbar
        onFormat={handleFormat}
        onClear={handleClear}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onLoadSample={handleLoadSample}
        copied={copied}
      />

      {/* Error */}
      {error && (
        <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            className="font-medium hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Editors */}
      <div className="grid gap-5 lg:grid-cols-2">
        <JsonInput
          value={input}
          onChange={setInput}
        />

        <JsonOutput
          value={output}
        />
      </div>

      {/* Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm">
        <div className="flex items-center gap-2">
          {output && !error ? (
            <>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="font-medium text-emerald-600">
                Valid JSON
              </span>
            </>
          ) : (
            <>
              <span className="h-2 w-2 rounded-full bg-slate-300" />

              <span className="text-slate-500">
                Ready
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <span>
            Characters:{" "}
            <strong className="text-slate-700">
              {characterCount}
            </strong>
          </span>

          <span className="hidden sm:inline">
            Ctrl + Enter to format
          </span>
        </div>
      </div>
    </div>
  );
}