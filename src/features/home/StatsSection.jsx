import { Box, Typography } from "@/components";
import { HOME_PAGE_CONFIG } from "@/constants";

export default function StatsSection() {
  const { STATS } = HOME_PAGE_CONFIG;

  return (
    <Box boxProps={{ 
      component: "section",
      sx: { 
        padding: "80px 24px", 
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.01)",
        position: "relative"
      } 
    }}>
      <Box boxProps={{ 
        sx: { 
          maxWidth: "1200px", 
          margin: "0 auto", 
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          gap: "40px",
          textAlign: "center"
        }
      }}>
        {STATS.map(stat => (
          <Box key={stat.label} boxProps={{ 
            sx: { 
              display: "flex", 
              flexDirection: "column", 
              gap: "8px"
            } 
          }}>
            <Typography typographyProps={{
              sx: { fontSize: "2.5rem", fontWeight: 800, color: "#fff", lineHeight: 1 }
            }}>{stat.val}</Typography>
            <Typography typographyProps={{
              sx: { color: "rgba(255,255,255,0.4)", fontWeight: 500, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }
            }}>{stat.label}</Typography>
          </Box>
        ))}
      </Box>
      <Typography typographyProps={{
        sx: { 
          position: "absolute",
          bottom: "12px",
          right: "24px",
          fontSize: "0.7rem", 
          fontWeight: 400, 
          color: "rgba(255,255,255,0.2)", 
          lineHeight: 1,
          pointerEvents: "none"
        }
      }}> 
        Numbers are just to showcase the platform, real data coming soon.
      </Typography>
    </Box>
  );
}
