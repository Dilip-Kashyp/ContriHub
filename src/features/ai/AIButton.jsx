import { useState } from "react";
import { AutoAwesomeIcon } from "@/components";

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 10px",
    borderRadius: "10px",
    fontSize: "0.68rem",
    fontWeight: 700,
    cursor: "pointer",
    border: "1px solid",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    whiteSpace: "nowrap",
    letterSpacing: "0.3px",
  },
  primary: {
    background: "linear-gradient(135deg, rgba(88,166,255,0.15), rgba(188,140,255,0.15))",
    borderColor: "rgba(88,166,255,0.3)",
    color: "#58a6ff",
  },
  primaryHover: {
    background: "linear-gradient(135deg, rgba(88,166,255,0.25), rgba(188,140,255,0.25))",
    borderColor: "rgba(88,166,255,0.5)",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(88,166,255,0.15)",
  },
  secondary: {
    background: "rgba(63,185,80,0.1)",
    borderColor: "rgba(63,185,80,0.2)",
    color: "#3fb950",
  },
  secondaryHover: {
    background: "rgba(63,185,80,0.2)",
    borderColor: "rgba(63,185,80,0.4)",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(63,185,80,0.12)",
  },
  loading: {
    opacity: 0.7,
    cursor: "wait",
  },
};

/**
 * Reusable AI action button with sparkle icon.
 * @param {string} label - Button text
 * @param {Function} onClick - Click handler
 * @param {boolean} loading - Loading state
 * @param {"primary"|"secondary"} variant - Visual style
 * @param {object} style - Additional inline styles
 */
export default function AIButton({ label = "Ask AI", onClick, loading = false, variant = "primary", style = {} }) {
  const [hovered, setHovered] = useState(false);

  const variantStyle = variant === "secondary" ? styles.secondary : styles.primary;
  const hoverStyle = variant === "secondary" ? styles.secondaryHover : styles.primaryHover;

  return (
    <button
      onClick={loading ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.base,
        ...variantStyle,
        ...(hovered && !loading ? hoverStyle : {}),
        ...(loading ? styles.loading : {}),
        ...style,
      }}
      disabled={loading}
    >
      {loading ? (
        <span style={{ 
          width: 12, height: 12, border: "2px solid currentColor", 
          borderTopColor: "transparent", borderRadius: "50%",
          animation: "spin 0.8s linear infinite", display: "inline-block"
        }} />
      ) : (
        <AutoAwesomeIcon iconProps={{ sx: { fontSize: 12 } }} />
      )}
      {loading ? "Thinking..." : label}
    </button>
  );
}
