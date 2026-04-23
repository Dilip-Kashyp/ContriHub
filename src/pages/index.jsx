import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ROUTES } from "@/constants";
import Layout from "@/features/layout/Layout.jsx";
import { 
  AutoAwesomeIcon, SearchIcon, TimelineIcon, 
  GitHubIcon, RocketIcon 
} from "@/components";

// --- Design System ---
const COLORS = {
  bg: "#0d1117",
  text: "#e6edf3",
  muted: "#8b949e",
  accent: "#58a6ff",
  purple: "#bc8cff",
  green: "#3fb950"
};

const S = {
  hero: { 
    minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", 
    alignItems: "center", justifyContent: "center", textAlign: "center", 
    padding: "0 24px", overflow: "hidden", background: COLORS.bg
  },
  glow: {
    position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
    width: "1000px", height: "600px", background: `radial-gradient(circle, rgba(88,166,255,0.15) 0%, rgba(188,140,255,0.08) 40%, transparent 70%)`,
    filter: "blur(80px)", pointerEvents: "none", zIndex: 0
  },
  grid: {
    position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none",
    backgroundImage: `linear-gradient(rgba(48,54,61,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(48,54,61,0.2) 1px, transparent 1px)`,
    backgroundSize: "80px 80px", maskImage: "radial-gradient(circle, black, transparent 80%)"
  },
  title: {
    fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, lineHeight: 0.9, 
    letterSpacing: "-4px", margin: "0 0 24px", zIndex: 1, position: "relative"
  },
  subtitle: {
    fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: COLORS.muted, maxWidth: "600px", 
    lineHeight: 1.6, margin: "0 0 48px", zIndex: 1, position: "relative"
  },
  cta: {
    display: "flex", gap: "16px", zIndex: 1, position: "relative"
  },
  primaryBtn: {
    padding: "18px 40px", borderRadius: "14px", background: "linear-gradient(135deg, #58a6ff, #bc8cff)",
    color: "#fff", fontWeight: 700, fontSize: "1.1rem", border: "none", cursor: "pointer",
    transition: "all 0.3s ease", boxShadow: "0 20px 40px rgba(88,166,255,0.25)"
  },
  secondaryBtn: {
    padding: "18px 40px", borderRadius: "14px", background: "rgba(255,255,255,0.05)",
    color: "#fff", fontWeight: 600, fontSize: "1.1rem", border: "1px solid #30363d", cursor: "pointer",
    transition: "all 0.3s ease", backdropFilter: "blur(10px)"
  },
  bentoSection: {
    padding: "100px 24px", maxWidth: "1200px", margin: "0 auto"
  },
  bentoGrid: {
    display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gridAutoRows: "minmax(200px, auto)", gap: "24px"
  },
  bentoCard: (span, color) => ({
    gridColumn: `span ${span}`, background: "rgba(22, 27, 34, 0.4)", border: "1px solid #30363d",
    borderRadius: "32px", padding: "40px", display: "flex", flexDirection: "column", 
    justifyContent: "center", textAlign: "center", position: "relative", overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
  })
};

export default function LandingPage() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <div style={{ background: COLORS.bg, color: COLORS.text, overflowX: "hidden" }}>
        
        {/* --- Hero Section --- */}
        <section style={S.hero}>
          <div style={S.glow} />
          <div style={S.grid} />
          
          <div style={{ position: "relative", zIndex: 1, top: scrollY * 0.2 }}>
            <div style={{ 
              display: "inline-flex", alignItems: "center", gap: "8px", 
              padding: "8px 20px", borderRadius: "99px", background: "rgba(88,166,255,0.1)", 
              border: "1px solid #58a6ff33", color: COLORS.accent, 
              fontSize: "0.85rem", fontWeight: 700, marginBottom: "32px", letterSpacing: "1px"
            }}>
              <AutoAwesomeIcon iconProps={{ sx: { fontSize: 14 } }} /> NEXT-GEN OPEN SOURCE HUB
            </div>
            
            <h1 style={S.title}>
              BUILD. <br />
              <span style={{ 
                background: "linear-gradient(90deg, #58a6ff, #bc8cff, #3fb950)", 
                backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>CONTRIBUTE.</span> <br />
              GROW.
            </h1>
            
            <p style={S.subtitle}>
              The premium platform for developers to discover beginner-friendly projects, 
              track their impact, and master the art of open source.
            </p>
            
            <div style={S.cta}>
              <button 
                onClick={() => router.push(ROUTES.LOGIN)}
                style={S.primaryBtn}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 30px 60px rgba(88,166,255,0.4)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(88,166,255,0.25)"; }}
              >
                Get Started Now
              </button>
              <button 
                onClick={() => router.push(ROUTES.DISCOVER)}
                style={S.secondaryBtn}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              >
                Browse Projects
              </button>
            </div>
          </div>
        </section>

        {/* --- Bento Features Section --- */}
        <section style={S.bentoSection}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-1.5px" }}>Engineered for <span style={{ color: COLORS.accent }}>Builders</span></h2>
            <p style={{ color: COLORS.muted, fontSize: "1.2rem" }}>Powerful tools to accelerate your contribution journey.</p>
          </div>

          <div style={S.bentoGrid}>
            <div className="landing-bento" style={{ ...S.bentoCard(8), background: "linear-gradient(135deg, rgba(88, 166, 255, 0.1) 0%, transparent 100%)" }}>
              <div style={{ marginBottom: "20px" }}><SearchIcon iconProps={{ sx: { fontSize: 48, color: COLORS.accent } }} /></div>
              <h3 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 16px" }}>Smart Discovery</h3>
              <p style={{ color: COLORS.muted, fontSize: "1.1rem", maxWidth: "400px", margin: "0 auto" }}>
                AI-powered filtering that surfaces the most relevant beginner-friendly issues across 30+ languages.
              </p>
            </div>
            <div className="landing-bento" style={{ ...S.bentoCard(4), background: "linear-gradient(135deg, rgba(188, 140, 255, 0.1) 0%, transparent 100%)" }}>
              <div style={{ marginBottom: "20px" }}><TimelineIcon iconProps={{ sx: { fontSize: 48, color: COLORS.purple } }} /></div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0 0 16px" }}>Real-time Stats</h3>
              <p style={{ color: COLORS.muted }}>Track your impact with pixel-perfect dashboards and automated activity syncing.</p>
            </div>
            <div className="landing-bento" style={{ ...S.bentoCard(4), background: "linear-gradient(135deg, rgba(63, 185, 80, 0.1) 0%, transparent 100%)" }}>
              <div style={{ marginBottom: "20px" }}><GitHubIcon iconProps={{ sx: { fontSize: 48, color: COLORS.green } }} /></div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0 0 16px" }}>Native OAuth</h3>
              <p style={{ color: COLORS.muted }}>One-click secure connection with GitHub. Zero configuration, instant access.</p>
            </div>
            <div className="landing-bento" style={{ ...S.bentoCard(8), background: "linear-gradient(135deg, rgba(210, 153, 34, 0.1) 0%, transparent 100%)" }}>
              <div style={{ marginBottom: "20px" }}><RocketIcon iconProps={{ sx: { fontSize: 48, color: "#d29922" } }} /></div>
              <h3 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 16px" }}>Contribution Pipeline</h3>
              <p style={{ color: COLORS.muted, fontSize: "1.1rem", maxWidth: "400px", margin: "0 auto" }}>
                From choosing a repo to landing your first PR. We provide the roadmap to becoming an open source maintainer.
              </p>
            </div>
          </div>
        </section>

        {/* --- Social Proof / Stats --- */}
        <section style={{ padding: "80px 0", borderTop: "1px solid #30363d", borderBottom: "1px solid #30363d" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "40px" }}>
            {[
              { val: "50,000+", label: "Repositories" },
              { val: "100,000+", label: "Contributors" },
              { val: "30+", label: "Languages" },
              { val: "1M+", label: "Pull Requests" }
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", fontWeight: 900, color: "#fff", letterSpacing: "-2px" }}>{stat.val}</div>
                <div style={{ color: COLORS.accent, fontWeight: 700, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "2px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section style={{ padding: "120px 24px", textAlign: "center", position: "relative" }}>
          <div style={{ ...S.glow, top: "50%", opacity: 0.2 }} />
          <div style={{ marginBottom: "20px" }}><RocketIcon iconProps={{ sx: { fontSize: 64, color: COLORS.accent } }} /></div>
          <h2 style={{ fontSize: "4rem", fontWeight: 900, letterSpacing: "-3px", marginBottom: "32px" }}>Ready to make your mark?</h2>
          <button 
            onClick={() => router.push(ROUTES.LOGIN)}
            style={{ ...S.primaryBtn, padding: "24px 60px", fontSize: "1.4rem" }}
          >
            Start Contributing Free
          </button>
          <p style={{ marginTop: "24px", color: COLORS.muted }}>Join the global community of builders today.</p>
        </section>

        <style>{`
          .landing-bento:hover { border-color: #58a6ff77; transform: scale(1.02); }
        `}</style>
      </div>
    </Layout>
  );
}
