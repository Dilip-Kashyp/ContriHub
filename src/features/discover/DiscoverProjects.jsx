import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { searchRepositoriesHandler } from "@/helper";
import { DISCOVER_PAGE_CONFIG, LANGUAGE_COLORS, ROUTES } from "@/constants";
import { 
  SearchIcon, StarIcon, UpdateIcon, HelpIcon, CallSplitIcon,
  LanguageIcon, OpenInNewIcon, ErrorIcon, ExploreIcon,
  AccessTimeIcon, AutoAwesomeIcon, FilterListIcon
} from "@/components";
import Sidebar from "@/features/layout/Sidebar";

const { ERROR_TEXT, NO_PROJECTS_TEXT, NO_DESC_TEXT, ISSUES_LABEL, UPDATED_LABEL } = DISCOVER_PAGE_CONFIG;

// ── Data ──────────────────────────────────────────────────────────────────────
const LANGUAGES = [
  { value: "javascript", label: "JavaScript", color: "#f1e05a" },
  { value: "typescript", label: "TypeScript", color: "#3178c6" },
  { value: "python", label: "Python", color: "#3572A5" },
  { value: "go", label: "Go", color: "#00ADD8" },
  { value: "rust", label: "Rust", color: "#dea584" },
  { value: "java", label: "Java", color: "#b07219" },
  { value: "cpp", label: "C++", color: "#f34b7d" },
  { value: "ruby", label: "Ruby", color: "#701516" },
  { value: "php", label: "PHP", color: "#4F5D95" },
  { value: "swift", label: "Swift", color: "#F05138" },
];

const LABELS = [
  { value: "good-first-issue", label: "Beginner Friendly", icon: <AutoAwesomeIcon iconProps={{ sx: { fontSize: 14 } }} /> },
  { value: "help-wanted", label: "Help Wanted", icon: <HelpIcon iconProps={{ sx: { fontSize: 14 } }} /> },
  { value: "bug", label: "Bug Fixes", icon: <ErrorIcon iconProps={{ sx: { fontSize: 14 } }} /> },
  { value: "documentation", label: "Docs", icon: <ExploreIcon iconProps={{ sx: { fontSize: 14 } }} /> },
];

const TOPICS = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "nodejs", label: "Node.js" },
  { value: "machine-learning", label: "ML/AI" },
  { value: "web3", label: "Web3" },
];

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
  page: { minHeight: "100vh", background: "#0d1117", padding: "80px 24px 40px" },
  headerBand: { marginBottom: 32 },
  searchRow: { display: "flex", gap: 12, alignItems: "center", marginBottom: 32 },
  searchWrap: { flex: 1, position: "relative" },
  searchIcon: { position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#6e7681", fontSize: 20 },
  searchInput: {
    width: "100%", background: "rgba(33,38,45,0.4)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16,
    padding: "16px 16px 16px 52px", color: "#e6edf3", fontSize: "1rem", outline: "none", boxSizing: "border-box",
    transition: "all 0.3s ease", "&:focus": { borderColor: "#58a6ff33", background: "rgba(33,38,45,0.6)" }
  },
  searchBtn: {
    background: "linear-gradient(135deg, #58a6ff, #388bfd)", border: "none", borderRadius: 16,
    padding: "16px 32px", color: "#fff", fontSize: "1rem", fontWeight: 700, cursor: "pointer",
    boxShadow: "0 4px 14px rgba(56, 139, 253, 0.3)"
  },
  filterGroup: { marginBottom: 24 },
  filterLabel: { fontSize: "0.75rem", fontWeight: 800, color: "#6e7681", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 8 },
  chip: (active, color) => ({
    display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 99,
    fontSize: "0.8rem", fontWeight: active ? 700 : 500, cursor: "pointer",
    border: "1px solid",
    borderColor: active ? (color || "#58a6ff") : "rgba(255,255,255,0.05)",
    background: active ? `${(color || "#58a6ff")}15` : "rgba(33,38,45,0.3)",
    color: active ? (color || "#58a6ff") : "#8b949e",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: active ? "translateY(-1px)" : "none",
    boxShadow: active ? `0 4px 12px ${color || "#58a6ff"}15` : "none"
  }),
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 20 },
  card: {
    background: "rgba(22,27,34,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: 24, padding: "28px", transition: "all 0.3s ease", display: "flex", flexDirection: "column", gap: 16
  }
};

function RepoCard({ repo }) {
  const [hovered, setHovered] = useState(false);
  const langColor = LANGUAGE_COLORS?.[repo.language] || "#8b949e";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...s.card,
        borderColor: hovered ? "rgba(88, 166, 255, 0.2)" : "rgba(255, 255, 255, 0.05)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.4)" : "none"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ fontSize: "1.1rem", fontWeight: 800, color: "#58a6ff", textDecoration: "none" }}>{repo.full_name}</a>
        <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 99, background: "rgba(210,153,34,0.1)", border: "1px solid rgba(210,153,34,0.2)", fontSize: "0.8rem", color: "#d29922", fontWeight: 700 }}>
          <StarIcon iconProps={{ sx: { fontSize: 14 } }} /> {repo.stargazers_count?.toLocaleString()}
        </div>
      </div>
      <p style={{ fontSize: "0.9rem", color: "#8b949e", lineHeight: 1.6, height: "48px", overflow: "hidden", margin: 0 }}>{repo.description || NO_DESC_TEXT}</p>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {repo.topics?.slice(0, 4).map(t => (
          <span key={t} style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: 6, background: "rgba(88,166,255,0.05)", color: "#58a6ff", border: "1px solid rgba(88,166,255,0.1)" }}>{t}</span>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16 }}>
        {repo.language && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "#6e7681" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: langColor }} />
            <span>{repo.language}</span>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "#6e7681" }}>
          <CallSplitIcon iconProps={{ sx: { fontSize: 14 } }} /> <span>{repo.forks_count}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "#6e7681", marginLeft: "auto" }}>
          <AccessTimeIcon iconProps={{ sx: { fontSize: 14 } }} /> <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default function DiscoverProjects() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("good-first-issues:>0");
  const [selectedLangs, setSelectedLangs] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [sort, setSort] = useState("stars");
  const [page, setPage] = useState(1);
  const [mounted, setMounted] = useState(false);

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
    return q;
  };

  const finalQuery = buildFinalQuery();
  const { data, error, isLoading } = useSWR(mounted ? `/discover?q=${encodeURIComponent(finalQuery)}&sort=${sort}&page=${page}` : null, () => searchRepositoriesHandler({ query: finalQuery, sort, order: "desc", page }));

  if (!mounted) return null;

  return (
    <div style={s.page}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "84px 1fr", gap: "50px" }}>
        <Sidebar />
        <div style={{ minWidth: 0 }}>
          <div style={s.headerBand}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#e6edf3", marginBottom: 12, letterSpacing: "-1.5px" }}>Discover <span style={{ background: "linear-gradient(135deg, #58a6ff, #bc8cff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Projects</span></h1>
            <p style={{ color: "#8b949e", marginBottom: 40, fontSize: "1.1rem" }}>Find the perfect open-source project to start your contribution journey.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); if (searchInput.trim()) { setQuery(searchInput.trim()); setPage(1); } }} style={s.searchRow}>
              <div style={s.searchWrap}><SearchIcon iconProps={{ sx: s.searchIcon }} /><input value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder="Search for projects, keywords, or topics..." style={s.searchInput} /></div>
              <button type="submit" style={s.searchBtn}>Find Projects</button>
            </form>

            {/* LANGUAGES (Multi-select) */}
            <div style={s.filterGroup}>
              <div style={s.filterLabel}><LanguageIcon iconProps={{ sx: { fontSize: 16 } }} /> Programming Languages</div>
              <div style={s.chipRow}>
                {LANGUAGES.map(lang => (
                  <div key={lang.value} onClick={() => toggleFilter(lang.value, selectedLangs, setSelectedLangs)} style={s.chip(selectedLangs.includes(lang.value), lang.color)}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: lang.color }} />
                    {lang.label}
                  </div>
                ))}
              </div>
            </div>

            {/* LABELS (Multi-select) */}
            <div style={s.filterGroup}>
              <div style={s.filterLabel}><FilterListIcon iconProps={{ sx: { fontSize: 16 } }} /> Project Tags & Labels</div>
              <div style={s.chipRow}>
                {LABELS.map(label => (
                  <div key={label.value} onClick={() => toggleFilter(label.value, selectedLabels, setSelectedLabels)} style={s.chip(selectedLabels.includes(label.value))}>
                    {label.icon} {label.label}
                  </div>
                ))}
              </div>
            </div>

            {/* TOPICS */}
            <div style={s.filterGroup}>
              <div style={s.filterLabel}><ExploreIcon iconProps={{ sx: { fontSize: 16 } }} /> Popular Topics</div>
              <div style={s.chipRow}>
                {TOPICS.map(topic => (
                  <div key={topic.value} onClick={() => toggleFilter(topic.value, selectedTopics, setSelectedTopics)} style={s.chip(selectedTopics.includes(topic.value), "#bc8cff")}>
                    {topic.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={s.grid}>
            {isLoading ? Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ ...s.card, opacity: 0.5, height: 250, background: "#161b22" }} />) : 
             error ? <div style={{ color: "#f85149", textAlign: "center", gridColumn: "1/-1" }}>{ERROR_TEXT}</div> :
             data?.items?.length === 0 ? <div style={{ textAlign: "center", gridColumn: "1/-1", padding: 100 }}><ExploreIcon iconProps={{ sx: { fontSize: 64, color: "#30363d", mb: 2 } }} /><p style={{ fontSize: "1.2rem", color: "#8b949e" }}>{NO_PROJECTS_TEXT}</p></div> :
             data?.items?.map(repo => <RepoCard key={repo.id} repo={repo} />)}
          </div>

          {data?.items?.length > 0 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 60 }}>
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={{ padding: "12px 24px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)", background: "rgba(33,38,45,0.4)", color: "#e6edf3", cursor: "pointer", fontWeight: 700 }}>Previous</button>
              <div style={{ padding: "12px 24px", background: "rgba(88,166,255,0.1)", color: "#58a6ff", borderRadius: 16, fontWeight: 800, minWidth: 60, textAlign: "center" }}>{page}</div>
              <button onClick={() => setPage(p => p + 1)} style={{ padding: "12px 24px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)", background: "rgba(33,38,45,0.4)", color: "#e6edf3", cursor: "pointer", fontWeight: 700 }}>Next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
