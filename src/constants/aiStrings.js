/**
 * AI Assistant Identity Constants
 * ─────────────────────────────────────────────────────────────────
 * Change AI_NAME here to rename the AI assistant across the entire app.
 * All UI strings that reference the AI name are derived from this constant.
 */
export const AI_NAME = "Gibo";

export const AI_STRINGS = {
  // Identity
  NAME:                   AI_NAME,
  ASSISTANT_TITLE:        `${AI_NAME} Assistant`,
  CHAT_LABEL:             `${AI_NAME} Chat`,
  SIDEBAR_LABEL:          AI_NAME,
  POWERED_BADGE:          `${AI_NAME.toUpperCase()} POWERED`,

  // Button labels
  ASK_BTN:                `Ask ${AI_NAME}`,
  OPEN_CHAT_BTN:          `Open ${AI_NAME} Chat`,
  PERSONALIZE_BTN:        `Personalize ${AI_NAME}`,
  PROJECT_SUGGESTER:      `${AI_NAME} Project Suggester`,

  // Response / loading states
  RESPONSE_LABEL:         `${AI_NAME} Response`,
  THINKING:               `${AI_NAME} is thinking...`,
  ANALYZING:              "Analyzing repository...",

  // Descriptive copy
  WILL_ANALYZE:           `${AI_NAME} will analyze the repository and answer your questions`,
  WILL_FIND:              `Describe what you're looking for and ${AI_NAME} will find the best matching projects.`,
  REPO_TITLE:             (repoName) => `${AI_NAME}: ${repoName}`,

  // Dashboard copy
  CHAT_ACTIVITY:          `Insights powered by your ${AI_NAME} chat activity`,
  TOPICS_WITH:            `Topics you explore with ${AI_NAME}`,
  NO_HISTORY:             `No ${AI_NAME} chat history yet. Start chatting to see your topic insights.`,
  HISTORY_BASE:           (count) => `Based on ${count} message${count !== 1 ? "s" : ""} in your ${AI_NAME} history`,
  MESSAGES_LABEL:         `${AI_NAME} Messages`,
  SUGGEST_START:          `Start chatting with ${AI_NAME} to get personalized repo suggestions.`,

  // Access / auth messages
  ACCESS_MSG:             `To access ${AI_NAME} Chat, please login.`,
  CHAT_PLACEHOLDER:       `Message ContriHub ${AI_NAME}...`,

  // Error messages
  RESPONSE_ERROR:         `Failed to get ${AI_NAME} response`,
  RECOMMENDATIONS_ERROR:  `Failed to get ${AI_NAME} recommendations`,
  RATE_LIMIT_ERROR:       `${AI_NAME} is busy with too many requests. Please try again in a minute.`,
  SERVER_ERROR:           `${AI_NAME} is having some technical difficulties. Please try again later.`,

  // Home page feature card
  FEATURE_TITLE:          `${AI_NAME} — AI Contribution Engine`,
  FEATURE_DESC:           `Your AI co-pilot for open source. ${AI_NAME} analyzes codebases, matches you with the right issues, and explains exactly how to get started.`,
  ISSUE_MATCH_DESC:       `${AI_NAME} scans thousands of open issues and surfaces the exact ones that match your skills, language, and time — personalized for you.`,
};
