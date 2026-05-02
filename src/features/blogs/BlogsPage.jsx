import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DescriptionIcon, AccessTimeIcon, OpenInNewIcon } from "@/components";
import { BLOGS_STRINGS, BLOGS_DATA } from "@/constants/blogs";

export default function BlogsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="blogs-container">
      <div className="blogs-header">
        <div className="blogs-header-inner">
          <div className="blogs-icon-wrapper">
            <DescriptionIcon iconProps={{ sx: { color: "#58a6ff", fontSize: 24 } }} />
          </div>
          <h1 className="blogs-title">{BLOGS_STRINGS.TITLE}</h1>
        </div>
        {/* <p className="blogs-subtitle">{BLOGS_STRINGS.SUBTITLE}</p> */}
      </div>

      {(!BLOGS_DATA || BLOGS_DATA.length === 0) ? (
        <div className="blogs-empty">
          <div className="blogs-empty-icon">📭</div>
          <h3 className="blogs-empty-title">{BLOGS_STRINGS.EMPTY_TITLE}</h3>
          <p className="blogs-empty-subtitle">{BLOGS_STRINGS.EMPTY_SUBTITLE}</p>
        </div>
      ) : (
        <div className="blogs-list">
          {BLOGS_DATA.map((blog, idx) => (
            <div key={blog.id || idx} className="blog-card" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="blogs-header-inner" style={{ justifyContent: "space-between", marginBottom: 12 }}>
                <span className="blog-tag">{blog.tags?.[0] || "Open Source"}</span>
                {blog.internal ? (
                  <div 
                    onClick={() => router.push(blog.url)} 
                    className="blog-card-action"
                    style={{ cursor: "pointer" }}
                  >
                    <OpenInNewIcon iconProps={{ sx: { fontSize: 16 } }} />
                  </div>
                ) : (
                  <a href={blog.url} target="_blank" rel="noreferrer" className="blog-card-action">
                    <OpenInNewIcon iconProps={{ sx: { fontSize: 16 } }} />
                  </a>
                )}
              </div>
              
              <div 
                className="blog-card-link"
                onClick={() => blog.internal ? router.push(blog.url) : window.open(blog.url, "_blank")}
                style={{ cursor: "pointer" }}
              >
                <h2 className="blog-card-title">{blog.title}</h2>
              </div>
              
              <p className="blog-card-description">{blog.description}</p>
              
              <div className="blog-card-meta">
                <div className="blog-card-date">
                  <AccessTimeIcon iconProps={{ sx: { fontSize: 14, mr: 0.5, verticalAlign: "middle" } }} />
                  {new Date(blog.date).toLocaleDateString("en-US", { 
                    month: "short", day: "numeric", year: "numeric" 
                  })}
                </div>
                <div className="blog-card-dot" />
                <div className="blog-card-tags">
                  {(blog.tags || []).slice(0, 3).map(tag => (
                    <span key={tag} style={{ fontSize: "11px", color: "#6e7681" }}>#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
