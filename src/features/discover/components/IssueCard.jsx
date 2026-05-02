import { useRouter } from "next/router";
import { AccessTimeIcon, AutoAwesomeIcon } from "@/components";
import { getLabelColor, daysAgo } from "@/helper/issue";
import AIButton from "@/features/ai/AIButton";

export default function IssueCard({ issue, matchScore }) {
  const router = useRouter();
  const repoFullName = issue.repository_url?.replace("https://api.github.com/repos/", "") || "";
  const repoNameParts = repoFullName.split("/");
  const owner = repoNameParts[0] || "";
  const repo = repoNameParts[1] || "";
  const issueUrl = `/issue/${owner}/${repo}/${issue.number}`;

  const isAssignee = issue.assignees && issue.assignees.length > 0;

  return (
    <div 
      className="bento-item issue-card" 
      onClick={() => router.push(issueUrl)}
      style={{ cursor: "pointer", display: "flex", flexDirection: "column", height: "100%", position: "relative" }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div className="issue-card-header">
          <div className="issue-card-repo-name">{repoFullName}</div>
          
          {matchScore !== null && matchScore > 0 && (
            <div className="issue-card-match-badge">
              <AutoAwesomeIcon iconProps={{ sx: { fontSize: 9 } }} /> {matchScore}% Match
            </div>
          )}
        </div>

        <div className="issue-card-title" style={{ marginBottom: 12 }}>
          #{issue.number} {issue.title}
        </div>

        <div className="issue-card-labels">
          {(issue.labels || []).slice(0, 4).map(label => {
            const col = getLabelColor(label.name);
            return (
              <span key={label.id} className="issue-card-label" style={{
                background: `${col}15`, border: `1px solid ${col}30`, color: col,
              }}>
                {label.name}
              </span>
            );
          })}
        </div>

        <div className="issue-card-actions" style={{ marginTop: 12, marginBottom: 12, display: "flex", gap: 8 }}>
          <AIButton label="Ask Gibo" onClick={(e) => { e.stopPropagation(); router.push(issueUrl); }} variant="primary" />
        </div>

        <div className="issue-card-footer" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12 }}>
          <span className="issue-card-stat">
            <AccessTimeIcon iconProps={{ sx: { fontSize: 11 } }} />
            {daysAgo(issue.created_at)}
          </span>
          <span className="issue-card-stat">
            <span style={{ fontSize: 11 }}>💬</span>
            {issue.comments}
          </span>
          {isAssignee && (
            <span className="issue-card-stat" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <img src={issue.assignees[0].avatar_url} alt="Assignee" style={{ width: 14, height: 14, borderRadius: "50%" }} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
