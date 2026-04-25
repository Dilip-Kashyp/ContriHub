import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { searchRepositoriesHandler } from "@/helper";
import { getDeviconUrl } from "@/helper";
import {
  SearchIcon, StarIcon, UpdateIcon, HelpIcon, CallSplitIcon,
  LanguageIcon, OpenInNewIcon, ErrorIcon, ExploreIcon,
  AccessTimeIcon, AutoAwesomeIcon, FilterListIcon
} from "@/components";
import { 
  DISCOVER_PAGE_CONFIG, LANGUAGE_OPTIONS, TOPIC_OPTIONS, 
  DISCOVER_LABELS, SORT_OPTIONS, MIN_STAR_OPTIONS, 
  LANGUAGE_COLORS, ROUTES 
} from "@/constants";
import AIButton from "@/features/ai/AIButton";
import AIDrawer from "@/features/ai/AIDrawer";
import AIFindProjects from "@/features/ai/AIFindProjects";
import AIRoadmapGenerator from "@/features/ai/AIRoadmapGenerator";
import { explainRepo, getStartGuide } from "@/helper";

const { ERROR_TEXT, NO_PROJECTS_TEXT, NO_DESC_TEXT, ISSUES_LABEL, UPDATED_LABEL } = DISCOVER_PAGE_CONFIG;

const ICON_MAP = { AutoAwesomeIcon, HelpIcon, ErrorIcon, ExploreIcon };

// ── Responsive Styles ──────────────────────────────────────────────────────────
const s = {
  page: { minHeight: "100vh", background: "transparent", padding: "80px 24px 40px" },
  headerBand: { marginBottom: 24 },
  searchRow: { display: "flex", gap: 8, alignItems: "center", marginBottom: 24, flexWrap: "wrap" },
  searchWrap: { flex: "1 1 250px", position: "relative" },
  searchIcon: { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#6e7681", fontSize: 18 },
  searchInput: {
    width: "100%", background: "rgba(33,38,45,0.4)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12,
    padding: "12px 12px 12px 42px", color: "#e6edf3", fontSize: "0.85rem", outline: "none", boxSizing: "border-box",
    transition: "all 0.3s ease",
  },
  sortSelect: { background: "rgba(33,38,45,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px", color: "#e6edf3", fontSize: "0.85rem", outline: "none", cursor: "pointer", flex: "0 1 auto" },
  searchBtn: {
    background: "linear-gradient(135deg, #58a6ff, #388bfd)", border: "none", borderRadius: 12,
    padding: "12px 20px", color: "#fff", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer",
    boxShadow: "0 4px 14px rgba(56, 139, 253, 0.3)", flex: "0 1 auto", whiteSpace: "nowrap"
  },
  filterGroup: { marginBottom: 16 },
  filterLabel: { fontSize: "0.65rem", fontWeight: 800, color: "#6e7681", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  chip: (active, color) => ({
    display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 99,
    fontSize: "0.72rem", fontWeight: active ? 700 : 500, cursor: "pointer",
    border: "1px solid",
    borderColor: active ? (color || "#58a6ff") : "rgba(255,255,255,0.05)",
    background: active ? `${(color || "#58a6ff")}15` : "rgba(33,38,45,0.3)",
    color: active ? (color || "#58a6ff") : "#8b949e",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: active ? "translateY(-1px)" : "none",
    boxShadow: active ? `0 4px 12px ${color || "#58a6ff"}15` : "none"
  }),
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: 16 }
};

import RepoCard from "./components/RepoCard";

export default function DiscoverProjects() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("good-first-issues:>0");
  const [selectedLangs, setSelectedLangs] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [sort, setSort] = useState("stars");
  const [minStars, setMinStars] = useState(0);
  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(false);

  // AI state
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [aiDrawerTitle, setAiDrawerTitle] = useState("Gibo Response");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(null); // tracks which button is loading
  const [aiError, setAiError] = useState(null);

  useEffect(() => { setMounted(true); }, []);

  const toggleFilter = (val, list, setList) => {
    if (list.includes(val)) setList(list.filter(item => item !== val));
    else setList([...list, val]);
    setPage(1);
  };

  const buildFinalQuery = () => {
    let q = query;
    if (selectedLangs.length) q += ` ${selectedLangs.map(l => `language:${l}`).join(" ")}`;
    if (selectedLabels.length) q += ` ${selectedLabels.map(l => `label:${l}`).join(" ")}`;
    if (selectedTopics.length) q += ` ${selectedTopics.map(t => `topic:${t}`).join(" ")}`;
    if (minStars > 0) q += ` stars:>=${minStars}`;
    return q;
  };

  const finalQuery = buildFinalQuery();
  const { data, error, isLoading } = useSWR(mounted ? `/discover?q=${encodeURIComponent(finalQuery)}&sort=${sort}&page=${page}` : null, () => searchRepositoriesHandler({ query: finalQuery, sort, order: "desc", page }));

  const handleAskAI = async (repo) => {
    setAiLoading(`explain-${repo.id}`);
    setAiDrawerTitle(`Gibo: ${repo.full_name}`);
    setAiDrawerOpen(true);
    setAiResponse("");
    setAiError(null);
    try {
      const res = await explainRepo({
        repoName: repo.full_name,
        description: repo.description || "",
        language: repo.language || "",
        topics: (repo.topics || []).join(", "),
      });
      setAiResponse(res.response);
    } catch (err) {
      setAiError(err.message || "Failed to get Gibo response");
    } finally { setAiLoading(null); }
  };

  const handleStartGuide = async (repo) => {
    setAiLoading(`start-${repo.id}`);
    setAiDrawerTitle(`Start Guide: ${repo.full_name}`);
    setAiDrawerOpen(true);
    setAiResponse("");
    setAiError(null);
    try {
      const res = await getStartGuide({
        repoName: repo.full_name,
        description: repo.description || "",
        language: repo.language || "",
      });
      setAiResponse(res.response);
    } catch (err) {
      setAiError(err.message || "Failed to get start guide");
    } finally { setAiLoading(null); }
  };

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .discover-title { font-size: 1.6rem !important; }
          .discover-subtitle { font-size: 0.85rem !important; margin-bottom: 24px !important; }
        }
      `}</style>
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <div style={{ minWidth: 0, width: "100%" }}>
          <div style={s.headerBand}>
            <h1 className="discover-title" style={{ fontSize: "2rem", fontWeight: 900, color: "#e6edf3", marginBottom: 8, letterSpacing: "-1px" }}>Discover <span style={{ background: "linear-gradient(135deg, #58a6ff, #bc8cff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Projects</span></h1>
            <p className="discover-subtitle" style={{ color: "#8b949e", marginBottom: 28, fontSize: "0.9rem" }}>Find the perfect open-source project to start your contribution journey.</p>
            
            {/* Premium AI Tools Banner */}
            <div className="bento-item" style={{ padding: "24px", marginBottom: "32px", background: "rgba(88, 166, 255, 0.05)", border: "1px solid rgba(88, 166, 255, 0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <AutoAwesomeIcon iconProps={{ sx: { color: "var(--accent-primary)", fontSize: 24 } }} />
                <h2 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#fff" }}>Gibo Project Suggester</h2>
              </div>
              <div style={{ maxWidth: "600px" }}>
                <AIFindProjects />
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); if (searchInput.trim()) { setQuery(searchInput.trim()); setPage(1); } }} style={s.searchRow}>
              <div style={s.searchWrap}><SearchIcon iconProps={{ sx: s.searchIcon }} /><input value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder="Search projects, keywords..." style={s.searchInput} /></div>
              
              <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }} style={s.sortSelect}>
                {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>

              <button type="submit" style={s.searchBtn}>Find</button>
            </form>

            {/* MIN STARS */}
            <div style={s.filterGroup}>
              <div style={s.filterLabel}><StarIcon iconProps={{ sx: { fontSize: 14 } }} /> Minimum Stars</div>
              <div style={s.chipRow}>
                {MIN_STAR_OPTIONS.map(opt => (
                  <div key={opt.value} onClick={() => { setMinStars(opt.value); setPage(1); }} style={s.chip(minStars === opt.value, "#d29922")}>
                    {opt.label}
                  </div>
                ))}
              </div>
            </div>

            {/* LANGUAGES */}
            <div style={s.filterGroup}>
              <div style={s.filterLabel}><LanguageIcon iconProps={{ sx: { fontSize: 14 } }} /> Languages</div>
              <div style={s.chipRow}>
                {LANGUAGE_OPTIONS.map(lang => (
                  <div key={lang.value} onClick={() => toggleFilter(lang.value, selectedLangs, setSelectedLangs)} style={s.chip(selectedLangs.includes(lang.value), lang.color)}>
                    {getDeviconUrl(lang.label) ? (
                      <img src={getDeviconUrl(lang.label)} style={{ width: 12, height: 12 }} alt={lang.label} />
                    ) : (
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: lang.color }} />
                    )}
                    {lang.label}
                  </div>
                ))}
              </div>
            </div>

            {/* LABELS */}
            <div style={s.filterGroup}>
              <div style={s.filterLabel}><FilterListIcon iconProps={{ sx: { fontSize: 14 } }} /> Tags & Labels</div>
              <div style={s.chipRow}>
                {DISCOVER_LABELS.map(label => {
                  const Icon = ICON_MAP[label.icon];
                  return (
                    <div key={label.value} onClick={() => toggleFilter(label.value, selectedLabels, setSelectedLabels)} style={s.chip(selectedLabels.includes(label.value))}>
                      {Icon && <Icon iconProps={{ sx: { fontSize: 12 } }} />} {label.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TOPICS */}
            <div style={s.filterGroup}>
              <div style={s.filterLabel}><ExploreIcon iconProps={{ sx: { fontSize: 14 } }} /> Topics</div>
              <div style={s.chipRow}>
                {TOPIC_OPTIONS.map(topic => (
                  <div key={topic.value} onClick={() => toggleFilter(topic.value, selectedTopics, setSelectedTopics)} style={s.chip(selectedTopics.includes(topic.value), "#bc8cff")}>
                    {topic.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={s.grid}>
            {isLoading ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="bento-item" style={{ opacity: 0.5, height: 200, background: "#161b22" }} />) : 
             error ? <div style={{ color: "#f85149", textAlign: "center", gridColumn: "1/-1" }}>{ERROR_TEXT}</div> :
             data?.items?.length === 0 ? <div style={{ textAlign: "center", gridColumn: "1/-1", padding: 60 }}><ExploreIcon iconProps={{ sx: { fontSize: 48, color: "#30363d", mb: 2 } }} /><p style={{ fontSize: "1rem", color: "#8b949e" }}>{NO_PROJECTS_TEXT}</p></div> :
             data?.items?.map(repo => <RepoCard key={repo.id} repo={repo} onAskAI={handleAskAI} onStartGuide={handleStartGuide} aiLoading={aiLoading} />)}
          </div>

          {data?.items?.length > 0 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 40 }}>
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={{ padding: "10px 18px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", background: "rgba(33,38,45,0.4)", color: "#e6edf3", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem" }}>Previous</button>
              <div style={{ padding: "10px 18px", background: "rgba(88,166,255,0.1)", color: "#58a6ff", borderRadius: 12, fontWeight: 800, minWidth: 48, textAlign: "center", fontSize: "0.85rem" }}>{page}</div>
              <button onClick={() => setPage(p => p + 1)} style={{ padding: "10px 18px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", background: "rgba(33,38,45,0.4)", color: "#e6edf3", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem" }}>Next</button>
            </div>
          )}
        </div>
      </div>

      {/* AI Drawer for repo-level actions */}
      <AIDrawer open={aiDrawerOpen} onClose={() => setAiDrawerOpen(false)} title={aiDrawerTitle} response={aiResponse} loading={!!aiLoading} error={aiError} />
    </>
  );
}
