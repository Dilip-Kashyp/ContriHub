export const DISCOVER_PAGE_CONFIG = {
  PAGE_TITLE: {
    typographyProps: {
      children: "Discover Projects",
      variant: "h4",
      fontWeight: 700,
      sx: { mb: 3 }
    }
  },
  SEARCH_INPUT: {
    inputProps: {
      placeholder: "Search repositories (e.g., language:javascript good-first-issues:>0)",
      size: "small",
      variant: "outlined",
      fullWidth: true,
    }
  },
  SEARCH_BUTTON: {
    buttonProps: {
      children: "Search",
      variant: "contained",
      sx: { ml: 2, height: "100%", textTransform: "none", backgroundColor: "#24292e" }
    }
  },
  REPO_TITLE: ({ title }) => ({
    typographyProps: {
      children: title,
      variant: "h6",
      fontWeight: 600,
      color: "primary.main",
      sx: { wordBreak: "break-all" }
    }
  }),
  REPO_DESC: ({ desc }) => ({
    typographyProps: {
      children: desc,
      variant: "body2",
      color: "text.secondary",
      sx: { mt: 1, mb: 2, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }
    }
  }),
  STAT_TEXT: ({ text }) => ({
    typographyProps: {
      children: text,
      variant: "caption",
      color: "text.secondary",
    }
  }),
  SEARCHING_TEXT: "Searching projects...",
  ERROR_TEXT: "Failed to fetch projects. Rate limit exceeded or API error.",
  NO_PROJECTS_TEXT: "No projects found matching your criteria.",
  NO_DESC_TEXT: "No description provided.",
  ISSUES_LABEL: "issues",
  UPDATED_LABEL: "Updated",
  PREVIOUS_BUTTON: "Previous",
  NEXT_BUTTON: "Next"
};

export const LANGUAGE_OPTIONS = [
  { value: "", label: "Any Language" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "php", label: "PHP" },
];

export const SORT_OPTIONS = [
  { value: "stars", label: "Most Stars" },
  { value: "updated", label: "Recently Updated" },
  { value: "help-wanted-issues", label: "Help Wanted" },
  { value: "forks", label: "Forks" },
];

export const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  "C++": "#f34b7d",
  "C#": "#178600",
  C: "#555555",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  PHP: "#4F5D95",
  Dart: "#00B4AB",
  Scala: "#c22d40",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Elixir: "#6e4a7e",
  Haskell: "#5e5086",
  Lua: "#000080",
  R: "#198CE7",
  Default: "#8b949e",
};
