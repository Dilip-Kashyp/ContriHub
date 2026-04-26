import { AutoAwesomeIcon } from "@/components";

export default function AISummaryGenerator({ user, repos }) {
  const handleGenerate = () => {
    if (!user) return;

    const langMap = {};
    (repos || []).forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
    const skills = Object.entries(langMap).sort((a, b) => b[1] - a[1]).map(([l]) => l).join(", ");
    const projects = (repos || []).slice(0, 5).map(r => `${r.name}: ${r.description || "No description"}`).join("; ");

    const prompt = `Generate a professional professional summary for my developer profile. 
Name: ${user.name || user.login}
Skills: ${skills}
Key Projects: ${projects}
Bio/Experience: ${user.bio || "N/A"}

Please provide a concise and impactful professional summary (2-3 paragraphs) highlighting my technical strengths and contributions.`;

    window.location.href = `/chat?q=${encodeURIComponent(prompt)}`;
  };

  return (
    <button onClick={handleGenerate} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 10, background: "rgba(63,185,80,0.1)", border: "1px solid rgba(63,185,80,0.2)", color: "#3fb950", fontSize: "0.7rem", fontWeight: 700, cursor: "pointer", transition: "all 0.3s ease" }}>
      <AutoAwesomeIcon iconProps={{ sx: { fontSize: 12 } }} />
      Gen Summary
    </button>
  );
}
