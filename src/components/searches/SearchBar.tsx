"use client";

import { useState } from "react";
import { searchTools } from "@/lib/search";
import SearchResults from "./SearchResults";
import { Tool } from "@/types/tool";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tool[]>([]);

  function handleSearch(value: string) {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    setResults(searchTools(value));
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search tools, profession, category..."
        className="w-full rounded-xl border border-gray-300 p-4 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <SearchResults tools={results} />
    </div>
  );
}