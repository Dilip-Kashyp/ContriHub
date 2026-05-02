import { Box, Typography } from "@/components";
import CodeBackground from "./CodeBackground";

export default function WhatIsContriHub() {
  return (
    <Box boxProps={{
      component: "section",
      sx: {
        padding: { xs: "80px 20px", md: "100px 24px" },
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        zIndex: 2,
      }
    }}>
      <Box boxProps={{
        sx: {
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: "48px", md: "96px" },
          alignItems: "center",
        }
      }}>
        {/* Left: Label + heading with scrolling code background */}
        <Box boxProps={{
          sx: {
            position: "relative",
            padding: { xs: "24px 0", md: "40px" },
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: { xs: "320px", md: "450px" },
          }
        }}>

          <CodeBackground />
          
          {/* <Box boxProps={{ sx: { position: "relative", zIndex: 3 } }}>
            <Box boxProps={{
              sx: {
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "99px",
                border: "1px solid rgba(88,166,255,0.3)",
                background: "rgba(13,17,23,0.8)",
                backdropFilter: "blur(8px)",
                marginBottom: "32px",
              }
            }}>
              <Box boxProps={{
                sx: {
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#58a6ff",
                  boxShadow: "0 0 10px #58a6ff",
                }
              }} />
              <Typography typographyProps={{
                sx: {
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#58a6ff",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }
              }}>
                What is ContriHub
              </Typography>
            </Box>

            <Typography typographyProps={{
              variant: "h2",
              sx: {
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#fff",
                lineHeight: 1.1,
                mb: 0,
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }
            }}>
              Your AI-powered <br />
              Open Source <br />
              <span style={{ color: "#58a6ff" }}>Co-Pilot.</span>
            </Typography>
          </Box> */}
        </Box>


        {/* Right: description paragraphs */}
        <Box boxProps={{
          sx: {
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            borderLeft: { md: "1px solid rgba(255,255,255,0.06)" },
            paddingLeft: { md: "48px" },
          }
        }}>
          <Typography typographyProps={{
            sx: {
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              fontWeight: 400,
            }
          }}>
            ContriHub is not just another search engine. It's an intelligent mentor for developers looking to build their legacy. We guide you through the entire &apos;Zero-to-PR&apos; pipeline.
          </Typography>

          <Typography typographyProps={{
            sx: {
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              fontWeight: 400,
            }
          }}>
            With Gibo AI embedded directly into your workflow, we demystify complex codebases, provide step-by-step issue breakdowns, and match you with the perfect projects based on your skills.
          </Typography>

          {/* Inline stat row */}
          <Box boxProps={{
            sx: {
              display: "flex",
              gap: "32px",
              paddingTop: "8px",
            }
          }}>
            {[
              { val: "Match", desc: "AI-driven Match Score" },
              { val: "Demystify", desc: "Gibo Issue Breakdowns" },
              { val: "Merge", desc: "Gamified PR Tracking" },
            ].map(item => (
              <Box key={item.val} boxProps={{ sx: { display: "flex", flexDirection: "column", gap: "4px" } }}>
                <Typography typographyProps={{
                  sx: { fontSize: "0.85rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }
                }}>
                  {item.val}
                </Typography>
                <Typography typographyProps={{
                  sx: { fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", fontWeight: 400 }
                }}>
                  {item.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
