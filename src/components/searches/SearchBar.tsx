"use client";

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <input
      type="text"
      placeholder="Search tools..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full rounded-lg border p-4"
    />
  );
}