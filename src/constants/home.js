import { AI_STRINGS } from "./aiStrings";

export const HOME_PAGE_CONFIG = {
  HERO_BADGE: "ContriHub v1.0 • The Zero-to-PR Pipeline",
  HERO_TITLE: ["Build your legacy in", "Open Source."],
  HERO_SUBTITLE: "Stop getting lost in massive codebases. Discover the right projects, let Gibo AI break down complex issues, and track your PRs to merge.",
  CTA_PRIMARY: "Find Your First Issue",
  CTA_SECONDARY: "Docs",
  FEATURES_TITLE: "Bridging the gap between finding an issue and writing the code.",
  FEATURES_SUBTITLE: "We don't just give you a list of issues. We give you the context, the exact files to edit, and the local setup steps to get it done.",
  BENTO_FEATURES: [
    {
      title: AI_STRINGS.FEATURE_TITLE,
      desc: AI_STRINGS.FEATURE_DESC,
      iconKey: "roadmap",
      span: 8,
      gradient: "linear-gradient(135deg, rgba(88, 166, 255, 0.05) 0%, transparent 100%)",
      color: "#58a6ff",
      isPrimary: false
    },
    {
      title: "Contribution Pulse",
      desc: "Real-time health scores for every repo. Know if a project is active, welcoming, and worth your time — before you commit.",
      iconKey: "pulse",
      span: 4,
      gradient: "linear-gradient(135deg, rgba(63, 185, 80, 0.05) 0%, transparent 100%)",
      color: "#3fb950",
      isLive: true
    },
    {
      title: "Native Extensions",
      desc: "Connect your workflow with GitHub, VS Code, and more. ContriHub fits where you work.",
      iconKey: "globe",
      upcoming: true,
      span: 4,
      gradient: "linear-gradient(135deg, rgba(188, 140, 255, 0.05) 0%, transparent 100%)",
      color: "#bc8cff"
    },
    {
      title: "Smart Issue Matching",
      desc: AI_STRINGS.ISSUE_MATCH_DESC,
      iconKey: "roadmap",
      span: 8,
      gradient: "linear-gradient(135deg, rgba(210, 153, 34, 0.05) 0%, transparent 100%)",
      color: "#d29922"
    }
  ],
  STATS: [
    { val: "50k+", label: "Projects" },
    { val: "100k+", label: "Builders" },
    { val: "30+", label: "Stacks" },
    { val: "1M+", label: "Commits" }
  ],
  FINAL_CTA: "Build your developer profile today.",
  FINAL_CTA_SUB: "Join thousands of developers making an impact in open source.",
  FOOTER_TAGLINE: "The OS for OS.",
  FOOTER_LINKS: [
    { label: "GitHub", href: "https://github.com" },
    { label: "Blog", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
  ],
};
