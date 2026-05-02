import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ROUTES } from "@/constants";
import { LOCAL_STORAGE_KEY } from "@/constants/common";
import { getUserProfileHandler, logoutHandler } from "@/helper";
import { 
  DashboardIcon, ExploreIcon, HomeIcon, LogoutIcon, GitHubIcon, SmartToyIcon, TrendingUpIcon,
  DescriptionIcon
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
    { id: "explore", label: "Explore", path: ROUTES.DISCOVER, icon: <ExploreIcon iconProps={{ sx: { fontSize: 20 } }} /> },
    { id: "trending", label: "Trending", path: ROUTES.TRENDING, icon: <TrendingUpIcon iconProps={{ sx: { fontSize: 20 } }} /> },
    { id: "chat", label: "Gibo", path: ROUTES.CHAT, icon: <SmartToyIcon iconProps={{ sx: { fontSize: 20 } }} /> },
    { id: "overview", label: "Dash", path: ROUTES.DASHBOARD, icon: <DashboardIcon iconProps={{ sx: { fontSize: 20 } }} /> },
    // { id: "blogs", label: "Journal", path: ROUTES.BLOGS, icon: <DescriptionIcon iconProps={{ sx: { fontSize: 20 } }} /> },
  ];

  return (
    <>
      <style>{`
        .sidebar-capsule {
          display: flex;
          flex-direction: column;
          gap: 6px;
          position: fixed;
          /* Align with the 1300px centered container */
          left: max(20px, calc((100vw - 1300px) / 2 + 20px));
          top: 30px;
          height: fit-content;
          width: 72px;
          padding: 12px 6px;
          background: rgba(22, 27, 34, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          flex-shrink: 0;
          z-index: 1000;
        }
        .nav-btn { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 4px; border-radius: 20px; border: 1px solid transparent; background: transparent; color: #8b949e; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); width: 100%; }
        .nav-btn.active { background: rgba(88, 166, 255, 0.15); border-color: rgba(88, 166, 255, 0.2); color: #58a6ff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .nav-btn:hover:not(.active) { background: rgba(255, 255, 255, 0.05); color: #fff; transform: translateY(-2px); }
        
        @media (max-width: 900px) {
          .sidebar-capsule {
            position: fixed;
            top: auto;
            bottom: 12px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 400px;
            height: auto;
            flex-direction: row;
            justify-content: space-around;
            padding: 8px 12px;
            border-radius: 24px;
          }
          .nav-btn { padding: 6px; gap: 2px; }
          .hide-on-mobile { display: none !important; }
        }
      `}</style>
      
      <div className="sidebar-capsule">
        {/* LOGO */}
        <div 
          className="hide-on-mobile" 
          onClick={() => router.push(ROUTES.HOME)} 
          style={{ 
            width: "48px", 
            height: "48px", 
            borderRadius: "14px", 
            background: "rgba(255,255,255,0.03)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            cursor: "pointer", 
            margin: "0 auto 12px", 
            flexShrink: 0,
            transition: "transform 0.3s ease",
            border: "1px solid rgba(255,255,255,0.05)"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <img src="/favicon.png" alt="Logo" style={{ width: "80%", height: "80%", objectFit: "contain" }} />
        </div>

        {navItems.map(item => (
          <button key={item.id} className={`nav-btn ${activePath === item.path || (item.path !== "/" && activePath.startsWith(item.path)) ? "active" : ""}`} onClick={() => router.push(item.path)}>
            {item.icon}
            <span className="hide-on-mobile" style={{ fontSize: "0.55rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</span>
          </button>
        ))}
        
        <div className="hide-on-mobile" style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "8px 8px" }} />
        
        {/* USER INFO / AUTH */}
        {token ? (
          <>
            <div 
              onClick={() => router.push(ROUTES.PROFILE)}
              style={{ 
                width: 38, height: 38, borderRadius: "50%", background: "#30363d", 
                border: "2px solid rgba(88, 166, 255, 0.4)", cursor: "pointer", 
                overflow: "hidden", margin: "6px auto", transition: "transform 0.2s", flexShrink: 0
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              {user?.avatar_url ? <img src={user.avatar_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <GitHubIcon iconProps={{ sx: { fontSize: 16 } }} />}
            </div>
            <button className="nav-btn hide-on-mobile" onClick={() => { logoutHandler(); setToken(null); }}>
              <LogoutIcon iconProps={{ sx: { fontSize: 20 } }} />
              <span style={{ fontSize: "0.55rem", fontWeight: 800, textTransform: "uppercase" }}>Logout</span>
            </button>
          </>
        ) : (
          <button className="nav-btn" onClick={() => router.push(ROUTES.LOGIN)} style={{ color: "#58a6ff", borderColor: "rgba(88,166,255,0.2)", background: "rgba(88,166,255,0.1)", marginTop: "auto" }}>
            <GitHubIcon iconProps={{ sx: { fontSize: 20 } }} />
            <span className="hide-on-mobile" style={{ fontSize: "0.55rem", fontWeight: 800, textTransform: "uppercase" }}>Login</span>
          </button>
        )}
      </div>
    </>
  );
}
