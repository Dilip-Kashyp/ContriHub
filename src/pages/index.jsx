import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ROUTES } from "@/constants";
import Layout from "@/features/layout/Layout.jsx";
import { 
  AutoAwesomeIcon, SearchIcon, TimelineIcon, 
  GitHubIcon, RocketIcon, Box, Typography, Button
} from "@/components";
import { HOME_PAGE_CONFIG } from "@/constants";

const { 
  HERO_BADGE, HERO_TITLE, HERO_SUBTITLE, 
  CTA_PRIMARY, CTA_SECONDARY, FEATURES_TITLE, 
  FEATURES_SUBTITLE, BENTO_FEATURES, STATS, 
  FINAL_CTA, FINAL_CTA_SUB 
} = HOME_PAGE_CONFIG;

// --- Design System ---
const COLORS = {
  bg: "#0d1117",
  text: "#e6edf3",
  muted: "#8b949e",
  accent: "#58a6ff",
  purple: "#bc8cff",
  green: "#3fb950"
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
      <Box boxProps={{ sx: { overflow: "hidden", background: "transparent" } }}>
        
        {/* --- Hero Section --- */}
        <Box boxProps={{ 
          component: "section",
          sx: {
            minHeight: "100vh",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: { xs: "120px 24px 80px", md: "100px 24px" },
          }
        }}>
          {/* Glow Effect */}
          <Box boxProps={{
            sx: {
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: "1000px",
              height: "600px",
              background: `radial-gradient(circle, rgba(88,166,255,0.15) 0%, rgba(188,140,255,0.08) 40%, transparent 70%)`,
              filter: "blur(80px)",
              pointerEvents: "none",
              zIndex: 0
            }
          }} />

          <Box boxProps={{ 
            sx: { 
              position: "relative", 
              zIndex: 1, 
              top: scrollY * 0.1,
              transform: `perspective(1000px) rotateX(${scrollY * 0.02}deg)`,
              transition: "transform 0.1s ease-out",
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              width: "100%"
            }
          }}>
            <Box boxProps={{ 
              sx: { 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "8px", 
                padding: "8px 20px", 
                borderRadius: "99px", 
                background: "rgba(88,166,255,0.1)", 
                border: "1px solid #58a6ff33", 
                color: COLORS.accent, 
                fontSize: "clamp(0.7rem, 2vw, 0.85rem)", 
                fontWeight: 700, 
                marginBottom: "32px", 
                letterSpacing: "1px",
                maxWidth: "90%",
                justifyContent: "center"
              }
            }}>
              <AutoAwesomeIcon iconProps={{ sx: { fontSize: 14 } }} /> {HERO_BADGE}
            </Box>
            
            <Typography typographyProps={{
              variant: "h1",
              sx: {
                fontSize: "clamp(2.5rem, 10vw, 6rem)", 
                fontWeight: 900, 
                lineHeight: 1, 
                letterSpacing: "-2px", 
                margin: "0 0 24px",
                color: COLORS.text,
                textAlign: "center"
              }
            }}>
              {HERO_TITLE[0]} <br />
              <Box boxProps={{ 
                component: "span",
                sx: { 
                  background: "linear-gradient(90deg, #58a6ff, #bc8cff, #3fb950)", 
                  backgroundClip: "text", 
                  WebkitBackgroundClip: "text", 
                  WebkitTextFillColor: "transparent"
                }
              }}>{HERO_TITLE[1]}</Box> <br />
              {HERO_TITLE[2]}
            </Typography>
            
            <Typography typographyProps={{
              variant: "body1",
              sx: {
                fontSize: "clamp(1rem, 2.5vw, 1.4rem)", 
                color: COLORS.muted, 
                maxWidth: "600px", 
                lineHeight: 1.6, 
                margin: "0 0 48px",
                textAlign: "center"
              }
            }}>
              {HERO_SUBTITLE}
            </Typography>
            
            <Box boxProps={{ 
              sx: { 
                display: "flex", 
                gap: "16px", 
                justifyContent: "center", 
                width: "100%", 
                marginTop: "16px", 
                flexWrap: "wrap",
                px: 2
              }
            }}>
              <Button 
                buttonProps={{
                  onClick: () => router.push(ROUTES.LOGIN),
                  variant: "contained",
                  sx: {
                    padding: "18px 44px", 
                    borderRadius: "16px", 
                    background: "linear-gradient(135deg, #58a6ff, #bc8cff)",
                    color: "#fff", 
                    fontWeight: 700, 
                    fontSize: "1.1rem", 
                    border: "none",
                    boxShadow: "0 20px 40px rgba(88,166,255,0.25)",
                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 30px 60px rgba(88,166,255,0.4)",
                    },
                    flex: { xs: "1 1 100%", sm: "0 1 auto" },
                    minWidth: "240px"
                  }
                }}
              >
                {CTA_PRIMARY}
              </Button>
              <Button 
                buttonProps={{
                  onClick: () => router.push(ROUTES.DISCOVER),
                  variant: "outlined",
                  sx: {
                    padding: "18px 44px", 
                    borderRadius: "16px", 
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff", 
                    fontWeight: 600, 
                    fontSize: "1.1rem", 
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      background: "rgba(255,255,255,0.1)",
                      transform: "translateY(-4px)",
                    },
                    flex: { xs: "1 1 100%", sm: "0 1 auto" },
                    minWidth: "240px"
                  }
                }}
              >
                {CTA_SECONDARY}
              </Button>
            </Box>
          </Box>
        </Box>

        {/* --- Bento Features Section --- */}
        <Box boxProps={{ component: "section", sx: { padding: { xs: "60px 24px", md: "100px 24px" }, maxWidth: "1200px", margin: "0 auto" } }}>
          <Box boxProps={{ sx: { textAlign: "center", marginBottom: "64px" } }}>
            <Typography typographyProps={{
              variant: "h2",
              sx: { fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-1.5px", mb: 2 }
            }}>
              {FEATURES_TITLE.split(" Builders")[0]} <Box boxProps={{ component: "span", sx: { color: COLORS.accent } }}>Builders</Box>
            </Typography>
            <Typography typographyProps={{
              variant: "body1",
              sx: { color: COLORS.muted, fontSize: "clamp(1rem, 2vw, 1.2rem)" }
            }}>
              {FEATURES_SUBTITLE}
            </Typography>
          </Box>

          <Box boxProps={{ 
            sx: { 
              display: "grid", 
              gridTemplateColumns: "repeat(12, 1fr)", 
              gap: "24px" 
            }
          }}>
            {BENTO_FEATURES.map((f, i) => {
              const Icon = f.iconKey === "search" ? SearchIcon : f.iconKey === "timeline" ? TimelineIcon : f.iconKey === "github" ? GitHubIcon : RocketIcon;
              return (
                <Box key={i} boxProps={{ 
                  sx: { 
                    gridColumn: { xs: "span 12", md: `span ${f.span}` },
                    background: f.gradient,
                    border: "1px solid #30363d",
                    borderRadius: "32px",
                    padding: { xs: "32px", md: "40px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      borderColor: "#58a6ff77",
                      transform: "translateY(-10px) scale(1.02)",
                      boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                    }
                  }
                }}>
                  <Box boxProps={{ sx: { marginBottom: "20px" } }}><Icon iconProps={{ sx: { fontSize: 48, color: f.color } }} /></Box>
                  <Typography typographyProps={{ variant: "h3", sx: { fontSize: "2rem", fontWeight: 800, margin: "0 0 16px" } }}>{f.title}</Typography>
                  <Typography typographyProps={{ variant: "body1", sx: { color: COLORS.muted, fontSize: "1.1rem", maxWidth: "400px", margin: "0 auto" } }}>{f.desc}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Stats Section */}
        <Box boxProps={{ 
          component: "section",
          sx: { 
            padding: "60px 24px", 
            borderTop: "1px solid #30363d", 
            borderBottom: "1px solid #30363d",
            background: "rgba(22, 27, 34, 0.2)"
          } 
        }}>
          <Box boxProps={{ 
            sx: { 
              maxWidth: "1200px", 
              margin: "0 auto", 
              display: "grid", 
              gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, 
              gap: "40px" 
            }
          }}>
            {STATS.map(stat => (
              <Box key={stat.label} boxProps={{ sx: { textAlign: "center" } }}>
                <Typography typographyProps={{
                  sx: { fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-2px" }
                }}>{stat.val}</Typography>
                <Typography typographyProps={{
                  sx: { color: COLORS.accent, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px" }
                }}>{stat.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* --- Final CTA --- */}
        <Box boxProps={{ 
          component: "section",
          sx: { padding: { xs: "80px 24px", md: "120px 24px" }, textAlign: "center", position: "relative" }
        }}>
          <Box boxProps={{
            sx: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              maxWidth: "800px",
              height: "400px",
              background: `radial-gradient(circle, rgba(88,166,255,0.1) 0%, transparent 70%)`,
              filter: "blur(60px)",
              pointerEvents: "none",
              zIndex: 0,
              opacity: 0.5
            }
          }} />
          <Box boxProps={{ sx: { marginBottom: "20px", position: "relative", zIndex: 1 } }}><RocketIcon iconProps={{ sx: { fontSize: 64, color: COLORS.accent } }} /></Box>
          <Typography typographyProps={{
            variant: "h2",
            sx: { fontSize: "clamp(2.2rem, 8vw, 4rem)", fontWeight: 900, letterSpacing: "-2px", marginBottom: "32px", position: "relative", zIndex: 1 }
          }}>{FINAL_CTA}</Typography>
          <Button 
            buttonProps={{
              onClick: () => router.push(ROUTES.LOGIN),
              variant: "contained",
              sx: {
                padding: "24px 60px", 
                fontSize: "1.4rem", 
                width: { xs: "100%", sm: "auto" }, 
                minWidth: "300px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #58a6ff, #bc8cff)",
                fontWeight: 800,
                position: "relative",
                zIndex: 1,
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 20px 40px rgba(188, 140, 255, 0.3)",
                },
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              }
            }}
          >
            Start Contributing Free
          </Button>
          <Typography typographyProps={{
            sx: { marginTop: "24px", color: COLORS.muted, position: "relative", zIndex: 1 }
          }}>{FINAL_CTA_SUB}</Typography>
        </Box>
      </Box>
    </Layout>
  );
}
