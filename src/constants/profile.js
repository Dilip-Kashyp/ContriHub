export const PROFILE_PAGE_CONFIG = {
  USERNAME_TEXT: ({ username }) => ({
    typographyProps: {
      children: username,
      variant: "h5",
      fontWeight: 600,
    },
  }),
  LOGIN_TEXT: ({ login }) => ({
    typographyProps: {
      children: login,
      variant: "body1",
      color: "text.secondary",
    },
  }),
  BIO_TEXT: ({ bio }) => ({
    typographyProps: {
      children: bio,
      variant: "body2",
      sx: { mt: 1, mb: 2 }
    },
  }),
  STAT_LABEL: ({ label }) => ({
    typographyProps: {
      children: label,
      variant: "caption",
      color: "text.secondary",
      fontWeight: 600,
      sx: { textTransform: "uppercase" }
    }
  }),
  STAT_VALUE: ({ value }) => ({
    typographyProps: {
      children: value,
      variant: "h6",
      fontWeight: 700,
    }
  }),
  SECTION_TITLE: ({ title }) => ({
    typographyProps: {
      children: title,
      variant: "h6",
      fontWeight: 600,
      sx: { mb: 2 }
    }
  }),
  LOADING_TEXT: "Loading profile...",
  REPO_LOADING_TEXT: "Loading repositories...",
  ERROR_TEXT: "Failed to load profile. Please sign in again.",
  REPO_ERROR_TEXT: "Failed to load repositories.",
  NO_REPOS_TEXT: "No public repositories found.",
  SIGN_IN_PROMPT: "Please sign in to view your profile.",
  SIGN_IN_BUTTON: "Go to Login",
  FOLLOWERS_LABEL: "followers",
  FOLLOWING_LABEL: "following",
  OVERVIEW_LABEL: "Overview",
  RECENT_REPOS_LABEL: "Recent Repositories",
  NO_DESC_TEXT: "No description provided.",
  ISSUES_LABEL: "issues",
  UPDATED_LABEL: "Updated"
};

export const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Go: "#00ADD8",
  Java: "#b07219",
  Ruby: "#701516",
  Rust: "#dea584",
  Default: "#8b949e"
};
