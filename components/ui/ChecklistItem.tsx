"use client";

import { useState } from "react";

interface ChecklistItemProps {
  id: string;
  label: string;
}

export function ChecklistItem({ id, label }: ChecklistItemProps) {
  const [checked, setChecked] = useState(false);

  return (
    <label
      htmlFor={id}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-4)",
        background: checked
          ? "color-mix(in srgb, var(--color-success) 6%, transparent)"
          : "var(--color-surface)",
        border: `1px solid ${checked ? "color-mix(in srgb, var(--color-success) 25%, transparent)" : "var(--color-border)"}`,
        borderRadius: "var(--radius-md)",
        cursor: "pointer",
        transition:
          "background var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)",
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          width: 18,
          height: 18,
          borderRadius: "var(--radius-sm)",
          border: `1.5px solid ${checked ? "var(--color-success)" : "var(--color-border-strong)"}`,
          background: checked ? "var(--color-success)" : "transparent",
          flexShrink: 0,
          marginTop: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background var(--duration-fast) var(--ease-out)",
        }}
      >
        {checked ? (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4l3 3 5-6"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </div>
      <span
        style={{
          fontSize: "var(--text-sm)",
          color: checked ? "var(--color-text-muted)" : "var(--color-text)",
          lineHeight: "var(--leading-snug)",
          textDecoration: checked ? "line-through" : "none",
          transition: "color var(--duration-fast) var(--ease-out)",
        }}
      >
        {label}
      </span>
    </label>
  );
}
