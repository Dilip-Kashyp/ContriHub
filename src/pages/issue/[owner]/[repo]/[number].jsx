import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/features/layout/Layout.jsx";
import { AutoAwesomeIcon, AccessTimeIcon, OpenInNewIcon } from "@/components";
import { getLabelColor, daysAgo } from "@/helper/issue";

export default function IssueDetailsPage() {
  const router = useRouter();
  const { owner, repo, number } = router.query;

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  useEffect(() => {
    if (!owner || !repo || !number) return;

    const fetchIssue = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${number}`);
        if (!res.ok) throw new Error("Failed to fetch issue");
        const data = await res.json();
        setIssue(data);
        generateAiSummary(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [owner, repo, number]);

  const generateAiSummary = async (issueData) => {
    setAiLoading(true);
    try {
      const { sendChatMessage } = await import("@/helper/ai");
      const prompt = `Please explain this GitHub issue for a beginner and suggest how to approach it:\n\nTitle: ${issueData.title}\n\nDescription: ${issueData.body || 'No description provided.'}`;
      const res = await sendChatMessage(prompt);
      setAiResponse(res.content || res.response || "No response");
    } catch (err) {
      setAiError(err.message || "Failed to get Gibo Summary");
    } finally {
      setAiLoading(false);
    }
  };

  const renderMarkdown = (text) => {
    if (!text) return "";
    let html = text
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre style="background:rgba(22,27,34,0.8);padding:14px;border-radius:12px;overflow-x:auto;border:1px solid rgba(255,255,255,0.05);font-size:0.8rem;line-height:1.5;margin:12px 0"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code style="background:rgba(88,166,255,0.1);padding:2px 5px;border-radius:4px;font-size:0.85em;color:#58a6ff">$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e6edf3">$1</strong>')
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/^### (.+)$/gm, '<h4 style="color:#bc8cff;font-size:0.95rem;margin:18px 0 8px;font-weight:800">$1</h4>')
      .replace(/^## (.+)$/gm, '<h3 style="color:#58a6ff;font-size:1.05rem;margin:22px 0 10px;font-weight:800">$1</h3>')
      .replace(/^# (.+)$/gm, '<h2 style="color:#e6edf3;font-size:1.2rem;margin:24px 0 12px;font-weight:900">$1</h2>')
      .replace(/^\d+\.\s+(.+)$/gm, '<li style="margin:6px 0;padding-left:12px;font-size:0.9rem">$1</li>')
      .replace(/^[-*]\s+(.+)$/gm, '<li style="margin:6px 0;padding-left:12px;list-style:disc;font-size:0.9rem">$1</li>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#58a6ff;text-decoration:none;border-bottom:1px solid rgba(88,166,255,0.2);font-weight:600">$1</a>')
      .replace(/\n\n/g, '<div style="height:12px"></div>')
      .replace(/\n/g, "<br/>");
    return html;
  };

  if (!owner || !repo || !number) return null;

  return (
    <Layout>
      <div className="issue-container" style={{ maxWidth: 900, margin: "0 auto" }}>
        
        <button 
          onClick={() => router.back()} 
          style={{ background: "transparent", border: "none", color: "#58a6ff", cursor: "pointer", marginBottom: 24, fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}
        >
          &larr; Back to Discover
        </button>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", border: "3px solid #58a6ff", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
          </div>
        ) : error ? (
          <div style={{ color: "#f85149", textAlign: "center", padding: "100px 0" }}>Error: {error}</div>
        ) : issue ? (
          <>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: "0.9rem", color: "#8b949e", marginBottom: 8 }}>{owner}/{repo}</div>
              <h1 style={{ fontSize: "2rem", color: "#fff", margin: "0 0 16px", lineHeight: 1.2 }}>
                {issue.title} <span style={{ color: "#8b949e", fontWeight: 400 }}>#{issue.number}</span>
              </h1>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: "0.9rem", alignItems: "center", paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ 
                  color: issue.state === "open" ? "#3fb950" : "#a371f7", 
                  background: issue.state === "open" ? "rgba(63,185,80,0.1)" : "rgba(163,113,247,0.1)", 
                  padding: "4px 12px", borderRadius: 16, fontWeight: 600, 
                  border: `1px solid ${issue.state === "open" ? "rgba(63,185,80,0.2)" : "rgba(163,113,247,0.2)"}` 
                }}>
                  {issue.state === "open" ? "Open" : "Closed"}
                </span>
                
                <span style={{ color: "#8b949e" }}>
                  Opened {daysAgo(issue.created_at)} by <strong style={{ color: "#c9d1d9" }}>{issue.user?.login}</strong>
                </span>

                <span style={{ color: "#8b949e" }}>
                  {issue.comments} comments
                </span>

                <a href={issue.html_url} target="_blank" rel="noreferrer" style={{ color: "#58a6ff", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
                  View on GitHub <OpenInNewIcon iconProps={{ sx: { fontSize: 14 } }} />
                </a>
              </div>
            </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 10 }}>
                {issue.assignees && issue.assignees.length > 0 && (
                  <div>
                    <h4 style={{ margin: "0 0 12px", color: "#8b949e", fontSize: "0.85rem" }}>Assignees</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {issue.assignees.map(user => (
                        <a key={user.id} href={user.html_url} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: "#e6edf3", textDecoration: "none" }}>
                          <img src={user.avatar_url} alt={user.login} style={{ width: 24, height: 24, borderRadius: "50%" }} />
                          <span style={{ fontWeight: 600 }}>{user.login}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {issue.labels && issue.labels.length > 0 && (
                  <div>
                    <h4 style={{ margin: "0 0 12px", color: "#8b949e", fontSize: "0.85rem" }}>Labels</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {issue.labels.map(label => {
                        const col = getLabelColor(label.name);
                        return (
                          <span key={label.id} style={{
                            background: `${col}15`, border: `1px solid ${col}30`, color: col,
                            padding: "4px 10px", borderRadius: 12, fontSize: "0.75rem", fontWeight: 600
                          }}>
                            {label.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

            {/* Gibo AI Box */}
            <div style={{
              background: "linear-gradient(180deg, rgba(88,166,255,0.08), rgba(22,27,34,0.3))",
              border: "1px solid rgba(88,166,255,0.2)",
              borderRadius: 16,
              padding: "24px",
              marginBottom: 32,
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <AutoAwesomeIcon iconProps={{ sx: { fontSize: 22, color: "#58a6ff" } }} />
                <h2 style={{ color: "#58a6ff", fontSize: "1.1rem", margin: 0 }}>Gibo Issue Breakdown</h2>
              </div>

              {aiLoading ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%",
                      border: "2px solid #58a6ff", borderTopColor: "transparent",
                      animation: "spin 0.8s linear infinite",
                    }} />
                    <span style={{ color: "#8b949e", fontSize: "0.9rem" }}>Analyzing the issue...</span>
                  </div>
                  {[80, 100, 60, 90].map((w, i) => (
                    <div key={i} style={{
                      width: `${w}%`, height: 12, borderRadius: 6,
                      background: "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)",
                      backgroundSize: "200% 100%",
                      animation: `shimmer 2s infinite linear`,
                      animationDelay: `${i * 150}ms`,
                    }} />
                  ))}
                </div>
              ) : aiError ? (
                <div style={{ color: "#f85149", fontSize: "0.9rem", background: "rgba(248,81,73,0.1)", padding: "12px", borderRadius: 8 }}>
                  {aiError}
                </div>
              ) : aiResponse && (
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(aiResponse) }} style={{ color: "#e6edf3", fontSize: "0.95rem", lineHeight: 1.6 }} />
              )}
            </div>

            <div style={{  gridTemplateColumns: "1fr 280px", gap: 32 }}>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "24px" }}>
                <h3 style={{ margin: "0 0 16px", color: "#8b949e", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: 1 }}>Description</h3>
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(issue.body || "No description provided.") }} style={{ color: "#c9d1d9", fontSize: "0.95rem", lineHeight: 1.6 }} />
              </div>
            </div>

          </>
        ) : null}
      </div>
    </Layout>
  );
}
