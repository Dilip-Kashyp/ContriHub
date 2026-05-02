import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "@/features/layout/Layout.jsx";
import { getChatHistory, sendChatMessage } from "@/helper/ai";
import {
  AutoAwesomeIcon, ContentCopyIcon, SmartToyIcon
} from "@/components";

export default function GeneralAIPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);
  const chatEndRef = useRef(null);
  const lastAiMsgRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const t = localStorage.getItem("github_token");
    if (t) setToken(t);
  }, []);

  useEffect(() => {
    if (mounted && !token) {
      const timeout = setTimeout(() => {
        router.push("/login");
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [mounted, token, router]);

  // Fetch chat history on mount
  useEffect(() => {
    if (!token) return;
    const fetchHistory = async () => {
      try {
        const data = await getChatHistory();
        if (data && data.messages) {
          // Intentionally NOT setting messages from history so it starts blank.
          // setMessages(data.messages);
          
          // Check for query param 'q' to auto-send a message
          const urlParams = new URLSearchParams(window.location.search);
          const queryMsg = urlParams.get("q");
          if (queryMsg && data.messages.length === 0) { // Only if no history or it's a new session
             // Wait a bit for history to settle if needed, or just append
             handleAIMessage(queryMsg);
             // Clear the query param so it doesn't re-send on refresh
             router.replace("/chat", undefined, { shallow: true });
          } else if (queryMsg) {
             // If there is history, we still might want to send it if it's the last thing the user did
             // But to avoid double sending, we can check if the last message is the same
             const lastMsg = data.messages[data.messages.length - 1];
             if (lastMsg?.content !== queryMsg) {
                handleAIMessage(queryMsg);
                router.replace("/chat", undefined, { shallow: true });
             }
          }
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
        if (err.message.includes("401")) {
          localStorage.removeItem("github_token");
          setToken(null);
        }
      } finally {
        setInitialLoad(false);
      }
    };
    fetchHistory();
  }, [token]);

  // Scroll to top of last AI message on new AI response; scroll to bottom for loading
  useEffect(() => {
    if (aiLoading) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (messages.length > 0 && messages[messages.length - 1]?.role === "ai") {
      // Scroll so the top of the latest AI message is visible
      lastAiMsgRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, aiLoading]);

  const handleAIMessage = async (message) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setAiLoading(true);

    try {
      const res = await sendChatMessage(message);
      setMessages((prev) => [
        ...prev,
        { role: res.role, content: res.content },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "error", content: err.message || "Failed to get Gibo Response" },
      ]);
      if (err.message.includes("401")) {
        setTimeout(() => {
          localStorage.removeItem("github_token");
          setToken(null);
        }, 2000);
      }
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || aiLoading) return;
    handleAIMessage(input);
  };

  const copyMessage = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  // Simple markdown renderer
  const renderMarkdown = (text) => {
    if (!text) return "";
    return text
      .replace(/```(\w*)\s*\n([\s\S]*?)```/g, '<pre style="background:rgba(255,255,255,0.03);padding:14px;border-radius:12px;overflow-x:auto;border:1px solid rgba(255,255,255,0.05);font-size:0.8rem;line-height:1.5;margin:12px 0;font-family:monospace"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code style="background:rgba(88,166,255,0.1);padding:2px 5px;border-radius:4px;font-size:0.85em;color:#58a6ff;font-family:monospace">$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff;font-weight:700">$1</strong>')
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/^### (.+)$/gm, '<h4 style="color:var(--accent-purple);font-size:0.9rem;margin:18px 0 8px;font-weight:800">$1</h4>')
      .replace(/^## (.+)$/gm, '<h3 style="color:var(--accent-primary);font-size:1.05rem;margin:22px 0 10px;font-weight:800">$1</h3>')
      .replace(/^# (.+)$/gm, '<h2 style="color:#fff;font-size:1.25rem;margin:24px 0 12px;font-weight:900">$1</h2>')
      .replace(/^\d+\.\s+(.+)$/gm, '<li style="margin:6px 0;padding-left:12px;font-size:0.85rem">$1</li>')
      .replace(/^[-*]\s+(.+)$/gm, '<li style="margin:6px 0;padding-left:12px;list-style:disc;font-size:0.85rem">$1</li>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#58a6ff;text-decoration:none;border-bottom:1px solid rgba(88,166,255,0.2);font-weight:600">$1</a>')
      .replace(/\n\n/g, '<div style="height:12px"></div>')
      .replace(/\n/g, "<br/>");
  };

  const suggestedQuestions = [
    "How can I find beginner-friendly projects?",
    "Explain the difference between React and Next.js",
    "What are some good open-source best practices?",
    "How do I create a pull request?",
  ];

  if (!mounted) return null;

  if (!token) {
    return (
      <div style={{ 
        position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(20px)", background: "rgba(13, 17, 23, 0.7)"
      }}>
        <div style={{ 
          textAlign: "center", padding: "40px", borderRadius: "24px", background: "rgba(22, 27, 34, 0.8)",
          border: "1px solid rgba(88, 166, 255, 0.2)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          animation: "fadeIn 0.5s ease-out"
        }}>
          <h2 style={{ margin: "0 0 16px", background: "linear-gradient(135deg, #58a6ff, #bc8cff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Access Restricted</h2>
          <p style={{ color: "#8b949e", fontSize: "1.1rem", margin: 0 }}>To access Gibo Chat, please login.</p>
          <div style={{ marginTop: "24px", display: "flex", justifyContent: "center" }}>
            <div className="animate-spin" style={{ width: "24px", height: "24px", border: "3px solid rgba(88,166,255,0.1)", borderTopColor: "#58a6ff", borderRadius: "50%" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <style>{`
        @keyframes fadeInMsg { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .chat-msg { animation: fadeInMsg 0.3s ease-out forwards; }
        .suggest-chip:hover { background: rgba(88,166,255,0.2) !important; border-color: rgba(88,166,255,0.4) !important; color: #58a6ff !important; transform: translateY(-1px); }
      `}</style>

      <div style={{ 
        maxWidth: "900px", 
        margin: "0 auto", 
        width: "100%", 
        display: "flex", 
        flexDirection: "column",
        height: "100%", // Fill viewport respecting Layout padding
        flexGrow: 1,
      }}>
        
        {/* Header */}
        <div style={{ flexShrink: 0, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(88,166,255,0.08)", border: "1px solid rgba(88,166,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SmartToyIcon iconProps={{ sx: { fontSize: 24, color: "var(--accent-primary)" } }} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.05em" }}>Gibo Assistant</h1>
              <p style={{ margin: "4px 0 0", color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 450 }}>Your intelligent companion for ContriHub development.</p>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div style={{
          flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12,
          padding: "8px 0", minHeight: 0,
        }}>
          {initialLoad ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid #58a6ff", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
            </div>
          ) : messages.length === 0 && !aiLoading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: 16, padding: 24 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, rgba(88,166,255,0.12), rgba(188,140,255,0.12))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AutoAwesomeIcon iconProps={{ sx: { fontSize: 28, color: "#58a6ff" } }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <h3 style={{ margin: "0 0 6px", fontSize: "1rem", fontWeight: 800, color: "#e6edf3" }}>How can I help you today?</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", maxWidth: 500 }}>
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    className="suggest-chip"
                    onClick={() => handleAIMessage(q)}
                    style={{
                      padding: "6px 12px", borderRadius: 99, fontSize: "0.72rem", fontWeight: 600,
                      background: "rgba(33,38,45,0.5)", border: "1px solid rgba(255,255,255,0.06)",
                      color: "#8b949e", cursor: "pointer", transition: "all 0.2s ease",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!initialLoad && messages.map((msg, i) => {
            const isLastAi = msg.role === "ai" && i === messages.length - 1;
            return (
            <div
              key={i}
              className="chat-msg"
              ref={isLastAi ? lastAiMsgRef : null}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                padding: "0 4px",
              }}
            >
              <div style={{
                maxWidth: msg.role === "user" ? "75%" : "90%",
                padding: msg.role === "user" ? "10px 14px" : "20px 24px",
                borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: msg.role === "user"
                  ? "var(--accent-primary)"
                  : msg.role === "error"
                  ? "rgba(248,81,73,0.1)"
                  : "rgba(255,255,255,0.03)",
                border: msg.role === "error"
                  ? "1px solid rgba(248,81,73,0.2)"
                  : msg.role === "ai"
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "none",
                color: msg.role === "user" ? "#fff" : msg.role === "error" ? "#f85149" : "var(--text-primary)",
                fontSize: "0.82rem",
                lineHeight: 1.6,
                position: "relative",
              }}>
                {msg.role === "ai" && (
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                    <AutoAwesomeIcon iconProps={{ sx: { fontSize: 12, color: "#58a6ff" } }} />
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#58a6ff", textTransform: "uppercase", letterSpacing: "0.5px" }}>Gibo Response</span>
                    <button
                      onClick={() => copyMessage(msg.content)}
                      style={{ marginLeft: "auto", background: "none", border: "none", color: "#6e7681", cursor: "pointer", padding: 2, display: "flex" }}
                    >
                      <ContentCopyIcon iconProps={{ sx: { fontSize: 12 } }} />
                    </button>
                  </div>
                )}
                {msg.role === "user" ? (
                  <span>{msg.content}</span>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                )}
              </div>
            </div>
            );
          })}

          {aiLoading && (
            <div className="chat-msg" style={{ display: "flex", padding: "0 4px" }}>
              <div style={{
                padding: "14px 16px", borderRadius: "14px 14px 14px 4px",
                background: "rgba(22,27,34,0.7)", border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #58a6ff", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
                  <span style={{ color: "#58a6ff", fontSize: "0.78rem", fontWeight: 600 }}>Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div style={{ flexShrink: 0, padding: "12px 0" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <AutoAwesomeIcon iconProps={{ sx: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#6e7681" } }} />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message ContriHub Gibo..."
                disabled={aiLoading}
                style={{
                  width: "100%", padding: "11px 14px 11px 36px",
                  background: "rgba(22,27,34,0.6)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12, color: "#e6edf3", fontSize: "0.82rem",
                  outline: "none", boxSizing: "border-box",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(88,166,255,0.3)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>
            <button
              type="submit"
              disabled={aiLoading || !input.trim()}
              style={{
                padding: "11px 18px", borderRadius: 12,
                background: "#fff",
                border: "none", color: "#0d1117", fontWeight: 700,
                fontSize: "0.78rem", cursor: aiLoading ? "wait" : "pointer",
                opacity: aiLoading || !input.trim() ? 0.5 : 1,
                transition: "all 0.2s ease", whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              {aiLoading ? "..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
