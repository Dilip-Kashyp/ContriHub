import { LANGUAGE_COLORS } from "@/constants";
import { getDeviconUrl } from "@/helper";

const Skeleton = ({ w, h, r = 16 }) => (
  <div style={{
    width: w, height: h, borderRadius: r,
    background: "linear-gradient(90deg, #161b22 25%, #21262d 50%, #161b22 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 2s infinite linear"
  }} />
);

export default function LanguageSection({ repos }) {
  const langMap = {};
  repos?.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
  const sortedLangs = Object.entries(langMap).sort((a, b) => b[1] - a[1]);
  const totalLangs = Object.values(langMap).reduce((a, b) => a + b, 0);

  return (
    <div className="bento-item lang-cell" style={{ gridColumn: "span 4", gridRow: "span 2" }}>
      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "20px" }}>Languages</h3>
      {repos ? (
        <>
          <div style={{ display: "flex", height: "8px", borderRadius: "4px", overflow: "hidden", marginBottom: "20px" }}>
            {sortedLangs.map(([lang, count]) => (
              <div key={lang} style={{ width: `${(count / totalLangs) * 100}%`, background: LANGUAGE_COLORS[lang] || "#8b949e" }} />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {sortedLangs.slice(0, 6).map(([lang, count]) => (
              <div key={lang} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.9rem" }}>
                {getDeviconUrl(lang) ? (
                  <img src={getDeviconUrl(lang)} style={{ width: 16, height: 16 }} alt={lang} />
                ) : (
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: LANGUAGE_COLORS[lang] || "#8b949e" }} />
                )}
                <span style={{ flex: 1, fontWeight: 600 }}>{lang}</span>
                <span style={{ color: "#6e7681", fontSize: "0.8rem", fontWeight: 600 }}>{((count / totalLangs) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </>
      ) : <Skeleton w="100%" h="150px" />}
    </div>
  );
}
