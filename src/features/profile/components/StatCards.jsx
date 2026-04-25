import { MenuBookIcon, HistoryIcon, PeopleIcon, LinkIcon } from "@/components";

const fmt = (n) => n?.toLocaleString() ?? "0";

export default function StatCards({ user }) {
  const stats = [
    { label: "Public Repos", val: user?.public_repos, color: "#58a6ff", icon: <MenuBookIcon iconProps={{ sx: { fontSize: 20, color: "#58a6ff" } }} /> },
    { label: "Public Gists", val: user?.public_gists, color: "#bc8cff", icon: <HistoryIcon iconProps={{ sx: { fontSize: 20, color: "#bc8cff" } }} /> },
    { label: "Followers", val: user?.followers, color: "#3fb950", icon: <PeopleIcon iconProps={{ sx: { fontSize: 20, color: "#3fb950" } }} /> },
    { label: "Following", val: user?.following, color: "#d29922", icon: <LinkIcon iconProps={{ sx: { fontSize: 20, color: "#d29922" } }} /> }
  ];

  return (
    <>
      {stats.map((s, i) => (
        <div key={i} className="bento-item stat-cell" style={{ gridColumn: "span 3", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: `${s.color}15`, width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${s.color}33` }}>
            {s.icon}
          </div>
          <div>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#6e7681", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>{s.label}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, color: s.color }}>{fmt(s.val)}</div>
          </div>
        </div>
      ))}
    </>
  );
}
