import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ROUTES, APP_CONFIG } from "@/constants";
import { logoutHandler, getUserProfileHandler } from "@/helper";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("github_token");
    if (t) setToken(t);
    
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [router.pathname]);

  const { data: user } = useSWR(token ? "/github/user" : null, getUserProfileHandler);

  const handleLogout = () => { logoutHandler(); setToken(null); };

  return (
    <div style={{
      position: "sticky",
      top: 12,
      zIndex: 1100,
      display: "flex",
      justifyContent: "center",
      width: "100%",
      pointerEvents: "none"
    }}>
      <nav
        style={{
          pointerEvents: "auto",
          width: "calc(100% - 48px)",
          maxWidth: 1200,
          height: 52,
          background: "rgba(13, 17, 23, 0.7)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 99,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          boxShadow: scrolled ? "0 12px 40px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.2)",
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* LEFT — Brand Logo */}
        <div
          onClick={() => router.push(ROUTES.HOME)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
          }}
        >
          <div style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "linear-gradient(135deg, #58a6ff, #bc8cff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: "1rem", color: "#e6edf3", letterSpacing: "-0.5px" }}>
            {APP_CONFIG.TITLE}
          </span>
        </div>

        {/* RIGHT — Profile/Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {!token ? (
            <button
              onClick={() => router.push(ROUTES.LOGIN)}
              style={{
                background: "linear-gradient(135deg, #58a6ff, #388bfd)",
                border: "none",
                borderRadius: 99,
                padding: "6px 20px",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 200ms ease",
              }}
            >
              Sign in
            </button>
          ) : (
            <div 
              onClick={() => router.push(ROUTES.DASHBOARD)}
              style={{ 
                width: 34, 
                height: 34, 
                borderRadius: "50%", 
                background: "#30363d", 
                border: "2px solid rgba(88, 166, 255, 0.4)",
                cursor: "pointer",
                overflow: "hidden",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              {user?.avatar_url ? (
                <img src={user.avatar_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "linear-gradient(45deg, #1e293b, #334155)" }} />
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
