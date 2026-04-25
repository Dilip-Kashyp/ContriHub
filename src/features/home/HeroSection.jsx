import { useRouter } from "next/router";
import { ROUTES, HOME_PAGE_CONFIG } from "@/constants";
import { Box, Typography, Button, SearchIcon } from "@/components";

export default function HeroSection() {
  const router = useRouter();
  const { HERO_BADGE, HERO_TITLE, HERO_SUBTITLE, CTA_PRIMARY, CTA_SECONDARY } = HOME_PAGE_CONFIG;

  return (
    <Box boxProps={{ 
      component: "section",
      sx: {
        minHeight: "85vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: { xs: "80px 20px 40px", md: "80px 24px 30px" },
        overflow: "hidden",
        zIndex: 1
      }
    }}>
      <Box boxProps={{ 
        sx: { 
          position: "relative", 
          zIndex: 2, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          width: "100%",
          maxWidth: "1000px"
        }
      }}>
        {/* Raycast-style Badge */}
        <Box boxProps={{ 
          className: "animate-fade-in-down",
          sx: { 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "2px", 
            padding: "6px 16px", 
            borderRadius: "99px", 
            background: "rgba(255,255,255,0.05)", 
            border: "1px solid rgba(255,255,255,0.1)", 
            color: "rgba(255,255,255,0.8)", 
            fontSize: "0.75rem", 
            fontWeight: 600, 
            // marginBottom: "6px", 
            letterSpacing: "0.02em",
            backdropFilter: "blur(12px)"
          }
        }}>
          {HERO_BADGE}
        </Box>
        
        <Typography typographyProps={{
          variant: "h1",
          className: "animate-fade-in-up delay-100",
          sx: {
            fontSize: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem", lg: "6.5rem" }, 
            fontWeight: 600, 
            lineHeight: 1.05, 
            letterSpacing: "-0.04em", 
            margin: "0 0 24px",
            color: "#fff",
            textAlign: "center"
          }
        }}>
          {HERO_TITLE[0]} <br />
          {HERO_TITLE[1]}
        </Typography>
        
        <Typography typographyProps={{
          variant: "body1",
          className: "animate-fade-in-up delay-200",
          sx: {
            fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" }, 
            color: "rgba(255,255,255,0.6)", 
            maxWidth: "700px", 
            lineHeight: 1.6, 
            margin: "0 0 48px",
            textAlign: "center",
            px: 2,
            fontWeight: 400
          }
        }}>
          {HERO_SUBTITLE}
        </Typography>
        
        <Box boxProps={{ 
          className: "animate-fade-in-up delay-300",
          sx: { 
            display: "flex", 
            gap: "16px", 
            justifyContent: "center", 
            width: "100%",
            marginBottom: "64px"
          }
        }}>
          <Button 
            buttonProps={{
              onClick: () => router.push(ROUTES.DISCOVER),
              sx: {
                padding: "12px 32px", 
                borderRadius: "12px", 
                background: "#fff",
                color: "#0d1117", 
                fontWeight: 600, 
                fontSize: "1rem", 
                border: "none",
                "&:hover": {
                  background: "#f0f0f0",
                  transform: "translateY(-1px)"
                },
                transition: "all 0.2s ease"
              }
            }}
          >
            {CTA_PRIMARY}
          </Button>
          <Button 
            buttonProps={{
              onClick: () => router.push(ROUTES.ROADMAP),
              sx: {
                padding: "12px 32px", 
                borderRadius: "12px", 
                background: "rgba(255,255,255,0.05)",
                color: "#fff", 
                fontWeight: 600, 
                fontSize: "1rem", 
                border: "1px solid rgba(255,255,255,0.1)",
                "&:hover": {
                  background: "rgba(255,255,255,0.08)",
                  borderColor: "rgba(255,255,255,0.2)"
                },
                transition: "all 0.2s ease"
              }
            }}
          >
            {CTA_SECONDARY}
          </Button>
        </Box>

        {/* Command Bar Mockup */}
        {/* <Box boxProps={{
          className: "animate-slide-up delay-400",
          sx: {
            width: "100%",
            maxWidth: "700px",
            background: "rgba(22,27,34,0.8)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            textAlign: "left"
          }
        }}>
          <SearchIcon iconProps={{ sx: { color: "rgba(255,255,255,0.4)", fontSize: 24 } }} />
          <Typography typographyProps={{
            sx: { color: "rgba(255,255,255,0.3)", fontSize: "1.1rem", fontWeight: 400, flexGrow: 1 }
          }}>
            Find a repository to contribute to...
          </Typography>
          <Box boxProps={{
            sx: {
              background: "rgba(255,255,255,0.08)",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.5)",
              fontWeight: 700,
              letterSpacing: "1px"
            }
          }}>
            ⌘ K
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
}
