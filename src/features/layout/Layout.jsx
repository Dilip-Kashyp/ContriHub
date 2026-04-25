import Sidebar from "./Sidebar.jsx";
import { useRouter } from "next/router";
import { Box } from "@/components";

export default function Layout({ children }) {
  const router = useRouter();
  const isLanding = router.pathname === "/";
  return (
    <Box boxProps={{ 
      sx: { 
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        overflowY: "auto",
        background: "#0d1117",
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none"
      } 
    }}>
      
      {/* Noise Texture */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.05,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      <Box boxProps={{
        sx: {
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: isLanding ? 0 : { xs: "16px", md: "32px" },
          maxWidth: isLanding ? "100%" : "1300px",
          margin: "0 auto",
          width: "100%",
          padding: isLanding ? 0 : { xs: "8px", md: "8px 24px" },
          position: "relative",
          zIndex: 1,
          flexGrow: 1,
        }
      }}>
        {!isLanding && (
          <>
            <Sidebar />
            <Box boxProps={{ sx: { width: "72px", flexShrink: 0, display: { xs: "none", md: "block" } } }} />
          </>
        )}
        <Box boxProps={{ 
          sx: { 
            flexGrow: 1, 
            display: "flex", 
            flexDirection: "column",
            minWidth: 0,
          } 
        }}>
          <Box boxProps={{ component: "main", sx: { flexGrow: 1, display: "flex", flexDirection: "column" } }}>
            {children}
          </Box>
          {/* Footer removed for minimal landing page aesthetic */}
        </Box>
      </Box>
    </Box>
  );
}
