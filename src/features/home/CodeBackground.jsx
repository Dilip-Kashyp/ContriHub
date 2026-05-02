import React from 'react';
import styles from './CodeBackground.module.css';

const codeSnippets = [
  "package main",
  "",
  "import (",
  "    \"fmt\"",
  "    \"net/http\"",
  "    \"github.com/gin-gonic/gin\"",
  ")",
  "",
  "func main() {",
  "    r := gin.Default()",
  "    r.GET(\"/ping\", func(c *gin.Context) {",
  "        c.JSON(http.StatusOK, gin.H{",
  "            \"message\": \"pong\",",
  "        })",
  "    })",
  "    r.Run() // listen and serve on 0.0.0.0:8080",
  "}",
  "",
  "// NewContriHubServer initializes a new server instance",
  "func NewContriHubServer(port string) *Server {",
  "    return &Server{",
  "        Addr: \":\" + port,",
  "        Handler: http.NewServeMux(),",
  "    }",
  "}",
  "",
  "type User struct {",
  "    ID    int    `json:\"id\"`",
  "    Name  string `json:\"name\"`",
  "    Score int    `json:\"score\"`",
  "}",
  "",
  "func (u *User) UpdateScore(points int) {",
  "    u.Score += points",
  "    fmt.Printf(\"User %s score: %d\\n\", u.Name, u.Score)",
  "}",
  "",
  "const (",
  "    MaxWorkers = 10",
  "    QueueSize  = 100",
  ")",
];


const CodeBackground = () => {
  // Duplicate code to ensure seamless loop
  const displayCode = [...codeSnippets, ...codeSnippets];

  return (
    <div className={styles.container}>
      <div className={styles.mask} />
      <div className={styles.glow} style={{ top: '10%', left: '10%' }} />
      <div className={styles.glow} style={{ bottom: '10%', right: '10%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)' }} />
      
      <div className={styles.codeContent}>
        {displayCode.map((line, index) => (
          <div key={index} className={styles.codeLine}>
            {line || ' '}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeBackground;
