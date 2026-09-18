"use client";

import { useState, useCallback } from "react";

interface CopyBlockProps {
  text: string;
  label?: string;
  variant?: "default" | "highlight";
}

export function CopyBlock({ text, label, variant = "default" }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [text]);

  const isHighlight = variant === "highlight";

  return (
    <div
      className="copyblock card-elev"
      style={{
        background: isHighlight
          ? "hsl(var(--c-primary) / 0.08)"
          : "var(--color-surface)",
        border: `1px solid ${isHighlight ? "hsl(var(--c-primary) / 0.2)" : "var(--color-border)"}`,
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-4) var(--space-6)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "var(--space-4)",
        position: "relative",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        {label ? (
          <div className="label" style={{ marginBottom: "var(--space-2)" }}>
            {label}
          </div>
        ) : null}
        <p
          style={{
            fontSize: isHighlight ? "var(--text-lg)" : "var(--text-base)",
            fontFamily: isHighlight
              ? "var(--font-display)"
              : "var(--font-body)",
            fontWeight: isHighlight ? 500 : 400,
            color: "var(--color-text)",
            lineHeight: "var(--leading-snug)",
          }}
        >
          {text}
        </p>
      </div>
      <button
        onClick={copy}
        aria-label={copied ? "Texto copiado" : "Copiar texto"}
        className="btn-secondary"
        style={{
          flexShrink: 0,
          padding: "var(--space-2) var(--space-3)",
          background: "var(--color-surface-2)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
          fontSize: "var(--text-xs)",
          color: copied ? "var(--color-success)" : "var(--color-text-muted)",
          transition:
            "color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
        }}
      >
        {copied ? (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
            <path d="M1 4.5l3 3 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="11" height="12" viewBox="0 0 11 12" fill="none" aria-hidden="true">
            <rect x="3.5" y="3.5" width="7" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M1 7.5V1.5a1 1 0 0 1 1-1h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        )}
        {copied ? "Copiado" : "Copiar"}
      </button>
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
        {copied ? "Texto copiado para a área de transferência." : ""}
      </span>
    </div>
  );
}
