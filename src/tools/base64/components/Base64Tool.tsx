"use client";

import { useState } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function encode() {
    setOutput(btoa(input));
  }

  function decode() {
    try {
      setOutput(atob(input));
    } catch {
      setOutput("Invalid Base64");
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full border rounded-lg p-3"
        rows={8}
        placeholder="Enter text or Base64..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-4">
        <button
          onClick={encode}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Encode
        </button>

        <button
          onClick={decode}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Decode
        </button>
      </div>

      <textarea
        className="w-full border rounded-lg p-3"
        rows={8}
        value={output}
        readOnly
      />
    </div>
  );
}