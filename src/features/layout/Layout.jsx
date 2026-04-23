import Sidebar from "./Sidebar.jsx";
import { useRouter } from "next/router";
import { Box, Container, Stack, Typography, GitHubIcon } from "@/components";
import { APP_CONFIG, HOME_PAGE_CONFIG } from "@/constants";

export default function Layout({ children }) {
  const router = useRouter();
  const isLanding = router.pathname === "/";
  return (
    <Box boxProps={{ 
      sx: { 
        width: "100%",
        position: "relative",
      } 
    }}>
      {/* Global 3D Background */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.25, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(88,166,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(88,166,255,0.15) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        transform: "perspective(1000px) rotateX(60deg) translateY(-100px)",
        transformOrigin: "top",
        height: "200vh",
        maskImage: "linear-gradient(to bottom, black, transparent)",
        zIndex: 0
      }} className="animate-grid-float" />

      <style>{`
        @keyframes gridFloat {
          0% { transform: perspective(1000px) rotateX(60deg) translateY(-100px); }
          50% { transform: perspective(1000px) rotateX(60deg) translateY(-120px); }
          100% { transform: perspective(1000px) rotateX(60deg) translateY(-100px); }
        }
        .animate-grid-float { animation: gridFloat 10s infinite linear; }
      `}</style>

      <Box boxProps={{
        sx: {
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: isLanding ? 0 : "40px",
          maxWidth: isLanding ? "100%" : "1300px",
          margin: "0 auto",
          width: "100%",
          padding: isLanding ? 0 : { xs: "20px", md: "40px 24px" },
          position: "relative",
          zIndex: 1,
          flexGrow: 1,
        }
      }}>
        {!isLanding && (
          <>
            <Sidebar />
            {/* Spacer to reserve space for the fixed sidebar on desktop */}
            <Box boxProps={{ sx: { width: "84px", flexShrink: 0, display: { xs: "none", md: "block" } } }} />
          </>
        )}
        <Box boxProps={{ 
          sx: { 
            flexGrow: 1, 
            display: "flex", 
            flexDirection: "column",
            minWidth: 0,
            pb: { xs: "80px", md: 0 } // Space for mobile bottom nav
          } 
        }}>
          <Box boxProps={{ component: "main", sx: { flexGrow: 1, display: "flex", flexDirection: "column", mb: 4 } }}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

function Footer() {
  return (
    <Box boxProps={{
      component: "footer",
      sx: {
        borderTop: "1px solid #21262d",
        bgcolor: "#0d1117",
        py: 4,
        mt: "auto",
      }
    }}>
      <Container containerProps={{ maxWidth: "lg", disableGutters: true }}>
        <Stack stackProps={{
          direction: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}>
          <Stack stackProps={{ direction: "row", alignItems: "center", gap: 1 }}>
            <Box boxProps={{
              sx: {
                width: 24,
                height: 24,
                borderRadius: "6px",
                background: "linear-gradient(135deg, #58a6ff, #bc8cff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }
            }}>
              <GitHubIcon iconProps={{ sx: { fontSize: 14, color: "#fff" } }} />
            </Box>
            <Typography typographyProps={{ variant: "body2", color: "#8b949e" }}>
              {APP_CONFIG.TITLE}
            </Typography>
            <Typography typographyProps={{ variant: "body2", color: "#6e7681", sx: { mx: 1 } }}>
              ·
            </Typography>
            <Typography typographyProps={{ variant: "body2", color: "#6e7681" }}>
              {HOME_PAGE_CONFIG.FOOTER_TAGLINE}
            </Typography>
          </Stack>

          <Stack stackProps={{ direction: "row", gap: 3 }}>
            {HOME_PAGE_CONFIG.FOOTER_LINKS.map((link) => (
              <Typography
                key={link.label}
                typographyProps={{
                  variant: "body2",
                  component: "a",
                  href: link.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  sx: {
                    color: "#8b949e",
                    textDecoration: "none",
                    "&:hover": { color: "#58a6ff" },
                    transition: "color 200ms",
                  }
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
