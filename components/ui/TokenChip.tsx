"use client";

import { useState, useCallback } from "react";

interface TokenChipProps {
  name: string;
  hex: string;
  cssVar?: string;
  label?: string;
}

export function TokenChip({ name, hex, cssVar, label }: TokenChipProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    const value = cssVar ?? hex;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [hex, cssVar]);

  const light = isLightColor(hex);

  return (
    <button
      onClick={copy}
      title={`Copiar ${cssVar ?? hex}`}
      aria-label={`Copiar token ${name}: ${hex}`}
      className="token-chip"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-3)",
        cursor: "pointer",
        textAlign: "left",
        transition:
          "border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)",
        minWidth: 120,
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 48,
          borderRadius: "var(--radius-md)",
          background: hex,
          border: light ? "1px solid var(--color-border)" : "none",
        }}
      />
      <div>
        <div
          style={{
            fontSize: "var(--text-xs)",
            fontWeight: 600,
            color: "var(--color-text)",
            marginBottom: 2,
          }}
        >
          {label ?? name}
        </div>
        <div
          style={{
            fontSize: "var(--text-xs)",
            color: copied ? "var(--color-success)" : "var(--color-text-faint)",
            fontFamily: "monospace",
          }}
        >
          {copied ? "Copiado." : hex}
        </div>
      </div>
      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
        }}
      >
        {copied ? `Token ${name} copiado.` : ""}
      </span>
    </button>
  );
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}
