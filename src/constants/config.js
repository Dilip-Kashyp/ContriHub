export const API_CONFIG = {
  BASE_URL: "https://url-shortener-be.duckdns.org/contrihube/api/v1",
  // BASE_URL: "http://localhost:5050/api/v1",
};

export const API_ENDPOINTS = {
  GITHUB: {
    USER_PROFILE: "/github/user",
    USER_REPOS: "/github/user/repos",
    SEARCH_REPOS: "/github/search/repositories",
  },
  AUTH: {
    GITHUB_LOGIN: "/auth/github",
    LOGIN: "/auth/login",
  },
  AI: {
    EXPLAIN_REPO: "/ai/explain-repo",
    FIND_PROJECTS: "/ai/find-projects",
    ROADMAP: "/ai/roadmap",
    START_GUIDE: "/ai/start-guide",
    GENERATE_README: "/ai/generate-readme",
    GENERATE_SUMMARY: "/ai/generate-summary",
    CHAT_HISTORY: "/ai/chat/history",
    CHAT_MESSAGE: "/ai/chat/message",
  },
};
