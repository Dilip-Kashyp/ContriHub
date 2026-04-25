import { useState } from "react";
import { AutoAwesomeIcon, ContentCopyIcon } from "@/components";
import { generateReadme } from "@/helper";
import AIDrawer from "./AIDrawer";

export default function AIReadmeGenerator({ user, repos }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!user) return;
    setDrawerOpen(true); setLoading(true); setError(null); setResponse("");

    const topRepos = (repos || []).slice(0, 5).map(r => `- ${r.name}: ${r.description || "No description"} (${r.language || "N/A"}, ★${r.stargazers_count})`).join("\n");
    const langMap = {};
    (repos || []).forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
    const languages = Object.entries(langMap).sort((a, b) => b[1] - a[1]).map(([l]) => l).join(", ");

    try {
      const data = await generateReadme({ username: user.login, name: user.name || user.login, bio: user.bio || "", topRepos, languages });
      setResponse(data.response);
    } catch (err) {
      setError(err.message || "Failed to generate README");
    } finally { setLoading(false); }
  };

  return (
    <>
      <button onClick={handleGenerate} disabled={loading} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 10, background: "linear-gradient(135deg, rgba(88,166,255,0.15), rgba(188,140,255,0.15))", border: "1px solid rgba(88,166,255,0.3)", color: "#58a6ff", fontSize: "0.7rem", fontWeight: 700, cursor: "pointer", transition: "all 0.3s ease", opacity: loading ? 0.6 : 1 }}>
        <AutoAwesomeIcon iconProps={{ sx: { fontSize: 12 } }} />
        {loading ? "Generating..." : "Gen README"}
      </button>
      <AIDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Generated Profile README" response={response} loading={loading} error={error} />
    </>
  );
}
