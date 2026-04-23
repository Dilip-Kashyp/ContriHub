import { useRouter } from "next/router";
import { ROUTES } from "@/constants";
import { 
  DashboardIcon, ExploreIcon, HomeIcon, LogoutIcon 
} from "@/components";

export default function Sidebar() {
  const router = useRouter();
  const activePath = router.pathname;

  const navItems = [
    { id: "overview", label: "Dash", path: ROUTES.DASHBOARD, icon: <DashboardIcon iconProps={{ sx: { fontSize: 24 } }} /> },
    { id: "explore", label: "Explore", path: ROUTES.DISCOVER, icon: <ExploreIcon iconProps={{ sx: { fontSize: 24 } }} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("github_token");
    router.push(ROUTES.HOME);
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "8px", 
      position: "sticky", 
      top: "100px", 
      height: "fit-content",
      width: "84px",
      padding: "12px 8px",
      background: "rgba(22, 27, 34, 0.4)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "32px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
      flexShrink: 0
    }}>
      <style>{`
        .nav-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 14px 4px; border-radius: 24px; border: 1px solid transparent; background: transparent; color: #8b949e; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); width: 100%; }
        .nav-btn.active { background: rgba(88, 166, 255, 0.15); border-color: rgba(88, 166, 255, 0.2); color: #58a6ff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .nav-btn:hover:not(.active) { background: rgba(255, 255, 255, 0.05); color: #fff; transform: translateY(-2px); }
      `}</style>
      
      {navItems.map(item => (
        <button 
          key={item.id} 
          className={`nav-btn ${activePath === item.path ? "active" : ""}`} 
          onClick={() => router.push(item.path)}
        >
          {item.icon}
          <span style={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</span>
        </button>
      ))}
      
      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "8px 4px" }} />
      
      <button className="nav-btn" onClick={() => router.push(ROUTES.HOME)}>
        <HomeIcon iconProps={{ sx: { fontSize: 24 } }} />
        <span style={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase" }}>Home</span>
      </button>
      
      <button className="nav-btn" onClick={handleLogout}>
        <LogoutIcon iconProps={{ sx: { fontSize: 24 } }} />
        <span style={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase" }}>Logout</span>
      </button>
    </div>
  );
}
