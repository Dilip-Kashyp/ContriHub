import { useRouter } from "next/router";
import { ROUTES, HOME_PAGE_CONFIG } from "@/constants";
import { Box, Typography, Button } from "@/components";

export default function CTASection() {
  const router = useRouter();
  const { FINAL_CTA, FINAL_CTA_SUB, CTA_PRIMARY } = HOME_PAGE_CONFIG;

  return (
    <Box boxProps={{ 
      component: "section",
      sx: { 
        padding: { xs: "100px 24px", md: "160px 24px" }, 
        textAlign: "center", 
        position: "relative",
        zIndex: 2
      }
    }}>
      <Typography typographyProps={{
        variant: "h2",
        sx: { 
          fontSize: { xs: "2.5rem", md: "4rem" }, 
          fontWeight: 800, 
          letterSpacing: "-0.04em", 
          marginBottom: "24px", 
          lineHeight: 1,
          color: "#fff"
        }
      }}>
        {FINAL_CTA}
      </Typography>

      <Typography typographyProps={{
        sx: { 
          marginBottom: "48px", 
          color: "rgba(255,255,255,0.4)", 
          fontSize: "1.2rem", 
          fontWeight: 400,
          maxWidth: "600px",
          margin: "0 auto 48px"
        }
      }}>
        {FINAL_CTA_SUB}
      </Typography>

      <Button 
        buttonProps={{
          onClick: () => router.push(ROUTES.LOGIN),
          sx: {
            padding: "16px 48px", 
            fontSize: "1.1rem", 
            borderRadius: "12px", 
            background: "#fff",
            color: "#0d1117",
            fontWeight: 600,
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
    </Box>
  );
}
