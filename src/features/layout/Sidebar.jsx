import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ROUTES } from "@/constants";
import { LOCAL_STORAGE_KEY } from "@/constants/common";
import { getUserProfileHandler, logoutHandler } from "@/helper";
import { 
  DashboardIcon, ExploreIcon, HomeIcon, LogoutIcon, GitHubIcon 
} from "@/components";

export default function Sidebar() {
  const router = useRouter();
  const activePath = router.pathname;
  
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    if (t) setToken(t);
  }, [router.pathname]);

  const { data: user } = useSWR(token ? "/github/user" : null, getUserProfileHandler);

  const navItems = [
    { id: "overview", label: "Dash", path: ROUTES.DASHBOARD, icon: <DashboardIcon iconProps={{ sx: { fontSize: 24 } }} /> },
    { id: "explore", label: "Explore", path: ROUTES.DISCOVER, icon: <ExploreIcon iconProps={{ sx: { fontSize: 24 } }} /> },
  ];

  return (
    <>
      <style>{`
        .sidebar-capsule {
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: fixed;
          /* Align with the 1300px centered container */
          left: max(24px, calc((100vw - 1300px) / 2 + 24px));
          top: 100px;
          height: fit-content;
          width: 84px;
          padding: 12px 8px;
          background: rgba(22, 27, 34, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          flex-shrink: 0;
          z-index: 1000;
        }
        .nav-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 14px 4px; border-radius: 24px; border: 1px solid transparent; background: transparent; color: #8b949e; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); width: 100%; }
        .nav-btn.active { background: rgba(88, 166, 255, 0.15); border-color: rgba(88, 166, 255, 0.2); color: #58a6ff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .nav-btn:hover:not(.active) { background: rgba(255, 255, 255, 0.05); color: #fff; transform: translateY(-2px); }
        
        @media (max-width: 900px) {
          .sidebar-capsule {
            position: fixed;
            top: auto;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            height: auto;
            flex-direction: row;
            justify-content: space-around;
            padding: 8px 16px;
            border-radius: 32px;
          }
          .nav-btn { padding: 8px; }
          .hide-on-mobile { display: none !important; }
        }
      `}</style>
      
      <div className="sidebar-capsule">
        {/* LOGO */}
        <div className="hide-on-mobile" onClick={() => router.push(ROUTES.HOME)} style={{ width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(135deg, #58a6ff, #bc8cff)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", margin: "0 auto 16px", flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </div>

        {navItems.map(item => (
          <button key={item.id} className={`nav-btn ${activePath.startsWith(item.path) ? "active" : ""}`} onClick={() => router.push(item.path)}>
            {item.icon}
            <span className="hide-on-mobile" style={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</span>
          </button>
        ))}
        
        <button className={`nav-btn hide-on-mobile ${activePath === ROUTES.HOME ? "active" : ""}`} onClick={() => router.push(ROUTES.HOME)}>
          <HomeIcon iconProps={{ sx: { fontSize: 24 } }} />
          <span style={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase" }}>Home</span>
        </button>

        <div className="hide-on-mobile" style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "8px 4px" }} />
        
        {/* USER INFO / AUTH */}
        {token ? (
          <>
            <div 
              onClick={() => router.push(ROUTES.PROFILE)}
              style={{ 
                width: 44, height: 44, borderRadius: "50%", background: "#30363d", 
                border: "2px solid rgba(88, 166, 255, 0.4)", cursor: "pointer", 
                overflow: "hidden", margin: "8px auto", transition: "transform 0.2s"
              }}
            >
              {user?.avatar_url ? <img src={user.avatar_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <GitHubIcon iconProps={{ sx: { fontSize: 20 } }} />}
            </div>
            <button className="nav-btn hide-on-mobile" onClick={() => { logoutHandler(); setToken(null); }}>
              <LogoutIcon iconProps={{ sx: { fontSize: 24 } }} />
              <span style={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase" }}>Logout</span>
            </button>
          </>
        ) : (
          <button className="nav-btn" onClick={() => router.push(ROUTES.LOGIN)} style={{ color: "#58a6ff", borderColor: "rgba(88,166,255,0.2)", background: "rgba(88,166,255,0.1)" }}>
            <GitHubIcon iconProps={{ sx: { fontSize: 24 } }} />
            <span className="hide-on-mobile" style={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase" }}>Login</span>
          </button>
        )}
      </div>
    </>
  );
}
