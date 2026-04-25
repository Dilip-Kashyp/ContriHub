import { useState } from "react";
import { getDeviconUrl } from "@/helper";
import { StarIcon, CallSplitIcon, AccessTimeIcon } from "@/components";
import { LANGUAGE_COLORS, DISCOVER_PAGE_CONFIG } from "@/constants";
import AIButton from "@/features/ai/AIButton";

const { NO_DESC_TEXT } = DISCOVER_PAGE_CONFIG;

export default function RepoCard({ repo, onAskAI, onStartGuide, aiLoading }) {
  const [hovered, setHovered] = useState(false);
  const langColor = LANGUAGE_COLORS?.[repo.language] || "#8b949e";

  return (
    <div
      className="bento-item"
      style={{
        display: "flex", 
        flexDirection: "column", 
        gap: 16,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ fontSize: "0.9rem", fontWeight: 800, color: "#58a6ff", textDecoration: "none", wordBreak: "break-word", minWidth: 0 }}>{repo.full_name}</a>
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 99, background: "rgba(210,153,34,0.1)", border: "1px solid rgba(210,153,34,0.2)", fontSize: "0.7rem", color: "#d29922", fontWeight: 700, flexShrink: 0 }}>
          <StarIcon iconProps={{ sx: { fontSize: 12 } }} /> {repo.stargazers_count?.toLocaleString()}
        </div>
      </div>
      <p style={{ fontSize: "0.78rem", color: "#8b949e", lineHeight: 1.5, height: "40px", overflow: "hidden", margin: 0 }}>{repo.description || NO_DESC_TEXT}</p>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {repo.topics?.slice(0, 4).map(t => (
          <span key={t} style={{ fontSize: "0.62rem", padding: "2px 6px", borderRadius: 5, background: "rgba(88,166,255,0.05)", color: "#58a6ff", border: "1px solid rgba(88,166,255,0.1)" }}>{t}</span>
        ))}
      </div>

      {/* AI Actions */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <AIButton label="Ask Gibo" onClick={() => onAskAI(repo)} loading={aiLoading === `explain-${repo.id}`} variant="primary" />
        <AIButton label="Where to Start" onClick={() => onStartGuide(repo)} loading={aiLoading === `start-${repo.id}`} variant="secondary" />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12, flexWrap: "wrap" }}>
        {repo.language && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.72rem", color: "#6e7681" }}>
            {getDeviconUrl(repo.language) ? (
              <img src={getDeviconUrl(repo.language)} style={{ width: 12, height: 12 }} alt={repo.language} />
            ) : (
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: langColor }} />
            )}
            <span>{repo.language}</span>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.72rem", color: "#6e7681" }}>
          <CallSplitIcon iconProps={{ sx: { fontSize: 12 } }} /> <span>{repo.forks_count}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.72rem", color: "#6e7681", marginLeft: "auto" }}>
          <AccessTimeIcon iconProps={{ sx: { fontSize: 12 } }} /> <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
