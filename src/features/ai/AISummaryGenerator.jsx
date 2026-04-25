import { useState } from "react";
import { AutoAwesomeIcon } from "@/components";
import { generateSummary } from "@/helper";
import AIDrawer from "./AIDrawer";

export default function AISummaryGenerator({ user, repos }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!user) return;
    setDrawerOpen(true); setLoading(true); setError(null); setResponse("");

    const langMap = {};
    (repos || []).forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
    const skills = Object.entries(langMap).sort((a, b) => b[1] - a[1]).map(([l]) => l).join(", ");
    const projects = (repos || []).slice(0, 5).map(r => `${r.name}: ${r.description || "No description"}`).join("; ");

    try {
      const data = await generateSummary({ skills, projects, experience: user.bio || "" });
      setResponse(data.response);
    } catch (err) {
      setError(err.message || "Failed to generate summary");
    } finally { setLoading(false); }
  };

  return (
    <>
      <button onClick={handleGenerate} disabled={loading} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 10, background: "rgba(63,185,80,0.1)", border: "1px solid rgba(63,185,80,0.2)", color: "#3fb950", fontSize: "0.7rem", fontWeight: 700, cursor: "pointer", transition: "all 0.3s ease", opacity: loading ? 0.6 : 1 }}>
        <AutoAwesomeIcon iconProps={{ sx: { fontSize: 12 } }} />
        {loading ? "Generating..." : "Gen Summary"}
      </button>
      <AIDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Professional Summary" response={response} loading={loading} error={error} />
    </>
  );
}
