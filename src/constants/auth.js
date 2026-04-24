export const LOGIN_PAGE_CONFIG = {
  PAGE_HEADER: {
    typographyProps: {
      children: "Sign in to ContriHub",
      variant: "h4",
      align: "center",
      fontWeight: 600,
      sx: { mb: 2 }
    }
  },
  PAGE_SUBTITLE: {
    typographyProps: {
      children: "Discover open-source projects and track your contributions",
      variant: "body1",
      align: "center",
      color: "text.secondary",
      sx: { mb: 4 }
    }
  },
  GITHUB_LOGIN_BUTTON: {
    buttonProps: {
      children: "Continue with GitHub",
      variant: "contained",
      size: "large",
      sx: { 
        backgroundColor: "#24292e", 
        color: "#fff", 
        "&:hover": { backgroundColor: "#1b1f23" },
        textTransform: "none",
        fontWeight: 600,
        px: 4
      }
    }
  },
  LOGIN_FEATURES: [
    "Discover beginner-friendly projects",
    "Track your contribution history",
    "Build your developer profile",
  ]
};
