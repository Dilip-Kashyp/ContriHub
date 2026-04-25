export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  DISCOVER: "/discover",
  PROFILE: "/profile",
  REPO_AI: "/repo", // /repo/[owner]/[name]
  CHAT: "/chat",
  ROADMAP: "/roadmap",
};

export const MENU_ITEMS = [
  { id: "discover", label: "Discover", path: ROUTES.DISCOVER },
  { id: "dashboard", label: "Dashboard", path: ROUTES.DASHBOARD },
  { id: "roadmap", label: "Learning Path", path: ROUTES.ROADMAP },
  { id: "chat", label: "Gibo Chat", path: ROUTES.CHAT },
];
export const APP_CONFIG = {
  TITLE: "ContriHub",
  LOGIN_BUTTON: "Sign in with GitHub",
  LOGOUT_BUTTON: "Logout"
};
