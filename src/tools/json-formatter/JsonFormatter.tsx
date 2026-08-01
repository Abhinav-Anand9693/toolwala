"use client";

import { useState } from "react";
import JsonInput from "./JsonInput";
import JsonOutput from "./JsonOutput";
import JsonToolbar from "./JsonToolbar";
import { formatJson } from "./formatter";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function handleFormat() {
    const result = formatJson(input);

    if (result.success) {
      setOutput(result.output);
    } else {
      alert(result.error);
    }
  }

  function handleClear() {
    setInput("");
    setOutput("");
  }

  return (
    <div className="space-y-6">
      <JsonToolbar
        onFormat={handleFormat}
        onClear={handleClear}
      />

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