import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/features/layout/Layout.jsx";
import { AutoAwesomeIcon, OpenInNewIcon, StarIcon, CallSplitIcon, LanguageIcon } from "@/components";
import { getDeviconUrl } from "@/helper";
import { LANGUAGE_COLORS } from "@/constants";

export default function RepoDetailsPage() {
  const router = useRouter();
  const { owner, repo } = router.query;

  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  useEffect(() => {
    if (!owner || !repo) return;

    const fetchRepo = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (!res.ok) throw new Error("Failed to fetch repository");
        const data = await res.json();
        setRepoData(data);
        generateAiSummary(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepo();
  }, [owner, repo]);

  const generateAiSummary = async (data) => {
    setAiLoading(true);
    try {
      const { explainRepo } = await import("@/helper");
      const res = await explainRepo({
        repoName: data.full_name,
        description: data.description || "",
        language: data.language || "",
        topics: (data.topics || []).join(", "),
      });
      setAiResponse(res.response || "No response");
    } catch (err) {
      setAiError(err.message || "Failed to get Gibo Explanation");
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

  if (!owner || !repo) return null;

  return (
    <Layout>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        
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
        ) : repoData ? (
          <>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: "0.9rem", color: "#8b949e", marginBottom: 8 }}>{owner}</div>
              <h1 style={{ fontSize: "2.5rem", color: "#fff", margin: "0 0 12px", lineHeight: 1.2 }}>
                {repoData.name}
              </h1>

              <p style={{ color: "#c9d1d9", fontSize: "1.1rem", maxWidth: 700, margin: "0 0 24px", lineHeight: 1.6 }}>
                {repoData.description || "No description provided."}
              </p>

              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontSize: "0.9rem", alignItems: "center", paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                
                {repoData.language && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#e6edf3" }}>
                    {getDeviconUrl(repoData.language) ? (
                      <img src={getDeviconUrl(repoData.language)} style={{ width: 14, height: 14 }} alt={repoData.language} />
                    ) : (
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: LANGUAGE_COLORS?.[repoData.language] || "#8b949e" }} />
                    )}
                    <span style={{ fontWeight: 600 }}>{repoData.language}</span>
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#8b949e" }}>
                  <StarIcon iconProps={{ sx: { fontSize: 16 } }} />
                  <span style={{ fontWeight: 600, color: "#e6edf3" }}>{repoData.stargazers_count?.toLocaleString()}</span> stars
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#8b949e" }}>
                  <CallSplitIcon iconProps={{ sx: { fontSize: 16 } }} />
                  <span style={{ fontWeight: 600, color: "#e6edf3" }}>{repoData.forks_count?.toLocaleString()}</span> forks
                </div>

                <a href={repoData.html_url} target="_blank" rel="noreferrer" style={{ color: "#58a6ff", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, marginLeft: "auto", fontWeight: 600 }}>
                  View on GitHub <OpenInNewIcon iconProps={{ sx: { fontSize: 14 } }} />
                </a>
              </div>
            </div>

            {repoData.topics && repoData.topics.length > 0 && (
              <div style={{ marginBottom: 32, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {repoData.topics.map(t => (
                  <span key={t} style={{
                    background: "rgba(188,140,255,0.1)", border: "1px solid rgba(188,140,255,0.2)", color: "#bc8cff",
                    padding: "4px 12px", borderRadius: 16, fontSize: "0.75rem", fontWeight: 600
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Gibo AI Box */}
            <div style={{
              background: "linear-gradient(180deg, rgba(88,166,255,0.08), rgba(22,27,34,0.3))",
              border: "1px solid rgba(88,166,255,0.2)",
              borderRadius: 16,
              padding: "32px",
              marginBottom: 32,
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <AutoAwesomeIcon iconProps={{ sx: { fontSize: 24, color: "#58a6ff" } }} />
                <h2 style={{ color: "#58a6ff", fontSize: "1.2rem", margin: 0 }}>Gibo Repository Breakdown</h2>
              </div>

              {aiLoading ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%",
                      border: "2px solid #58a6ff", borderTopColor: "transparent",
                      animation: "spin 0.8s linear infinite",
                    }} />
                    <span style={{ color: "#8b949e", fontSize: "0.95rem" }}>Analyzing codebase & documentation...</span>
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
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(aiResponse) }} style={{ color: "#e6edf3", fontSize: "1rem", lineHeight: 1.7 }} />
              )}
            </div>

          </>
        ) : null}
      </div>
    </Layout>
  );
}
