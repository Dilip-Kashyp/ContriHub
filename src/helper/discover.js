import { TECH_KEYWORDS } from "@/constants/discover";

export function extractUserInterests(messages) {
  const allText = messages.map(m => (m.content || "").toLowerCase()).join(" ");
  return TECH_KEYWORDS
    .filter(kw => new RegExp(`\\b${kw.key.replace(/ /g, "[ .]?")}\\b`, "gi").test(allText))
    .map(kw => kw.key);
}

export function calculateMatchScore(repo, interests) {
  if (!interests || !interests.length) return null;
  let score = 0;
  const repoLang = (repo.language || "").toLowerCase();
  const repoTopics = (repo.topics || []).map(t => t.toLowerCase());

  if (interests.includes(repoLang)) score += 60;
  
  interests.forEach(interest => {
    if (repoTopics.includes(interest.toLowerCase())) score += 15;
    if ((repo.description || "").toLowerCase().includes(interest.toLowerCase())) score += 10;
  });

  return Math.min(score, 99);
}
