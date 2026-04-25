import AIReadmeGenerator from "@/features/ai/AIReadmeGenerator";
import AISummaryGenerator from "@/features/ai/AISummaryGenerator";

const fmt = (n) => n?.toLocaleString() ?? "0";

const Skeleton = ({ w, h, r = 16 }) => (
  <div style={{
    width: w, height: h, borderRadius: r,
    background: "linear-gradient(90deg, #161b22 25%, #21262d 50%, #161b22 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 2s infinite linear"
  }} />
);

export default function ProfileHeader({ user, repos }) {
  return (
    <div className="bento-item profile-header" style={{ gridColumn: "span 12", display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap", justifyContent: "space-between" }}>
      {user ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <img src={user.avatar_url} style={{ width: "96px", height: "96px", borderRadius: "50%", border: "4px solid rgba(88,166,255,0.2)", padding: "4px" }} />
              <div style={{ position: "absolute", bottom: 4, right: 4, width: 20, height: 20, background: "#3fb950", borderRadius: "50%", border: "4px solid #161b22" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{ fontSize: "2rem", fontWeight: 900, margin: "0 0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", letterSpacing: "-1px" }}>{user.name || user.login}</h1>
              <p style={{ color: "#8b949e", margin: "0 0 16px", fontSize: "1rem" }}>@{user.login}</p>
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                <div style={{ fontSize: "0.9rem" }}><span style={{ color: "#fff", fontWeight: 800 }}>{fmt(user.followers)}</span> <span style={{ color: "#8b949e" }}>Followers</span></div>
                <div style={{ fontSize: "0.9rem" }}><span style={{ color: "#fff", fontWeight: 800 }}>{fmt(user.following)}</span> <span style={{ color: "#8b949e" }}>Following</span></div>
                {user.location && <div style={{ fontSize: "0.9rem", color: "#8b949e" }}>📍 {user.location}</div>}
              </div>
            </div>
          </div>
          {/* AI Buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", background: "rgba(188,140,255,0.05)", padding: "16px", borderRadius: "20px", border: "1px solid rgba(188,140,255,0.2)" }}>
            <div style={{ width: "100%", fontSize: "0.75rem", fontWeight: 800, color: "#bc8cff", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Gibo Profile Tools</div>
            <AIReadmeGenerator user={user} repos={repos} />
            <AISummaryGenerator user={user} repos={repos} />
          </div>
        </>
      ) : <Skeleton w="100%" h="160px" r="24px" />}
    </div>
  );
}
