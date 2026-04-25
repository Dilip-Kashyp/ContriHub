import { useState, useEffect, useRef } from "react";
import { CloseIcon, ContentCopyIcon, AutoAwesomeIcon } from "@/components";

/**
 * Slide-in drawer panel for displaying AI responses.
 * @param {boolean} open - Whether the drawer is visible
 * @param {Function} onClose - Close handler
 * @param {string} title - Drawer header title
 * @param {string} response - The AI response text (markdown)
 * @param {boolean} loading - Whether AI is still processing
 * @param {string|null} error - Error message if any
 */
export default function AIDrawer({ open, onClose, title = "Gibo Response", response = "", loading = false, error = null }) {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  // Scroll to top when new response loads
  useEffect(() => {
    if (response && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [response]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = response;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Simple markdown to HTML (lightweight, no dependencies)
  const renderMarkdown = (text) => {
    if (!text) return "";
    let html = text
      // Code blocks
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre style="background:rgba(22,27,34,0.8);padding:12px;border-radius:10px;overflow-x:auto;border:1px solid rgba(255,255,255,0.05);font-size:0.78rem;line-height:1.5;margin:10px 0"><code>$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code style="background:rgba(88,166,255,0.1);padding:1px 5px;border-radius:4px;font-size:0.78em;color:#58a6ff">$1</code>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e6edf3">$1</strong>')
      // Italic
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // Headers
      .replace(/^### (.+)$/gm, '<h4 style="color:#bc8cff;font-size:0.88rem;margin:16px 0 6px;font-weight:800">$1</h4>')
      .replace(/^## (.+)$/gm, '<h3 style="color:#58a6ff;font-size:0.95rem;margin:20px 0 8px;font-weight:800">$1</h3>')
      .replace(/^# (.+)$/gm, '<h2 style="color:#e6edf3;font-size:1.1rem;margin:20px 0 10px;font-weight:900">$1</h2>')
      // Numbered list
      .replace(/^\d+\.\s+(.+)$/gm, '<li style="margin:4px 0;padding-left:4px;font-size:0.82rem">$1</li>')
      // Bullet list
      .replace(/^[-*]\s+(.+)$/gm, '<li style="margin:4px 0;padding-left:4px;list-style:disc;font-size:0.82rem">$1</li>')
      // Line breaks
      .replace(/\n\n/g, '<div style="height:10px"></div>')
      .replace(/\n/g, "<br/>");

    return html;
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)", zIndex: 9998,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "min(480px, 92vw)",
        background: "rgba(13,17,23,0.95)",
        backdropFilter: "blur(24px)",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "-16px 0 48px rgba(0,0,0,0.5)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 9999,
        display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(22,27,34,0.5)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10, flexShrink: 0,
              background: "rgba(88,166,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(88,166,255,0.2)",
            }}>
              <AutoAwesomeIcon iconProps={{ sx: { fontSize: 16, color: "var(--accent-primary)" } }} />
            </div>
            <span style={{ fontWeight: 900, fontSize: "0.88rem", color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", letterSpacing: "-0.5px" }}>{title}</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8, padding: 6, cursor: "pointer", color: "#8b949e",
              transition: "all 0.2s ease", display: "flex", flexShrink: 0,
            }}
            onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.color = "#fff"; }}
            onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.05)"; e.target.style.color = "#8b949e"; }}
          >
            <CloseIcon iconProps={{ sx: { fontSize: 16 } }} />
          </button>
        </div>

        {/* Content */}
        <div ref={contentRef} style={{
          flex: 1, overflowY: "auto", padding: "18px",
          color: "#8b949e", fontSize: "0.82rem", lineHeight: 1.65,
        }}>
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  border: "2px solid #58a6ff", borderTopColor: "transparent",
                  animation: "spin 0.8s linear infinite",
                }} />
                <span style={{ color: "#58a6ff", fontWeight: 600, fontSize: "0.82rem" }}>Gibo is thinking...</span>
              </div>
              {[80, 100, 60, 90, 70].map((w, i) => (
                <div key={i} style={{
                  width: `${w}%`, height: 12, borderRadius: 6,
                  background: "linear-gradient(90deg, #161b22 25%, #21262d 50%, #161b22 75%)",
                  backgroundSize: "200% 100%",
                  animation: `shimmer 2s infinite linear`,
                  animationDelay: `${i * 150}ms`,
                }} />
              ))}
            </div>
          )}

          {error && (
            <div style={{
              padding: 12, borderRadius: 10,
              background: "rgba(248,81,73,0.1)",
              border: "1px solid rgba(248,81,73,0.2)",
              color: "#f85149", fontSize: "0.78rem",
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {!loading && !error && response && (
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(response) }} />
          )}
        </div>

        {/* Footer */}
        {!loading && response && (
          <div style={{
            padding: "12px 18px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex", justifyContent: "flex-end", gap: 8,
            background: "rgba(22,27,34,0.5)",
          }}>
            <button
              onClick={handleCopy}
              style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "6px 12px", borderRadius: 8,
                background: copied ? "rgba(63,185,80,0.15)" : "rgba(88,166,255,0.1)",
                border: `1px solid ${copied ? "rgba(63,185,80,0.3)" : "rgba(88,166,255,0.2)"}`,
                color: copied ? "#3fb950" : "#58a6ff",
                fontSize: "0.72rem", fontWeight: 700, cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <ContentCopyIcon iconProps={{ sx: { fontSize: 12 } }} />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
