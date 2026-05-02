import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getChatHistory } from "@/helper/ai";
import { searchRepositoriesHandler, getUserProfileHandler } from "@/helper";
import { LOCAL_STORAGE_KEY } from "@/constants/common";
import { AI_STRINGS } from "@/constants";
import { apiClient } from "@/helper/apiClient";
import { TrendingUpIcon, SmartToyIcon, StarIcon, OpenInNewIcon, CallSplitIcon, RocketIcon, BoltIcon } from "@/components";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";
import { DASHBOARD_STRINGS, TECH_KEYWORDS, ACHIEVEMENTS } from "@/constants/dashboard";
import { extractTopicFrequency } from "@/helper/dashboard";

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [topics, setTopics] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [reposLoading, setReposLoading] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const [openPRs, setOpenPRs] = useState([]);
  const [prsLoading, setPrsLoading] = useState(false);
  const [user, setUser] = useState(null);
  
  const [eventsData, setEventsData] = useState([]);
  const [languagesData, setLanguagesData] = useState([]);
  const [multiTrendingRepos, setMultiTrendingRepos] = useState([]);

  useEffect(() => {
    setMounted(true);
    const t = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    if (t) setToken(t);
  }, []);

  useEffect(() => {
    if (!mounted || !token) return;

    const loadHistory = async () => {
      setHistoryLoading(true);
      try {
        const data = await getChatHistory();
        if (data?.messages) {
          setMessageCount(data.messages.length);
          const extracted = extractTopicFrequency(data.messages);
          setTopics(extracted);

          if (extracted.length > 0) {
            setReposLoading(true);
            const top5 = extracted.slice(0, 5);
            try {
              const promises = top5.map(t => searchRepositoriesHandler({ query: `${t.key} stars:>1000`, sort: "stars" }));
              const results = await Promise.all(promises);
              
              const multi = [];
              top5.forEach((t, idx) => {
                 multi.push({
                    topic: t.label,
                    repos: results[idx]?.items?.slice(0, 3) || []
                 });
              });
              setMultiTrendingRepos(multi);
            } catch (e) {
              console.error(e);
            } finally {
              setReposLoading(false);
            }
          } else {
            setReposLoading(false);
          }
        }
      } catch {
      } finally {
        setHistoryLoading(false);
      }
    };

    loadHistory();

    getUserProfileHandler().then(u => {
      setUser(u);
      if (u?.login) {
        setPrsLoading(true);
        apiClient({ url: `/github/search/issues?q=type:pr+author:${u.login}+state:open&per_page=10&sort=updated`, method: "GET" })
          .then(data => setOpenPRs(data?.items || []))
          .catch(() => setOpenPRs([]))
          .finally(() => setPrsLoading(false));

        apiClient({ url: `/github/users/${u.login}/events?per_page=100`, method: "GET" })
          .then(events => {
            if (Array.isArray(events)) {
               const counts = {};
               events.forEach(e => {
                 if (["PushEvent", "PullRequestEvent", "IssuesEvent", "CreateEvent"].includes(e.type)) {
                    const date = new Date(e.created_at).toISOString().split('T')[0];
                    let activity = 1;
                    if (e.type === "PushEvent") {
                      activity = e.payload?.size || e.payload?.commits?.length || 1;
                    }
                    counts[date] = (counts[date] || 0) + activity;
                 }
               });
               const chartData = [];
               for(let i=14; i>=0; i--) {
                 const d = new Date();
                 d.setDate(d.getDate() - i);
                 const dStr = d.toISOString().split('T')[0];
                 chartData.push({ date: d.toLocaleDateString(undefined, {month: 'short', day: 'numeric'}), activity: counts[dStr] || 0 });
               }
               setEventsData(chartData);
            }
          }).catch(console.error);

        apiClient({ url: `/github/users/${u.login}/repos?per_page=100`, method: "GET" })
          .then(repos => {
            if (Array.isArray(repos)) {
              const langs = {};
              repos.forEach(r => {
                if(r.language) {
                  langs[r.language] = (langs[r.language] || 0) + 1;
                }
              });
              const langData = Object.keys(langs).map(k => ({ name: k, count: langs[k] })).sort((a,b)=>b.count - a.count).slice(0, 5);
              setLanguagesData(langData);
            }
          }).catch(console.error);
      } else {
        setPrsLoading(false);
      }
    }).catch(() => setPrsLoading(false));
  }, [mounted, token]);

  useEffect(() => {
    if (mounted && !token) {
      const t = setTimeout(() => router.push("/login"), 2500);
      return () => clearTimeout(t);
    }
  }, [mounted, token, router]);

  if (!mounted) return null;

  if (!token) {
    return (
      <div className="restricted-overlay">
        <div className="restricted-card">
          <h2 className="restricted-title">{DASHBOARD_STRINGS.ACCESS_RESTRICTED}</h2>
          <p style={{ color: "#8b949e", fontSize: "1.1rem", margin: 0 }}>{DASHBOARD_STRINGS.LOGIN_REQUIRED}</p>
          <div style={{ marginTop: "24px", display: "flex", justifyContent: "center" }}>
            <div className="loading-spinner" />
          </div>
        </div>
      </div>
    );
  }

  const maxCount = topics.length > 0 ? topics[0].count : 1;
  const maxLangCount = languagesData.length > 0 ? languagesData[0].count : 1;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dash-header">
        <h1 className="dash-title">{DASHBOARD_STRINGS.TITLE}</h1>
        <p className="dash-subtitle">
          {DASHBOARD_STRINGS.SUBTITLE(messageCount)}
        </p>
      </div>

      <div className="dash-grid">
        {/* Topic Insights */}
        <div className="dash-card" style={{ gridColumn: "span 7" }}>
          <div className="dash-card-title-row">
            <SmartToyIcon iconProps={{ sx: { fontSize: 16, color: "#bc8cff" } }} />
            <span className="dash-card-label">{DASHBOARD_STRINGS.TOPICS_SECTION_TITLE}</span>
          </div>

          {historyLoading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
              <div className="loading-spinner" style={{ borderTopColor: "#bc8cff" }} />
            </div>
          ) : topics.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <p style={{ color: "#6e7681", fontSize: "0.82rem", margin: 0 }}>{AI_STRINGS.NO_HISTORY}</p>
              <button onClick={() => router.push("/chat")} className="interest-tag" style={{ marginTop: 16, background: "rgba(188,140,255,0.12)", border: "1px solid rgba(188,140,255,0.2)", color: "#bc8cff", cursor: "pointer" }}>
                {AI_STRINGS.OPEN_CHAT_BTN}
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {topics.map((t) => (
                <div key={t.key}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#e6edf3" }}>{t.label}</span>
                    <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>{DASHBOARD_STRINGS.MENTIONS(t.count)}</span>
                  </div>
                  <div className="topic-bar-container">
                    <div className="topic-bar" style={{ background: t.color, "--bar-w": `${(t.count / maxCount) * 100}%`, width: `${(t.count / maxCount) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {messageCount > 0 && (
            <p style={{ margin: "20px 0 0", fontSize: "0.68rem", color: "rgba(255,255,255,0.2)" }}>
              {DASHBOARD_STRINGS.MESSAGES_COUNT_DESC(messageCount)}
            </p>
          )}
        </div>

        {/* Quick stats */}
        <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="dash-card" style={{ flex: 1 }}>
            <p className="stat-label">{AI_STRINGS.MESSAGES_LABEL}</p>
            <p className="stat-value">{messageCount}</p>
          </div>
          <div className="dash-card" style={{ flex: 1 }}>
            <p className="stat-label">{DASHBOARD_STRINGS.TOP_INTERESTS}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {topics.slice(0, 5).map(t => (
                <span key={t.key} className="interest-tag" style={{ color: t.color, background: `${t.color}20` }}>
                  {t.label}
                </span>
              ))}
              {topics.length === 0 && <span className="stat-value">—</span>}
            </div>
          </div>
          <div className="dash-card" style={{ flex: 1 }}>
            <p className="stat-label">{DASHBOARD_STRINGS.TOPICS_TRACKED}</p>
            <p className="stat-value">{topics.length}</p>
          </div>
        </div>

        {/* GitHub Data Charts */}
        <div className="dash-card" style={{ gridColumn: "span 12", display: "flex", gap: 24, flexDirection: "row", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px" }}>
             <h3 className="chart-header">{DASHBOARD_STRINGS.GITHUB_ACTIVITY}</h3>
             <div style={{ height: 200 }}>
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={eventsData}>
                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                   <XAxis dataKey="date" stroke="#6e7681" fontSize={10} tickLine={false} axisLine={false} />
                   <YAxis stroke="#6e7681" fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} />
                   <Tooltip contentStyle={{ background: "#161b22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: "0.75rem", color: "#e6edf3" }} />
                   <Line type="monotone" dataKey="activity" stroke="#3fb950" strokeWidth={2} dot={{ r: 3, fill: "#3fb950" }} activeDot={{ r: 5 }} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </div>
          
          <div style={{ flex: "1 1 300px" }}>
             <h3 className="chart-header">{DASHBOARD_STRINGS.TOP_LANGUAGES}</h3>
             <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
               {languagesData.map((t) => (
                 <div key={t.name}>
                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                     <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#e6edf3" }}>{t.name}</span>
                     <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>{DASHBOARD_STRINGS.REPO_COUNT(t.count)}</span>
                   </div>
                   <div className="topic-bar-container">
                     <div className="topic-bar" style={{ background: "#58a6ff", "--bar-w": `${(t.count / maxLangCount) * 100}%`, width: `${(t.count / maxLangCount) * 100}%` }} />
                   </div>
                 </div>
               ))}
               {languagesData.length === 0 && (
                 <div style={{ fontSize: "0.75rem", color: "#6e7681", textAlign: "center", padding: "20px 0" }}>No language data found.</div>
               )}
             </div>
          </div>
        </div>

        {/* Gamification Badges */}
        <div className="dash-card" style={{ gridColumn: "span 12", display: "flex", gap: 16, flexDirection: "column" }}>
          <h3 className="chart-header" style={{ margin: 0 }}>{DASHBOARD_STRINGS.ACHIEVEMENTS_TITLE}</h3>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {ACHIEVEMENTS.map(ach => (
              <div key={ach.id} className="achievement-card" style={{ border: `1px solid ${ach.border}`, background: ach.bg, opacity: ach.locked ? 0.5 : 1 }}>
                <div className="achievement-icon-wrapper" style={{ background: ach.iconBg }}>
                  {ach.type === 'rocket' && <RocketIcon iconProps={{ sx: { fontSize: 20, color: ach.color } }} />}
                  {ach.type === 'bolt' && <BoltIcon iconProps={{ sx: { fontSize: 20, color: ach.color } }} />}
                  {ach.type === 'star' && <StarIcon iconProps={{ sx: { fontSize: 20, color: ach.color } }} />}
                </div>
                <div>
                  <p className="achievement-title" style={{ color: ach.color }}>{ach.title}</p>
                  <p className="achievement-desc">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PR Tracker */}
        <div className="dash-card" style={{ gridColumn: "span 12" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CallSplitIcon iconProps={{ sx: { fontSize: 16, color: "#bc8cff" } }} />
              <span className="dash-card-label">{DASHBOARD_STRINGS.PR_TRACKER_TITLE}</span>
            </div>
            {user?.login && (
              <a href={`https://github.com/pulls?q=is:pr+is:open+author:${user.login}`} target="_blank" rel="noreferrer" className="blog-card-link" style={{ fontSize: '0.68rem', color: '#bc8cff', opacity: 0.7 }}>
                {DASHBOARD_STRINGS.VIEW_ALL_GITHUB}
              </a>
            )}
          </div>

          {prsLoading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
              <div className="loading-spinner" style={{ borderTopColor: "#bc8cff" }} />
            </div>
          ) : openPRs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <p style={{ color: "#6e7681", fontSize: "0.82rem", margin: "0 0 12px" }}>
                {user ? DASHBOARD_STRINGS.NO_PRS_FOUND : DASHBOARD_STRINGS.LOGIN_REQUIRED}
              </p>
              <button onClick={() => router.push("/discover")} className="interest-tag" style={{ background: "rgba(88,166,255,0.1)", border: "1px solid rgba(88,166,255,0.2)", color: "#58a6ff", cursor: "pointer" }}>
                {DASHBOARD_STRINGS.FIND_ISSUES_BTN}
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {openPRs.map(pr => {
                const repoName = pr.repository_url?.replace("https://api.github.com/repos/", "") || "";
                const daysOpen = Math.floor((Date.now() - new Date(pr.created_at)) / 86400000);
                const isStale = daysOpen > 7;
                return (
                  <a key={pr.id} href={pr.html_url} target="_blank" rel="noreferrer" className="pr-card">
                    <div className="pr-status-dot" style={{ background: isStale ? "#d29922" : "#3fb950" }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="pr-title">{pr.title}</div>
                      <div className="pr-meta">{repoName} · #{pr.number}</div>
                    </div>
                    <div style={{ fontSize: "0.65rem", color: isStale ? "#d29922" : "#6e7681", fontWeight: 600, flexShrink: 0 }}>
                      {daysOpen === 0 ? DASHBOARD_STRINGS.STALE_PR_TODAY : DASHBOARD_STRINGS.STALE_PR(daysOpen)}
                    </div>
                    <OpenInNewIcon iconProps={{ sx: { fontSize: 12, color: "#6e7681", flexShrink: 0 } }} />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Trending repos based on interests */}
        <div className="dash-card" style={{ gridColumn: "span 12" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <TrendingUpIcon iconProps={{ sx: { fontSize: 16, color: "#58a6ff" } }} />
              <span className="dash-card-label" style={{ color: '#58a6ff' }}>{DASHBOARD_STRINGS.REPOS_MATCHING_TITLE}</span>
            </div>
            <button onClick={() => router.push("/trending")} style={{ fontSize: "0.68rem", color: "#58a6ff", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>
              {DASHBOARD_STRINGS.VIEW_ALL_TRENDING}
            </button>
          </div>

          {reposLoading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
              <div className="loading-spinner" />
            </div>
          ) : multiTrendingRepos.length === 0 ? (
            <p style={{ color: "#6e7681", fontSize: "0.82rem", textAlign: "center", padding: "24px 0", margin: 0 }}>
              {topics.length === 0 ? AI_STRINGS.SUGGEST_START : "No repos found."}
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {multiTrendingRepos.map(group => (
                <div key={group.topic}>
                  <h4 style={{ margin: "0 0 12px", fontSize: "0.8rem", color: "#e6edf3" }}>{DASHBOARD_STRINGS.TOP_FOR(group.topic)}</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                    {group.repos.map(repo => (
                      <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="match-repo-card">
                        <p className="match-repo-name">{repo.full_name}</p>
                        {repo.description && (
                          <p className="match-repo-desc" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {repo.description}
                          </p>
                        )}
                        <div style={{ display: "flex", gap: 12 }}>
                          <span className="repo-stat">
                            <StarIcon iconProps={{ sx: { fontSize: 10 } }} />
                            {(repo.stargazers_count || 0).toLocaleString()}
                          </span>
                          {repo.language && (
                            <span className="repo-stat" style={{ display: 'inline' }}>{repo.language}</span>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
