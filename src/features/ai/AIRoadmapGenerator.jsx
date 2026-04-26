import { useState } from "react";
import { RouteIcon } from "@/components";

const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner", color: "#3fb950" },
  { value: "intermediate", label: "Intermediate", color: "#58a6ff" },
  { value: "advanced", label: "Advanced", color: "#bc8cff" },
];

const INTERESTS = ["React", "Backend", "AI/ML", "DevOps", "Mobile", "Full-Stack", "Data Science", "CLI Tools"];

export default function AIRoadmapGenerator({ isFullPage = false }) {
  const [interest, setInterest] = useState("");
  const [customInterest, setCustomInterest] = useState("");
  const [skillLevel, setSkillLevel] = useState("beginner");

  const handleGenerate = () => {
    const finalInterest = customInterest.trim() || interest;
    if (!finalInterest) return;
    
    const prompt = `Create a detailed learning roadmap for me.
Interest: ${finalInterest}
Skill Level: ${skillLevel}

Please provide a step-by-step roadmap with recommended topics to learn and GitHub projects to study or contribute to. Make sure to include repository links in [Name](URL) format.`;

    window.location.href = `/chat?q=${encodeURIComponent(prompt)}`;
  };

  return (
    <div className="bento-item" style={{ 
      padding:"32px", 
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.05)",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        {!isFullPage && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <RouteIcon iconProps={{ sx: { fontSize: 24, color: "#bc8cff" } }} />
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800 }}>Gibo Roadmap</h3>
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 800, color: "#8b949e", textTransform: "uppercase", letterSpacing: "2px", display: "block", marginBottom: 12 }}>Select Your Skill Level</label>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {SKILL_LEVELS.map(sl => (
              <button 
                key={sl.value} 
                onClick={() => setSkillLevel(sl.value)} 
                style={{ 
                  padding: "12px 24px", 
                  borderRadius: 12, 
                  background: skillLevel === sl.value ? `${sl.color}20` : "rgba(33,38,45,0.4)", 
                  border: `1px solid ${skillLevel === sl.value ? sl.color : "rgba(255,255,255,0.1)"}`, 
                  color: skillLevel === sl.value ? sl.color : "#8b949e", 
                  fontWeight: 700, 
                  fontSize: "0.9rem", 
                  cursor: "pointer", 
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  flex: 1,
                  minWidth: "120px"
                }}
              >
                {sl.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 800, color: "#8b949e", textTransform: "uppercase", letterSpacing: "2px", display: "block", marginBottom: 12 }}>What do you want to learn?</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
            {INTERESTS.map(i => (
              <button 
                key={i} 
                onClick={() => { setInterest(i); setCustomInterest(""); }} 
                style={{ 
                  padding: "8px 16px", 
                  borderRadius: 99, 
                  fontSize: "0.85rem", 
                  background: interest === i ? "rgba(88,166,255,0.2)" : "rgba(33,38,45,0.3)", 
                  border: `1px solid ${interest === i ? "#58a6ff" : "rgba(255,255,255,0.1)"}`, 
                  color: interest === i ? "#58a6ff" : "#8b949e", 
                  fontWeight: 600, 
                  cursor: "pointer", 
                  transition: "all 0.2s ease" 
                }}
              >
                {i}
              </button>
            ))}
          </div>
          <input 
            value={customInterest} 
            onChange={e => { setCustomInterest(e.target.value); setInterest(""); }} 
            placeholder="Or type custom interest (e.g. Kubernetes, Web3...)" 
            style={{ 
              width: "100%", 
              padding: "12px 16px", 
              background: "rgba(13,17,23,0.6)", 
              border: "1px solid rgba(255,255,255,0.1)", 
              borderRadius: 12, 
              color: "#e6edf3", 
              fontSize: "1rem", 
              outline: "none", 
              boxSizing: "border-box",
              transition: "all 0.3s ease",
              "&:focus": { borderColor: "#58a6ff" }
            }} 
          />
        </div>

        <button 
          onClick={handleGenerate} 
          disabled={!interest && !customInterest.trim()} 
          style={{ 
            width: "100%",
            padding: "16px", 
            borderRadius: "14px", 
            background: "#fff", 
            border: "none", 
            color: "#0d1117", 
            fontWeight: 700, 
            fontSize: "1.05rem", 
            cursor: "pointer", 
            opacity: (!interest && !customInterest.trim()) ? 0.5 : 1,
            transition: "all 0.3s ease",
          }}
        >
          Build My Gibo Roadmap
        </button>
      </div>
    </div>
  );
}
