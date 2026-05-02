import { useState } from "react";
import { useRouter } from "next/router";
import { getDeviconUrl } from "@/helper";
import { StarIcon, CallSplitIcon, AccessTimeIcon, AutoAwesomeIcon } from "@/components";
import { LANGUAGE_COLORS, DISCOVER_PAGE_CONFIG } from "@/constants";
import AIButton from "@/features/ai/AIButton";

const { NO_DESC_TEXT } = DISCOVER_PAGE_CONFIG;

export default function RepoCard({ repo, matchScore }) {
  const router = useRouter();
  const repoUrl = `/repo/${repo.full_name}`;
  const langColor = LANGUAGE_COLORS?.[repo.language] || "#8b949e";

  return (
    <div 
      className="bento-item" 
      onClick={() => router.push(repoUrl)}
      style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 16, height: "100%" }}
    >
      <div className="repo-card-header">
        <div style={{ flex: 1 }}>
          <div className="repo-card-title">{repo.full_name}</div>
          {matchScore !== null && matchScore > 0 && (
            <div className="repo-card-match-badge">
              <AutoAwesomeIcon iconProps={{ sx: { fontSize: 10 } }} /> {matchScore}% Match
            </div>
          )}
        </div>
        <div className="repo-card-stars">
          <StarIcon iconProps={{ sx: { fontSize: 12 } }} /> {repo.stargazers_count?.toLocaleString()}
        </div>
      </div>
      <p className="repo-card-desc">{repo.description || NO_DESC_TEXT}</p>
      
      <div className="repo-card-topics">
        {repo.topics?.slice(0, 4).map(t => (
          <span key={t} className="repo-card-topic">{t}</span>
        ))}
      </div>

      <div className="repo-card-actions">
        <AIButton label="Ask Gibo" onClick={(e) => { e.stopPropagation(); router.push(repoUrl); }} variant="primary" />
        <AIButton label="Where to Start" onClick={(e) => { e.stopPropagation(); router.push(repoUrl); }} variant="secondary" />
      </div>

      <div className="repo-card-footer">
        {repo.language && (
          <div className="repo-card-stat">
            {getDeviconUrl(repo.language) ? (
              <img src={getDeviconUrl(repo.language)} style={{ width: 12, height: 12 }} alt={repo.language} />
            ) : (
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: langColor }} />
            )}
            <span>{repo.language}</span>
          </div>
        )}
        <div className="repo-card-stat">
          <CallSplitIcon iconProps={{ sx: { fontSize: 12 } }} /> <span>{repo.forks_count}</span>
        </div>
        <div className="repo-card-stat repo-card-stat-right">
          <AccessTimeIcon iconProps={{ sx: { fontSize: 12 } }} /> <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
