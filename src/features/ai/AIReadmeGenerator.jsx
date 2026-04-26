import { AutoAwesomeIcon } from "@/components";

export default function AIReadmeGenerator({ user, repos }) {

  const handleGenerate = () => {
    if (!user) return;
    
    const topRepos = (repos || []).slice(0, 5).map(r => `- ${r.name}: ${r.description || "No description"} (${r.language || "N/A"}, ★${r.stargazers_count})`).join("\n");
    const langMap = {};
    (repos || []).forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
    const languages = Object.entries(langMap).sort((a, b) => b[1] - a[1]).map(([l]) => l).join(", ");

    const prompt = `Generate a professional GitHub profile README for me. 
Username: ${user.login}
Name: ${user.name || user.login}
Bio: ${user.bio || "N/A"}
Top Repositories:
${topRepos}
Primary Languages: ${languages}

Please provide a clean, modern markdown README that I can use for my profile.`;

    window.location.href = `/chat?q=${encodeURIComponent(prompt)}`;
  };

  return (
    <button onClick={handleGenerate} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 10, background: "linear-gradient(135deg, rgba(88,166,255,0.15), rgba(188,140,255,0.15))", border: "1px solid rgba(88,166,255,0.3)", color: "#58a6ff", fontSize: "0.7rem", fontWeight: 700, cursor: "pointer", transition: "all 0.3s ease" }}>
      <AutoAwesomeIcon iconProps={{ sx: { fontSize: 12 } }} />
      Gen README
    </button>
  );
}
