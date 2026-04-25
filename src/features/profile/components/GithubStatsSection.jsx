const Skeleton = ({ w, h, r = 16 }) => (
  <div style={{
    width: w, height: h, borderRadius: r,
    background: "linear-gradient(90deg, #161b22 25%, #21262d 50%, #161b22 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 2s infinite linear"
  }} />
);

export default function GithubStatsSection({ user }) {
  return (
    <div className="stats-images" style={{ gridColumn: "span 12", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
      {user ? (
        <>
          <img 
            src={`https://github-readme-stats.vercel.app/api?username=${user.login}&show_icons=true&theme=react&bg_color=0D1117&title_color=58A6FF&text_color=E6EDF3&icon_color=BC8CFF&border_color=30363d&hide_border=false`} 
            style={{ width: "100%", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }} 
            alt="GitHub Stats" 
          />
          <img 
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&layout=compact&theme=react&bg_color=0D1117&title_color=58A6FF&text_color=E6EDF3&border_color=30363d&hide_border=false`} 
            style={{ width: "100%", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }} 
            alt="Top Languages" 
          />
        </>
      ) : (
        <>
          <Skeleton w="100%" h="195px" />
          <Skeleton w="100%" h="195px" />
        </>
      )}
    </div>
  );
}
