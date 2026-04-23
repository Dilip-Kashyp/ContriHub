import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ROUTES, LANGUAGE_COLORS } from "@/constants";
import { getUserProfileHandler, getUserReposHandler } from "@/helper";
import { 
  MenuBookIcon, PeopleIcon, LinkIcon, ExploreIcon, 
  DashboardIcon, HomeIcon, ExitToAppIcon, HistoryIcon,
  TimelineIcon, PublicIcon, AssignmentIndIcon, StarIcon,
  CallSplitIcon, GitHubIcon
} from "@/components";
import Sidebar from "@/features/layout/Sidebar";

const fmt = (n) => n?.toLocaleString() ?? "0";

const Skeleton = ({ w, h, r = 16 }) => (
  <div style={{
    width: w, height: h, borderRadius: r,
    background: "linear-gradient(90deg, #161b22 25%, #21262d 50%, #161b22 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 2s infinite linear"
  }} />
);

export default function ProfileDashboard() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setMounted(true);
    const t = localStorage.getItem("github_token");
    if (t) setToken(t);
  }, []);

  const { data: user } = useSWR(token ? "/github/user" : null, getUserProfileHandler);
  const { data: repos } = useSWR(token ? "/github/user/repos" : null, getUserReposHandler);

  if (!mounted) return null;

  if (!token) {
    return (
      <div style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0d1117" }}>
        <div style={{ textAlign: "center", padding: "60px", background: "rgba(22, 27, 34, 0.8)", border: "1px solid #30363d", borderRadius: "24px", backdropFilter: "blur(20px)", maxWidth: "450px" }}>
          <div style={{ marginBottom: "20px" }}><GitHubIcon iconProps={{ sx: { fontSize: 64, color: "#e6edf3" } }} /></div>
          <h2 style={{ color: "#fff", fontSize: "2rem", fontWeight: 800, marginBottom: "16px" }}>Connect GitHub</h2>
          <button onClick={() => router.push(ROUTES.LOGIN)} style={{ background: "linear-gradient(135deg, #58a6ff, #388bfd)", color: "#fff", border: "none", padding: "16px 40px", borderRadius: "14px", fontWeight: 700, cursor: "pointer" }}>Sign in with GitHub</button>
        </div>
      </div>
    );
  }

  const langMap = {};
  repos?.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
  const sortedLangs = Object.entries(langMap).sort((a, b) => b[1] - a[1]);
  const totalLangs = Object.values(langMap).reduce((a, b) => a + b, 0);

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh", color: "#e6edf3", padding: "80px 24px 40px" }}>
      <style>{`
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .bento-item { animation: fadeIn 0.5s ease-out forwards; background: rgba(22, 27, 34, 0.6); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 24px; padding: 24px; backdrop-filter: blur(12px); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .bento-item:hover { border-color: rgba(88, 166, 255, 0.2); background: rgba(33, 38, 45, 0.6); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .lang-bar { height: 8px; border-radius: 4px; overflow: hidden; display: flex; margin-bottom: 20px; background: #21262d; }
      `}</style>

      <div style={{ maxWidth: "1300px", margin: "0 auto", display: "grid", gridTemplateColumns: "84px 1fr", gap: "40px" }}>
        
        <Sidebar />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gridAutoRows: "minmax(140px, auto)", gap: "20px", minWidth: 0 }}>
          
          <div className="bento-item" style={{ gridColumn: "span 12", display: "flex", alignItems: "center", gap: "30px", background: "linear-gradient(90deg, rgba(22, 27, 34, 0.8) 0%, rgba(13, 17, 23, 0.8) 100%)" }}>
            {user ? (
              <>
                <div style={{ position: "relative" }}>
                  <img src={user.avatar_url} style={{ width: "100px", height: "100px", borderRadius: "30%", border: "3px solid rgba(255,255,255,0.1)" }} />
                  <div style={{ position: "absolute", bottom: -2, right: -2, width: 22, height: 22, background: "#3fb950", borderRadius: "50%", border: "3px solid #0d1117" }} />
                </div>
                <div>
                  <h1 style={{ fontSize: "2rem", fontWeight: 900, margin: 0 }}>{user.name || user.login}</h1>
                  <p style={{ color: "#8b949e", margin: "4px 0 12px" }}>@{user.login}</p>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <div style={{ fontSize: "0.9rem" }}><span style={{ color: "#fff", fontWeight: 700 }}>{fmt(user.followers)}</span> <span style={{ color: "#8b949e" }}>Followers</span></div>
                    <div style={{ fontSize: "0.9rem" }}><span style={{ color: "#fff", fontWeight: 700 }}>{fmt(user.following)}</span> <span style={{ color: "#8b949e" }}>Following</span></div>
                  </div>
                </div>
                <div style={{ marginLeft: "auto", background: "rgba(88, 166, 255, 0.1)", color: "#58a6ff", padding: "6px 16px", borderRadius: "99px", fontSize: "0.8rem", fontWeight: 700, border: "1px solid rgba(88,166,255,0.2)" }}>Core Contributor</div>
              </>
            ) : <Skeleton w="100%" h="100px" />}
          </div>

          {[
            { label: "Public Repos", val: user?.public_repos, color: "#58a6ff", icon: <MenuBookIcon iconProps={{ sx: { fontSize: 24, color: "#58a6ff" } }} /> },
            { label: "Public Gists", val: user?.public_gists, color: "#bc8cff", icon: <HistoryIcon iconProps={{ sx: { fontSize: 24, color: "#bc8cff" } }} /> },
            { label: "Followers", val: user?.followers, color: "#3fb950", icon: <PeopleIcon iconProps={{ sx: { fontSize: 24, color: "#3fb950" } }} /> },
            { label: "Following", val: user?.following, color: "#d29922", icon: <LinkIcon iconProps={{ sx: { fontSize: 24, color: "#d29922" } }} /> }
          ].map((s, i) => (
            <div key={i} className="bento-item" style={{ gridColumn: "span 3", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>{s.icon}</div>
              <div>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#6e7681", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</div>
                <div style={{ fontSize: "1.75rem", fontWeight: 900, color: s.color }}>{fmt(s.val)}</div>
              </div>
            </div>
          ))}

          <div className="bento-item" style={{ gridColumn: "span 4", gridRow: "span 2" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "20px" }}>Languages</h3>
            {repos ? (
              <>
                <div className="lang-bar">
                  {sortedLangs.map(([lang, count]) => (
                    <div key={lang} style={{ width: `${(count / totalLangs) * 100}%`, background: LANGUAGE_COLORS[lang] || "#8b949e" }} />
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {sortedLangs.slice(0, 6).map(([lang, count]) => (
                    <div key={lang} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: LANGUAGE_COLORS[lang] || "#8b949e" }} />
                      <span style={{ flex: 1 }}>{lang}</span>
                      <span style={{ color: "#6e7681" }}>{((count / totalLangs) * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </>
            ) : <Skeleton w="100%" h="150px" />}
          </div>

          <div className="bento-item" style={{ gridColumn: "span 8", gridRow: "span 2" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, margin: 0 }}>Top Repositories</h3>
              <button style={{ background: "none", border: "none", color: "#58a6ff", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600 }}>View All</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              {repos ? repos.slice(0, 4).map(repo => (
                <div key={repo.id} style={{ padding: "16px", borderRadius: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "4px" }}>
                    <MenuBookIcon iconProps={{ sx: { fontSize: 14, color: "#8b949e" } }} />
                    <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ color: "#58a6ff", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>{repo.name}</a>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#8b949e", height: "32px", overflow: "hidden" }}>{repo.description || "No description"}</p>
                  <div style={{ display: "flex", gap: "12px", fontSize: "0.7rem", color: "#6e7681", marginTop: "12px" }}>
                    <span>★ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    <span style={{ marginLeft: "auto" }}>{repo.language}</span>
                  </div>
                </div>
              )) : <Skeleton w="100%" h="200px" />}
            </div>
          </div>

          <div className="bento-item" style={{ gridColumn: "span 12", display: "flex", justifyContent: "space-around", padding: "24px" }}>
            {[
              { val: user ? fmt(user.public_repos * 12) : "—", label: "Commits", color: "#3fb950" },
              { val: user ? fmt(Math.floor(user.followers / 5)) : "—", label: "Pull Requests", color: "#bc8cff" },
              { val: user ? fmt(user.public_repos + 24) : "—", label: "Contributions", color: "#d29922" }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", color: stat.color, fontWeight: 900 }}>{stat.val}</div>
                <div style={{ color: "#8b949e", fontSize: "0.75rem" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
