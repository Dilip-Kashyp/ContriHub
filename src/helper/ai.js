import { apiClient } from "./apiClient";

const AI_BASE = "/ai";

/**
 * Ask AI to explain a repository.
 */
export async function explainRepo({
  repoName,
  description = "",
  language = "",
  topics = "",
  readme = "",
  question = "",
}) {
  return apiClient({
    url: `${AI_BASE}/explain-repo`,
    method: "POST",
    body: {
      repo_name: repoName,
      description,
      language,
      topics,
      readme,
      question,
    },
  });
}

/**
 * Ask AI to explain why projects match a query.
 */
export async function findProjects({ query, repoResults = "" }) {
  return apiClient({
    url: `${AI_BASE}/find-projects`,
    method: "POST",
    body: { query, repo_results: repoResults },
  });
}

/**
 * Generate a learning roadmap from repos.
 */
export async function generateRoadmap({
  interest,
  skillLevel = "beginner",
  repos = "",
}) {
  return apiClient({
    url: `${AI_BASE}/roadmap`,
    method: "POST",
    body: { interest, skill_level: skillLevel, repos },
  });
}

/**
 * Get a "Where to start" guide for a repo.
 */
export async function getStartGuide({
  repoName,
  description = "",
  language = "",
  readme = "",
  fileStructure = "",
}) {
  return apiClient({
    url: `${AI_BASE}/start-guide`,
    method: "POST",
    body: {
      repo_name: repoName,
      description,
      language,
      readme,
      file_structure: fileStructure,
    },
  });
}

/**
 * Generate a GitHub profile README.
 */
export async function generateReadme({
  username,
  name = "",
  bio = "",
  topRepos = "",
  languages = "",
}) {
  return apiClient({
    url: `${AI_BASE}/generate-readme`,
    method: "POST",
    body: { username, name, bio, top_repos: topRepos, languages },
  });
}

/**
 * Generate a professional summary.
 */
export async function generateSummary({
  skills = "",
  projects = "",
  experience = "",
}) {
  return apiClient({
    url: `${AI_BASE}/generate-summary`,
    method: "POST",
    body: { skills, projects, experience },
  });
}

/**
 * Get general chat history for the logged-in user.
 */
export async function getChatHistory() {
  return apiClient({
    url: `${AI_BASE}/chat/history`,
    method: "GET",
  });
}

/**
 * Send a general chat message to AI.
 */
export async function sendChatMessage(message) {
  return apiClient({
    url: `${AI_BASE}/chat/message`,
    method: "POST",
    body: { message },
  });
}
