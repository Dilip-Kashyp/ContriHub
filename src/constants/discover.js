export const DISCOVER_STRINGS = {
  TITLE: "Discover Projects",
  SUBTITLE: "Find the perfect open-source project to start your contribution journey.",
  TAB_ISSUES: "Issues",
  TAB_GFI: "Good First Issues",
  TAB_REPOS: "Repositories",
  NEW_BADGE: "NEW",
  SEARCH_PLACEHOLDER: "Search projects, keywords...",
  FIND_BTN: "Find",
  MIN_STARS_LABEL: "Minimum Stars",
  LANGUAGES_LABEL: "Languages",
  TAGS_LABEL: "Tags & Labels",
  TOPICS_LABEL: "Topics",
  NO_ISSUES_FOUND: "No issues found for selected filters.",
  PREVIOUS: "Previous",
  NEXT: "Next",
  TABS: {
    ISSUES: "issues",
    GFI: "good-first-issues",
    REPOS: "repos"
  }
};

export const DISCOVER_PAGE_CONFIG = {
  ERROR_TEXT: "Something went wrong. Please try again later.",
  NO_PROJECTS_TEXT: "No projects found matching your criteria.",
  NO_DESC_TEXT: "No description available for this project.",

};

export const TECH_KEYWORDS = [
  { key: "javascript", label: "JavaScript" },
  { key: "python", label: "Python" },
  { key: "react", label: "React" },
  { key: "typescript", label: "TypeScript" },
  { key: "rust", label: "Rust" },
  { key: "go", label: "Go" },
  { key: "java", label: "Java" },
  { key: "vue", label: "Vue" },
  { key: "angular", label: "Angular" },
  { key: "nodejs", label: "Node.js" },
  { key: "docker", label: "Docker" },
  { key: "kubernetes", label: "Kubernetes" },
  { key: "machine learning", label: "ML / AI" },
  { key: "nextjs", label: "Next.js" },
  { key: "open source", label: "Open Source" },
];

export const TABS = [
  ["issues", "Issues", "#d29922"],
  ["good-first-issues", "Good First Issues", "#3fb950", "NEW"],
  ["repos", "Repositories", "#58a6ff"]
];

export const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript", color: "#f1e05a" },
  { value: "typescript", label: "TypeScript", color: "#3178c6" },
  { value: "python", label: "Python", color: "#3572A5" },
  { value: "java", label: "Java", color: "#b07219" },
  { value: "go", label: "Go", color: "#00ADD8" },
  { value: "rust", label: "Rust", color: "#dea584" },
  { value: "cpp", label: "C++", color: "#f34b7d" },
];

export const TOPIC_OPTIONS = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "nodejs", label: "Node.js" },
  { value: "machine-learning", label: "ML/AI" },
  { value: "docker", label: "Docker" },
];

export const DISCOVER_LABELS = [
  { value: "good-first-issue", label: "Good First Issue", icon: "AutoAwesomeIcon" },
  { value: "help-wanted", label: "Help Wanted", icon: "HelpIcon" },
  { value: "bug", label: "Bug", icon: "ErrorIcon" },
  { value: "documentation", label: "Documentation", icon: "ExploreIcon" },
];

export const SORT_OPTIONS = [
  { value: "stars", label: "Most Stars" },
  { value: "forks", label: "Most Forks" },
  { value: "updated", label: "Recently Updated" },
];

export const MIN_STAR_OPTIONS = [
  { value: 0, label: "Any" },
  { value: 100, label: "100+" },
  { value: 1000, label: "1k+" },
  { value: 5000, label: "5k+" },
];
