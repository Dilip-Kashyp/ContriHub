import { useState, useEffect } from "react";
import Layout from "@/features/layout/Layout.jsx";
import HeroSection from "@/features/home/HeroSection.jsx";
import FeatureSection from "@/features/home/FeatureSection.jsx";
import StatsSection from "@/features/home/StatsSection.jsx";
import CTASection from "@/features/home/CTASection.jsx";
import { Box } from "@/components";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <Box boxProps={{ sx: { overflow: "hidden", background: "transparent" } }}>
        <HeroSection scrollY={scrollY} />
        <FeatureSection />
        <StatsSection />
        <CTASection />
      </Box>
    </Layout>
  );
}
