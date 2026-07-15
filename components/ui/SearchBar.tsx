"use client";

import { useState, useCallback } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export function SearchBar({
  placeholder = "Buscar no brandbook…",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      onSearch(e.target.value);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    onSearch("");
  }, [onSearch]);

  return (
    <div
      role="search"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "var(--space-4)",
          color: "var(--color-text-faint)",
          pointerEvents: "none",
          flexShrink: 0,
        }}
      >
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M11 11l3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Buscar no brandbook"
        style={{
          width: "100%",
          padding: "var(--space-3) var(--space-4) var(--space-3) calc(var(--space-4) + 16px + var(--space-2))",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-full)",
          fontSize: "var(--text-sm)",
          color: "var(--color-text)",
          transition: "border-color var(--duration-fast) var(--ease-out)",
        }}
      />

      {query ? (
        <button
          onClick={handleClear}
          aria-label="Limpar busca"
          style={{
            position: "absolute",
            right: "var(--space-3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
            background: "var(--color-surface-2)",
            border: "none",
            borderRadius: "var(--radius-full)",
            cursor: "pointer",
            color: "var(--color-text-faint)",
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
            <path
              d="M1 1l6 6M7 1L1 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
