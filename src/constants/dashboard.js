import { AI_STRINGS } from "./aiStrings";

export const DASHBOARD_STRINGS = {
  TITLE: "Your Dashboard",
  SUBTITLE: (messageCount) => `Insights powered by your ${AI_STRINGS.CHAT_ACTIVITY.replace("Insights powered by your ", "")}`,
  TOPICS_SECTION_TITLE: `Topics you explore with ${AI_STRINGS.NAME}`,
  MENTIONS: (count) => `${count} mention${count !== 1 ? "s" : ""}`,
  MESSAGES_COUNT_DESC: (count) => `Based on ${count} message${count !== 1 ? "s" : ""} in your Gibo history`,
  TOP_INTERESTS: "Top Interests",
  TOPICS_TRACKED: "Topics Tracked",
  GITHUB_ACTIVITY: "GitHub Activity (14 Days)",
  TOP_LANGUAGES: "Top Languages (Your Repos)",
  REPO_COUNT: (count) => `${count} repo${count !== 1 ? "s" : ""}`,
  ACHIEVEMENTS_TITLE: "Achievements & Streaks",
  PR_TRACKER_TITLE: "Your Open Pull Requests",
  VIEW_ALL_GITHUB: "View all on GitHub",
  NO_PRS_FOUND: "No open PRs found. Ready to make your first contribution?",
  FIND_ISSUES_BTN: "Find issues to work on",
  STALE_PR: (days) => `${days}d open`,
  STALE_PR_TODAY: "today",
  REPOS_MATCHING_TITLE: "Repos matching your top interests",
  VIEW_ALL_TRENDING: "View all trending",
  TOP_FOR: (topic) => `Top for ${topic}`,
  ACCESS_RESTRICTED: "Access Restricted",
  LOGIN_REQUIRED: "To access this page, please login.",
};

export const TECH_KEYWORDS = [
  { key: "javascript", label: "JavaScript", color: "#f7df1e" },
  { key: "python", label: "Python", color: "#3572a5" },
  { key: "react", label: "React", color: "#61dafb" },
  { key: "typescript", label: "TypeScript", color: "#3178c6" },
  { key: "rust", label: "Rust", color: "#dea584" },
  { key: "go", label: "Go", color: "#00add8" },
  { key: "java", label: "Java", color: "#b07219" },
  { key: "vue", label: "Vue", color: "#41b883" },
  { key: "angular", label: "Angular", color: "#dd0031" },
  { key: "nodejs", label: "Node.js", color: "#68a063" },
  { key: "docker", label: "Docker", color: "#0db7ed" },
  { key: "kubernetes", label: "Kubernetes", color: "#326ce5" },
  { key: "machine learning", label: "ML / AI", color: "#bc8cff" },
  { key: "nextjs", label: "Next.js", color: "#fff" },
  { key: "open source", label: "Open Source", color: "#3fb950" },
];

export const ACHIEVEMENTS = [
  {
    id: "first-pr",
    title: "First PR Merged",
    description: "Unlocked! Welcome to open source.",
    color: "#3fb950",
    bg: "rgba(63,185,80,0.05)",
    border: "rgba(63,185,80,0.2)",
    iconBg: "rgba(63,185,80,0.1)",
    type: "rocket"
  },
  {
    id: "3rd-streak",
    title: "3-Day Streak",
    description: "Keep it up! 27 days to Next Tier.",
    color: "#58a6ff",
    bg: "rgba(88,166,255,0.05)",
    border: "rgba(88,166,255,0.2)",
    iconBg: "rgba(88,166,255,0.1)",
    type: "bolt"
  },
  {
    id: "maintainer",
    title: "Maintainer Status",
    description: "Merge 10 PRs to unlock.",
    color: "rgba(255,255,255,0.4)",
    bg: "rgba(255,255,255,0.02)",
    border: "rgba(255,255,255,0.05)",
    iconBg: "rgba(255,255,255,0.05)",
    type: "star",
    locked: true
  }
];
