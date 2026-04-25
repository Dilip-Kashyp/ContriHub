import { Box, Typography, AutoAwesomeIcon, TimelineIcon, LanguageIcon, ExploreIcon } from "@/components";
import { HOME_PAGE_CONFIG } from "@/constants";

export default function FeatureSection() {
  const { FEATURES_TITLE, FEATURES_SUBTITLE, BENTO_FEATURES } = HOME_PAGE_CONFIG;

  const ICONS = {
    roadmap: AutoAwesomeIcon,
    pulse: TimelineIcon,
    globe: LanguageIcon,
    explore: ExploreIcon
  };

  return (
    <Box boxProps={{ 
      component: "section", 
      sx: { 
        padding: { xs: "80px 20px", md: "120px 24px" }, 
        maxWidth: "1200px", 
        margin: "0 auto",
        position: "relative",
        zIndex: 2
      } 
    }}>
      <Box boxProps={{ sx: { textAlign: "left", marginBottom: "64px" } }}>
        <Typography typographyProps={{
          variant: "h2",
          sx: { 
            fontSize: { xs: "2.5rem", md: "3.5rem" }, 
            fontWeight: 800, 
            letterSpacing: "-0.04em", 
            mb: 2,
            color: "#fff"
          }
        }}>
          {FEATURES_TITLE}
        </Typography>
        <Typography typographyProps={{
          variant: "body1",
          sx: { 
            color: "rgba(255,255,255,0.5)", 
            fontSize: "1.2rem", 
            maxWidth: "600px", 
            fontWeight: 400 
          }
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
          const Icon = ICONS[f.iconKey] || ExploreIcon;
          
          return (
            <Box key={i} boxProps={{ 
              className: "animate-fade-in-up",
              sx: { 
                gridColumn: { xs: "span 12", md: `span ${f.span}` },
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "24px",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                transition: "all 0.3s ease",
                animationDelay: `${(i + 1) * 100}ms`,
                "&:hover": {
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.1)",
                  transform: "translateY(-4px)"
                }
              }
            }}>
              <Box boxProps={{ 
                sx: { 
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)"
                } 
              }}>
                <Icon iconProps={{ sx: { fontSize: 24, color: f.color } }} />
              </Box>
              
              <Box>
                <Typography typographyProps={{ 
                  variant: "h3", 
                  sx: { 
                    fontSize: "1.5rem", 
                    fontWeight: 700, 
                    margin: "0 0 12px", 
                    color: "#fff"
                  } 
                }}>
                  {f.title}
                  {f.isLive && (
                    <Box boxProps={{ 
                      component: "span",
                      sx: {
                        fontSize: "0.65rem",
                        background: "rgba(63, 185, 80, 0.1)",
                        color: "#3fb950",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        marginLeft: "12px",
                        verticalAlign: "middle",
                        fontWeight: 700,
                        border: "1px solid rgba(63, 185, 80, 0.2)"
                      }
                    }}>LIVE</Box>
                  )}
                   {f.upcoming && (
                    <Box boxProps={{ 
                      component: "span",
                      sx: {
                        fontSize: "0.65rem",
                        background: "rgba(210, 153, 34, 0.1)",
                        color: "#d29922",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        marginLeft: "12px",
                        verticalAlign: "middle",
                        fontWeight: 700,
                        border: "1px solid rgba(210, 153, 34, 0.2)"
                      }
                    }}>UPCOMING</Box>
                  )}
                </Typography>
                <Typography typographyProps={{ 
                  variant: "body1", 
                  sx: { 
                    color: "rgba(255,255,255,0.4)", 
                    fontSize: "1.05rem", 
                    lineHeight: 1.5
                  } 
                }}>
                  {f.desc}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
