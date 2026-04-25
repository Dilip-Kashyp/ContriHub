import Layout from "@/features/layout/Layout";
import AIRoadmapGenerator from "@/features/ai/AIRoadmapGenerator";
import { Typography, Box, Container } from "@/components";

export default function RoadmapPage() {
  return (
    <Layout>
      <Container containerProps={{ maxWidth: "lg", sx: { py: { xs: 1 } } }}>
        <Box boxProps={{ sx: { mb: 6, textAlign: "center" } }}>
          <Typography typographyProps={{ 
            variant: "h1", 
            sx: { 
              fontSize: { xs: "2.5rem", md: "4rem" }, 
              fontWeight: 900,
              letterSpacing: "-0.05em",
              mb: 2,
              background: "linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            } 
          }}>
            Learning Path
          </Typography>
          <Typography typographyProps={{ 
            variant: "body1", 
            sx: { color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", mx: "auto", fontWeight: 450 } 
          }}>
            Your personalized AI-generated journey into open source.
          </Typography>
        </Box>
        
        <Box boxProps={{ sx: { maxWidth: "800px", mx: "auto" } }}>
          <AIRoadmapGenerator isFullPage={true} />
        </Box>
      </Container>
    </Layout>
  );
}
