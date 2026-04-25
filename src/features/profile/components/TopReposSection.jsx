import { useRouter } from "next/router";
import { MenuBookIcon, AutoAwesomeIcon } from "@/components";

const Skeleton = ({ w, h, r = 16 }) => (
  <div style={{
    width: w, height: h, borderRadius: r,
    background: "linear-gradient(90deg, #161b22 25%, #21262d 50%, #161b22 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 2s infinite linear"
  }} />
);

export default function TopReposSection({ repos }) {
  const router = useRouter();

  return (
    <div className="bento-item repos-cell" style={{ gridColumn: "span 8", gridRow: "span 2" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>Top Repositories</h3>
        <button style={{ background: "none", border: "none", color: "#58a6ff", fontSize: "0.85rem", cursor: "pointer", fontWeight: 700 }}>View All</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {repos ? repos.slice(0, 4).map(repo => (
          <div
            key={repo.id}
            onClick={() => router.push(`/repo/${repo.full_name}`)}
            style={{ 
              padding: "16px", 
              borderRadius: "16px", 
              background: "rgba(255,255,255,0.02)", 
              border: "1px solid rgba(255,255,255,0.05)", 
              cursor: "pointer", 
              transition: "all 0.3s ease",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px"
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(88,166,255,0.3)"; e.currentTarget.style.background = "rgba(88,166,255,0.05)"; e.currentTarget.style.transform = "translateX(4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.transform = "translateX(0)"; }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "6px" }}>
                <MenuBookIcon iconProps={{ sx: { fontSize: 16, color: "#8b949e" } }} />
                <span style={{ color: "#58a6ff", fontWeight: 700, fontSize: "0.95rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{repo.name}</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "#8b949e", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{repo.description || "No description provided"}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", flexShrink: 0 }}>
              <div style={{ display: "flex", gap: "12px", fontSize: "0.75rem", color: "#6e7681", fontWeight: 600 }}>
                <span>★ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#bc8cff", fontSize: "0.75rem", fontWeight: 800, background: "rgba(188,140,255,0.1)", padding: "2px 8px", borderRadius: "12px" }}>
                <AutoAwesomeIcon iconProps={{ sx: { fontSize: 12 } }} /> Ask Gibo
              </span>
            </div>
          </div>
        )) : <Skeleton w="100%" h="200px" />}
      </div>
    </div>
  );
}
