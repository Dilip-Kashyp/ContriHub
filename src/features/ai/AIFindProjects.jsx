import { useState } from "react";
import { PsychologyIcon, SearchIcon } from "@/components";
import { findProjects, searchRepositoriesHandler } from "@/helper";
import AIDrawer from "./AIDrawer";

/**
 * "Find Projects For Me" search component with AI-enhanced results.
 */
export default function AIFindProjects() {
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setDrawerOpen(true);
    setLoading(true);
    setError(null);
    setResponse("");

    try {
      // 1. Fetch real results from GitHub to prevent AI hallucinations
      const searchRes = await searchRepositoriesHandler({ query: query.trim() });
      const items = searchRes?.items || [];
      
      // Format the top 5 real repositories for the AI to analyze
      const repoSummaries = items.slice(0, 5).map(repo => 
        `Repo: ${repo.full_name} | Stars: ${repo.stargazers_count} | Language: ${repo.language || "Unknown"}\nDesc: ${repo.description || "No description"}`
      ).join("\n\n");

      // 2. Pass real data to Gibo for ranking and personalized advice
      const data = await findProjects({ 
        query: query.trim(),
        repoResults: repoSummaries 
      });
      setResponse(data.response);
    } catch (err) {
      setError(err.message || "Failed to get Gibo recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{
        background: "linear-gradient(135deg, rgba(88,166,255,0.06), rgba(188,140,255,0.06))",
        border: "1px solid rgba(88,166,255,0.15)",
        borderRadius: 16,
        padding: "18px",
        marginBottom: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <PsychologyIcon iconProps={{ sx: { fontSize: 18, color: "#bc8cff" } }} />
          <h3 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 800, color: "#e6edf3" }}>
            Find Projects For Me
          </h3>
          <span style={{
            fontSize: "0.55rem", padding: "1px 6px", borderRadius: 4,
            background: "rgba(188,140,255,0.15)", color: "#bc8cff",
            fontWeight: 700, letterSpacing: "0.5px",
          }}>GIBO POWERED</span>
        </div>
        <p style={{ color: "#8b949e", fontSize: "0.75rem", marginBottom: 12, margin: "0 0 12px" }}>
          Describe what you're looking for and Gibo will find the best matching projects.
        </p>
        <form onSubmit={e => { e.preventDefault(); handleSearch(); }} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 200px", position: "relative" }}>
            <SearchIcon iconProps={{ sx: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#6e7681" } }} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder='e.g. "beginner React projects"'
              style={{
                width: "100%", padding: "10px 12px 10px 36px",
                background: "rgba(22,27,34,0.6)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10, color: "#e6edf3", fontSize: "0.8rem",
                outline: "none", boxSizing: "border-box",
                transition: "border-color 0.2s ease",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(188,140,255,0.3)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            style={{
              padding: "10px 18px", borderRadius: 10,
              background: "linear-gradient(135deg, #bc8cff, #58a6ff)",
              border: "none", color: "#fff", fontWeight: 700,
              fontSize: "0.78rem", cursor: "pointer",
              opacity: loading || !query.trim() ? 0.5 : 1,
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            {loading ? "Finding..." : "Find Projects"}
          </button>
        </form>
      </div>

      <AIDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Gibo Project Recommendations"
        response={response}
        loading={loading}
        error={error}
      />
    </>
  );
}
