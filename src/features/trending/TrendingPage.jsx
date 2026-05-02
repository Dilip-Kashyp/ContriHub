import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Layout from "@/features/layout/Layout.jsx";
import { searchRepositoriesHandler } from "@/helper";
import { TrendingUpIcon, OpenInNewIcon, StarIcon, CodeIcon } from "@/components";
import { LOCAL_STORAGE_KEY } from "@/constants/common";
import { TRENDING_STRINGS, TECH_KEYWORDS, OSS_EVENTS } from "@/constants/trending";

function extractTopics(messages) {
  const freq = {};
  const allText = messages
    .map(m => (m.content || "").toLowerCase())
    .join(" ");

  TECH_KEYWORDS.forEach(kw => {
    const count = (allText.match(new RegExp(`\\b${kw}\\b`, "gi")) || []).length;
    if (count > 0) freq[kw] = count;
  });

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
}

export default function TrendingPage() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState(OSS_EVENTS);
  const [reposLoading, setReposLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("repos");

  useEffect(() => {
    setMounted(true);
    const t = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    if (t) setToken(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadRepos = async () => {
      setReposLoading(true);
      try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const dateString = thirtyDaysAgo.toISOString().split('T')[0];

        const data = await searchRepositoriesHandler({
          query: `stars:>1000 pushed:>${dateString}`,
          sort: "stars",
          order: "desc",
        });
        setRepos(data?.items || []);
      } catch {
        setRepos([]);
      } finally {
        setReposLoading(false);
      }
    };

    loadRepos();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <Layout>
      <div className="trending-container">
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(88,166,255,0.08)", border: "1px solid rgba(88,166,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrendingUpIcon iconProps={{ sx: { fontSize: 20, color: "#58a6ff" } }} />
            </div>
            <div>
              <h1 className="blogs-title" style={{ fontSize: '1.4rem' }}>{TRENDING_STRINGS.TITLE}</h1>
              <p className="blogs-subtitle" style={{ fontSize: '0.78rem', marginTop: 2 }}>{TRENDING_STRINGS.SUBTITLE}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          <button 
            className={`trend-tab ${activeTab === "repos" ? "active" : ""}`} 
            onClick={() => setActiveTab("repos")}
          >
            {TRENDING_STRINGS.TAB_REPOS}
          </button>
          <button 
            className={`trend-tab ${activeTab === "events" ? "active" : ""}`} 
            onClick={() => setActiveTab("events")}
          >
            {TRENDING_STRINGS.TAB_EVENTS}
          </button>
        </div>

        {/* Repos Tab */}
        {activeTab === "repos" && (
          <div className="repos-wrapper">
            {reposLoading ? (
              <div style={{ padding: "40px 0", display: "flex", justifyContent: "center" }}>
                <div className="loading-spinner" />
              </div>
            ) : repos.map((repo, i) => (
              <div key={repo.id} className={`repo-row trend-card`} style={{ animationDelay: `${i * 40}ms` }}>
                <span className="repo-index">{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="repo-name"
                    >
                      {repo.full_name}
                    </a>
                    {repo.language && (
                      <span className="repo-lang-badge">
                        {repo.language}
                      </span>
                    )}
                  </div>
                  {repo.description && (
                    <p className="repo-desc" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {repo.description}
                    </p>
                  )}
                  <div className="repo-meta">
                    <span className="repo-stat">
                      <StarIcon iconProps={{ sx: { fontSize: 12 } }} />
                      {(repo.stargazers_count || 0).toLocaleString()}
                    </span>
                    {repo.forks_count > 0 && (
                      <span className="repo-stat" style={{ display: 'inline' }}>
                        {repo.forks_count.toLocaleString()} forks
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div>
            <div className="events-subtitle">
              {TRENDING_STRINGS.EVENTS_SUBTITLE}
            </div>

            {events.map((ev, i) => (
              <div key={ev.id} className={`event-card trend-card`} style={{ animationDelay: `${i * 50}ms` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <a href={ev.url} target="_blank" rel="noopener noreferrer" className="event-name">
                      {ev.name}
                    </a>
                    <div className="event-meta">
                      {ev.start && (
                        <span className="event-date">
                          {new Date(ev.start).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      )}
                      <span className="event-location">{ev.location}</span>
                    </div>
                  </div>
                  <a href={ev.url} target="_blank" rel="noopener noreferrer" className="event-action">
                    <OpenInNewIcon iconProps={{ sx: { fontSize: 14 } }} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
