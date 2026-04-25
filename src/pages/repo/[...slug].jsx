import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "@/features/layout/Layout.jsx";
import { explainRepo } from "@/helper";
import { apiClient } from "@/helper/apiClient";
import {
  AutoAwesomeIcon, GitHubIcon, StarIcon, CallSplitIcon,
  MenuBookIcon, ArrowBackIcon, ContentCopyIcon, OpenInNewIcon
} from "@/components";
import { LANGUAGE_COLORS } from "@/constants";
import { getDeviconUrl } from "@/helper";

export default function RepoAIPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const chatEndRef = useRef(null);

  const owner = slug?.[0];
  const name = slug?.[1];
  const fullName = owner && name ? `${owner}/${name}` : "";

  // Fetch repo data
  useEffect(() => {
    if (!fullName) return;
    setLoading(true);
    apiClient({ url: `/github/repos/${fullName}`, method: "GET" })
      .then((data) => {
        setRepo(data);
        setLoading(false);
        // Auto-generate initial summary
        handleAIMessage(
          `Give me a brief overview of this repository: ${fullName}`,
          data,
          true
        );
      })
      .catch(() => {
        setLoading(false);
      });
  }, [fullName]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAIMessage = async (question, repoData = repo, isSystem = false) => {
    if (!question.trim() || !repoData) return;

    if (!isSystem) {
      setMessages((prev) => [...prev, { role: "user", content: question }]);
    }
    setInput("");
    setAiLoading(true);

    try {
      const res = await explainRepo({
        repoName: repoData.full_name || fullName,
        description: repoData.description || "",
        language: repoData.language || "",
        topics: (repoData.topics || []).join(", "),
        question: question,
      });
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: res.response, cached: res.cached },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "error", content: err.message || "Failed to get Gibo response" },
      ]);
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
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre style="background:rgba(22,27,34,0.9);padding:12px;border-radius:10px;overflow-x:auto;border:1px solid rgba(255,255,255,0.06);font-size:0.78rem;line-height:1.5;margin:8px 0"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code style="background:rgba(88,166,255,0.1);padding:1px 5px;border-radius:4px;font-size:0.78em;color:#58a6ff">$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e6edf3">$1</strong>')
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/^### (.+)$/gm, '<h4 style="color:#bc8cff;font-size:0.88rem;margin:14px 0 6px;font-weight:800">$1</h4>')
      .replace(/^## (.+)$/gm, '<h3 style="color:#58a6ff;font-size:0.95rem;margin:18px 0 8px;font-weight:800">$1</h3>')
      .replace(/^# (.+)$/gm, '<h2 style="color:#e6edf3;font-size:1.1rem;margin:18px 0 10px;font-weight:900">$1</h2>')
      .replace(/^\d+\.\s+(.+)$/gm, '<li style="margin:4px 0;padding-left:4px;font-size:0.82rem">$1</li>')
      .replace(/^[-*]\s+(.+)$/gm, '<li style="margin:4px 0;padding-left:4px;list-style:disc;font-size:0.82rem">$1</li>')
      .replace(/\n\n/g, '<div style="height:8px"></div>')
      .replace(/\n/g, "<br/>");
  };

  const langColor = LANGUAGE_COLORS?.[repo?.language] || "#8b949e";

  const suggestedQuestions = [
    "How do I contribute to this project?",
    "What's the tech stack used?",
    "Explain the architecture",
    "What are good first issues?",
    "How to set up locally?",
  ];

  return (
    <Layout>
      <style>{`
        @keyframes fadeInMsg { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .chat-msg { animation: fadeInMsg 0.3s ease-out forwards; }
        .suggest-chip:hover { background: rgba(88,166,255,0.2) !important; border-color: rgba(88,166,255,0.4) !important; color: #58a6ff !important; transform: translateY(-1px); }
      `}</style>

      <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", height: "calc(100vh - 120px)", minHeight: 0 }}>
        {/* Back button + repo header */}
        <div style={{ flexShrink: 0, marginBottom: 12 }}>
          <button
            onClick={() => router.back()}
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "6px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(22,27,34,0.4)", color: "#8b949e", fontSize: "0.75rem",
              fontWeight: 600, cursor: "pointer", marginBottom: 12, transition: "all 0.2s ease",
            }}
          >
            <ArrowBackIcon iconProps={{ sx: { fontSize: 14 } }} /> Back
          </button>

          {loading ? (
            <div style={{ padding: 20, textAlign: "center", color: "#8b949e" }}>Loading repo...</div>
          ) : repo ? (
            <div style={{
              background: "rgba(22,27,34,0.6)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16,
              padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, rgba(88,166,255,0.15), rgba(188,140,255,0.15))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MenuBookIcon iconProps={{ sx: { fontSize: 20, color: "#58a6ff" } }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 800, color: "#e6edf3" }}>{repo.full_name}</h2>
                  <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 3, color: "#6e7681", fontSize: "0.7rem", textDecoration: "none" }}>
                    <OpenInNewIcon iconProps={{ sx: { fontSize: 12 } }} /> GitHub
                  </a>
                </div>
                <p style={{ margin: "4px 0 0", color: "#8b949e", fontSize: "0.75rem", lineHeight: 1.4 }}>{repo.description || "No description"}</p>
              </div>
              <div style={{ display: "flex", gap: 10, flexShrink: 0, flexWrap: "wrap" }}>
                {repo.language && (
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.7rem", color: "#8b949e" }}>
                    {getDeviconUrl(repo.language) ? (
                      <img src={getDeviconUrl(repo.language)} style={{ width: 12, height: 12 }} alt={repo.language} />
                    ) : (
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: langColor }} />
                    )}
                    {repo.language}
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.7rem", color: "#d29922" }}>
                  <StarIcon iconProps={{ sx: { fontSize: 12 } }} /> {repo.stargazers_count?.toLocaleString()}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.7rem", color: "#8b949e" }}>
                  <CallSplitIcon iconProps={{ sx: { fontSize: 12 } }} /> {repo.forks_count}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: 20, textAlign: "center", color: "#f85149" }}>Repository not found</div>
          )}
        </div>

        {/* Chat area */}
        <div style={{
          flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12,
          padding: "8px 0", minHeight: 0,
        }}>
          {messages.length === 0 && !aiLoading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: 16, padding: 24 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, rgba(88,166,255,0.12), rgba(188,140,255,0.12))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AutoAwesomeIcon iconProps={{ sx: { fontSize: 28, color: "#58a6ff" } }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <h3 style={{ margin: "0 0 6px", fontSize: "1rem", fontWeight: 800, color: "#e6edf3" }}>Ask anything about this repo</h3>
                <p style={{ margin: 0, color: "#6e7681", fontSize: "0.78rem" }}>Gibo will analyze the repository and answer your questions</p>
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

          {messages.map((msg, i) => (
            <div key={i} className="chat-msg" style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              padding: "0 4px",
            }}>
              <div style={{
                maxWidth: msg.role === "user" ? "75%" : "90%",
                padding: msg.role === "user" ? "10px 14px" : "14px 16px",
                borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: msg.role === "user"
                  ? "linear-gradient(135deg, #58a6ff, #388bfd)"
                  : msg.role === "error"
                  ? "rgba(248,81,73,0.1)"
                  : "rgba(22,27,34,0.7)",
                border: msg.role === "error"
                  ? "1px solid rgba(248,81,73,0.2)"
                  : msg.role === "ai"
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "none",
                color: msg.role === "user" ? "#fff" : msg.role === "error" ? "#f85149" : "#c9d1d9",
                fontSize: "0.82rem",
                lineHeight: 1.6,
                position: "relative",
              }}>
                {msg.role === "ai" && (
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                    <AutoAwesomeIcon iconProps={{ sx: { fontSize: 12, color: "#58a6ff" } }} />
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#58a6ff", textTransform: "uppercase", letterSpacing: "0.5px" }}>Gibo Response</span>
                    {msg.cached && <span style={{ fontSize: "0.55rem", padding: "1px 5px", borderRadius: 4, background: "rgba(63,185,80,0.1)", color: "#3fb950" }}>cached</span>}
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
          ))}

          {aiLoading && (
            <div className="chat-msg" style={{ display: "flex", padding: "0 4px" }}>
              <div style={{
                padding: "14px 16px", borderRadius: "14px 14px 14px 4px",
                background: "rgba(22,27,34,0.7)", border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #58a6ff", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
                  <span style={{ color: "#58a6ff", fontSize: "0.78rem", fontWeight: 600 }}>Analyzing repository...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div style={{ flexShrink: 0, padding: "12px 0" }}>
          {/* Quick suggestion chips */}
          {messages.length > 0 && (
            <div style={{ display: "flex", gap: 5, marginBottom: 8, overflowX: "auto", paddingBottom: 4 }}>
              {["How to contribute?", "Tech stack?", "Setup guide", "Architecture"].map((q) => (
                <button
                  key={q}
                  onClick={() => handleAIMessage(q)}
                  disabled={aiLoading}
                  style={{
                    padding: "4px 10px", borderRadius: 99, fontSize: "0.65rem", fontWeight: 600,
                    background: "rgba(33,38,45,0.5)", border: "1px solid rgba(255,255,255,0.06)",
                    color: "#6e7681", cursor: aiLoading ? "wait" : "pointer", whiteSpace: "nowrap",
                    transition: "all 0.2s ease", opacity: aiLoading ? 0.5 : 1, flexShrink: 0,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <AutoAwesomeIcon iconProps={{ sx: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#6e7681" } }} />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about this repository..."
                disabled={aiLoading || !repo}
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
                background: "linear-gradient(135deg, #58a6ff, #388bfd)",
                border: "none", color: "#fff", fontWeight: 700,
                fontSize: "0.78rem", cursor: aiLoading ? "wait" : "pointer",
                opacity: aiLoading || !input.trim() ? 0.5 : 1,
                transition: "all 0.2s ease", whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              {aiLoading ? "..." : "Ask"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
