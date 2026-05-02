import { useRouter } from "next/router";
import { BLOG_CONTENT } from "./blogData";

export default function BlogPostPage() {
  const router = useRouter();
  const { id } = router.query;

  const blog = BLOG_CONTENT[id];

  if (!blog) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "#8b949e" }}>
        Document not found.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", width: "100%", padding: "100px 24px 80px" }}>
      <style>{`
        .blog-content h1 { font-size: 2.5rem; font-weight: 900; color: #e6edf3; letter-spacing: -0.04em; margin-bottom: 32px; background: linear-gradient(135deg, #fff, #8b949e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .blog-content h2 { font-size: 1.4rem; font-weight: 800; color: #e6edf3; margin: 44px 0 18px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 10px; }
        .blog-content p { font-size: 1rem; line-height: 1.85; color: #8b949e; margin-bottom: 18px; }
        .blog-content ul, .blog-content ol { padding-left: 24px; color: #8b949e; margin-bottom: 24px; font-size: 1rem; line-height: 1.85; }
        .blog-content li { margin-bottom: 12px; }
        .blog-content strong { color: #e6edf3; font-weight: 700; }
        .blog-content em { color: #8b949e; font-style: italic; }
        .blog-content code { background: rgba(88,166,255,0.1); padding: 2px 7px; border-radius: 6px; font-size: 0.88em; font-family: 'Fira Code', monospace; color: #58a6ff; border: 1px solid rgba(88,166,255,0.2); }
        .blog-content pre { background: #0d1117; border: 1px solid rgba(255,255,255,0.08); padding: 24px; border-radius: 16px; overflow-x: auto; margin: 28px 0; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .blog-content pre code { background: transparent; padding: 0; color: #e6edf3; font-size: 0.88rem; border: none; line-height: 1.7; }
        .blog-content hr { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 44px 0; }
        .back-btn { display: inline-flex; align-items: center; gap: 8px; color: #58a6ff; font-size: 0.9rem; font-weight: 700; cursor: pointer; margin-bottom: 40px; transition: all 0.2s ease; text-decoration: none; }
        .back-btn:hover { color: #fff; transform: translateX(-4px); }
      `}</style>

      <div onClick={() => router.push("/docs")} className="back-btn">
        ← Back to Docs
      </div>

      <article className="blog-content">
        <h1>{blog.title}</h1>
        {blog.content}
      </article>
    </div>
  );
}
