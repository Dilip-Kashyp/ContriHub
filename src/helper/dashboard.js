import { TECH_KEYWORDS } from "@/constants/dashboard";

export function extractTopicFrequency(messages) {
  const allText = messages.map(m => (m.content || "").toLowerCase()).join(" ");
  const results = [];
  TECH_KEYWORDS.forEach(kw => {
    const count = (allText.match(new RegExp(`\\b${kw.key.replace(/ /g, "[ .]?")}\\b`, "gi")) || []).length;
    if (count > 0) results.push({ ...kw, count });
  });
  return results.sort((a, b) => b.count - a.count).slice(0, 6);
}
