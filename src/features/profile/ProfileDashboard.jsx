import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getUserProfileHandler, getUserReposHandler } from "@/helper";
import { LOCAL_STORAGE_KEY } from "@/constants/common";
import ProfileHeader from "./components/ProfileHeader";
import StatCards from "./components/StatCards";
import LanguageSection from "./components/LanguageSection";
import TopReposSection from "./components/TopReposSection";
import GithubStatsSection from "./components/GithubStatsSection";

export default function ProfileDashboard() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 1. Try to extract token from hash (e.g., #token=...)
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (hash && hash.includes("token=")) {
      const extractedToken = hash.split("token=")[1]?.split("&")[0];
      if (extractedToken) {
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, extractedToken);
        // Set cookie for middleware access
        document.cookie = `${LOCAL_STORAGE_KEY.ACCESS_TOKEN}=${extractedToken}; path=/; max-age=31536000; SameSite=Lax`;
        setToken(extractedToken);
        // Clean up URL hash
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        return;
      }
    }

    // 2. Fallback to localStorage
    const t = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    if (t) {
      setToken(t);
      // Ensure cookie is set for middleware on every mount if token exists
      document.cookie = `${LOCAL_STORAGE_KEY.ACCESS_TOKEN}=${t}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, []);

  useEffect(() => {
    if (mounted && !token) {
      const timeout = setTimeout(() => {
        router.push("/login");
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [mounted, token, router]);

  const { data: user } = useSWR(token ? "/github/user" : null, getUserProfileHandler);
  const { data: repos } = useSWR(token ? "/github/user/repos" : null, getUserReposHandler);

  if (!mounted) return null;

  if (!token) {
    return (
      <div style={{ 
        position: "fixed", 
        inset: 0, 
        zIndex: 9999, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        backdropFilter: "blur(20px)",
        background: "rgba(13, 17, 23, 0.7)"
      }}>
        <div style={{ 
          textAlign: "center", 
          padding: "40px", 
          borderRadius: "24px", 
          background: "rgba(22, 27, 34, 0.8)",
          border: "1px solid rgba(88, 166, 255, 0.2)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          animation: "fadeIn 0.5s ease-out"
        }}>
          <h2 style={{ margin: "0 0 16px", background: "linear-gradient(135deg, #58a6ff, #bc8cff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Access Restricted</h2>
          <p style={{ color: "#8b949e", fontSize: "1.1rem", margin: 0 }}>To access this page, please login.</p>
          <div style={{ marginTop: "24px", display: "flex", justifyContent: "center" }}>
            <div className="animate-spin" style={{ width: "24px", height: "24px", border: "3px solid rgba(88,166,255,0.1)", borderTopColor: "#58a6ff", borderRadius: "50%" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .profile-grid { 
          display: grid; 
          grid-template-columns: repeat(12, 1fr); 
          gap: 16px; 
          width: 100%; 
        }
        @media (max-width: 1024px) {
          .profile-grid { grid-template-columns: repeat(6, 1fr); }
          .profile-header { grid-column: span 6 !important; }
          .stat-cell { grid-column: span 3 !important; }
        }
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .profile-header { grid-column: 1 / -1 !important; }
          .stat-cell { grid-column: 1 / -1 !important; }
          .lang-cell { grid-column: 1 / -1 !important; }
          .repos-cell { grid-column: 1 / -1 !important; }
          .stats-images { grid-column: 1 / -1 !important; }
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px 24px 40px" }}>
        <div className="profile-grid">
          <ProfileHeader user={user} repos={repos} />
          <StatCards user={user} />
          <LanguageSection repos={repos} />
          <TopReposSection repos={repos} />
          {/* <GithubStatsSection user={user} /> */}
        </div>
      </div>
    </>
  );
}
