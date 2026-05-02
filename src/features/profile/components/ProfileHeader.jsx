import { useState } from "react";
import { AI_STRINGS } from "@/constants";

const fmt = (n) => n?.toLocaleString() ?? "0";

const Skeleton = ({ w, h, r = 16 }) => (
  <div style={{
    width: w, height: h, borderRadius: r,
    background: "linear-gradient(90deg, #161b22 25%, #21262d 50%, #161b22 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 2s infinite linear"
  }} />
);

const EXPERIENCE_LEVELS = [
  { id: "beginner",      label: "Beginner",      desc: "< 1 yr coding",   color: "#3fb950" },
  { id: "intermediate",  label: "Intermediate",  desc: "1–3 yrs",         color: "#58a6ff" },
  { id: "advanced",      label: "Advanced",      desc: "3+ yrs",          color: "#bc8cff" },
];

const TIME_SLOTS = [
  { id: "quick",   label: "Quick",    desc: "< 2 hrs/week"  },
  { id: "regular", label: "Regular",  desc: "2–5 hrs/week"  },
  { id: "deep",    label: "Deep",     desc: "5+ hrs/week"   },
];

function PersonalizePanel({ onClose }) {
  const stored = (() => {
    try { return JSON.parse(localStorage.getItem("gibo_prefs") || "{}"); } catch { return {}; }
  })();

  const [experience, setExperience] = useState(stored.experience || "");
  const [time, setTime]             = useState(stored.time || "");
  const [saved, setSaved]           = useState(false);

  const save = () => {
    localStorage.setItem("gibo_prefs", JSON.stringify({ experience, time }));
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 800);
  };

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} />

      {/* Panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 1101,
        width: "min(360px, 100vw)",
        background: "rgba(13,17,23,0.97)",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        display: "flex", flexDirection: "column",
        boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
        animation: "slideInRight 0.25s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <style>{`@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

        {/* Header */}
        <div style={{ padding: "24px 24px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 18 }}>⚡</span>
                <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 900, color: "#e6edf3" }}>{AI_STRINGS.PERSONALIZE_BTN}</h2>
              </div>
              <p style={{ margin: 0, fontSize: "0.72rem", color: "#6e7681" }}>Help {AI_STRINGS.NAME} find issues that match you</p>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", color: "#6e7681", cursor: "pointer", fontSize: 20, lineHeight: 1, padding: 4 }}>×</button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 28 }}>

          {/* Experience */}
          <div>
            <div style={{ fontSize: "0.65rem", fontWeight: 800, color: "#6e7681", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>
              Your experience level
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {EXPERIENCE_LEVELS.map(lvl => (
                <button key={lvl.id} onClick={() => setExperience(lvl.id)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 14px", borderRadius: 12, cursor: "pointer",
                    background: experience === lvl.id ? `${lvl.color}10` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${experience === lvl.id ? lvl.color + "40" : "rgba(255,255,255,0.06)"}`,
                    color: experience === lvl.id ? lvl.color : "#8b949e",
                    transition: "all 0.2s ease", textAlign: "left",
                  }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>{lvl.label}</span>
                  <span style={{ fontSize: "0.68rem", opacity: 0.7 }}>{lvl.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time availability */}
          <div>
            <div style={{ fontSize: "0.65rem", fontWeight: 800, color: "#6e7681", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>
              Time available to contribute
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {TIME_SLOTS.map(slot => (
                <button key={slot.id} onClick={() => setTime(slot.id)}
                  style={{
                    flex: 1, padding: "10px 8px", borderRadius: 10, cursor: "pointer",
                    background: time === slot.id ? "rgba(88,166,255,0.1)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${time === slot.id ? "rgba(88,166,255,0.35)" : "rgba(255,255,255,0.06)"}`,
                    color: time === slot.id ? "#58a6ff" : "#8b949e",
                    transition: "all 0.2s ease", textAlign: "center",
                  }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700 }}>{slot.label}</div>
                  <div style={{ fontSize: "0.6rem", marginTop: 2, opacity: 0.7 }}>{slot.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Info note */}
          <div style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(88,166,255,0.04)", border: "1px solid rgba(88,166,255,0.1)", fontSize: "0.7rem", color: "#6e7681", lineHeight: 1.5 }}>
            💡 {AI_STRINGS.NAME} uses your GitHub repo data automatically. These preferences help fine-tune issue matching beyond what your code shows.
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={save} disabled={!experience || !time}
            style={{
              width: "100%", padding: "12px", borderRadius: 12,
              background: experience && time ? "linear-gradient(135deg,#58a6ff,#388bfd)" : "rgba(255,255,255,0.04)",
              border: "none",
              color: experience && time ? "#fff" : "#6e7681",
              fontSize: "0.82rem", fontWeight: 800, cursor: experience && time ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
            }}>
            {saved ? "✓ Saved!" : `Save & Apply to ${AI_STRINGS.NAME}`}
          </button>
        </div>
      </div>
    </>
  );
}

export default function ProfileHeader({ user, repos }) {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <>
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

            {/* Personalize Gibo CTA */}
            <button
              onClick={() => setShowPanel(true)}
              title={`Tell ${AI_STRINGS.NAME} your experience level and time to get better issue matches`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "10px 16px", borderRadius: 14,
                background: "rgba(88,166,255,0.06)",
                border: "1px dashed rgba(88,166,255,0.25)",
                color: "#58a6ff", fontSize: "0.75rem", fontWeight: 700,
                cursor: "pointer", transition: "all 0.2s ease",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(88,166,255,0.12)"; e.currentTarget.style.borderStyle = "solid"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(88,166,255,0.06)"; e.currentTarget.style.borderStyle = "dashed"; }}
            >
              <span style={{ fontSize: 16 }}>⚡</span>
              {AI_STRINGS.PERSONALIZE_BTN}
              <span style={{ fontSize: "0.6rem", padding: "2px 6px", borderRadius: 4, background: "rgba(88,166,255,0.15)", color: "#58a6ff", fontWeight: 800, letterSpacing: "0.5px" }}>OPTIONAL</span>
            </button>
          </>
        ) : <Skeleton w="100%" h="160px" r="24px" />}
      </div>

      {/* Slide-in personalization panel */}
      {showPanel && <PersonalizePanel onClose={() => setShowPanel(false)} />}
    </>
  );
}
