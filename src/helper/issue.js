export const LABEL_COLORS = {
  "good first issue": "#3fb950",
  "good-first-issue": "#3fb950",
  "help wanted": "#58a6ff",
  "beginner": "#bc8cff",
  "easy": "#3fb950",
  "documentation": "#d29922",
  "bug": "#f85149",
};

export function getLabelColor(name) {
  const lower = name.toLowerCase();
  for (const [key, color] of Object.entries(LABEL_COLORS)) {
    if (lower.includes(key)) return color;
  }
  return "#6e7681";
}

export function daysAgo(dateStr) {
  const days = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "1d ago";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}
