import { useEffect } from "react";
import { useRouter } from "next/router";
import { Stack, Container, Box, Typography, Button, GitHubIcon, AutoAwesomeIcon } from "@/components";
import { LOGIN_PAGE_CONFIG } from "@/constants";
import { loginWithGithubHandler } from "@/helper";
import { LOCAL_STORAGE_KEY } from "@/constants/common";

const { PAGE_HEADER, PAGE_SUBTITLE, GITHUB_LOGIN_BUTTON, LOGIN_FEATURES } = LOGIN_PAGE_CONFIG;

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    // Extract token from hash (e.g., #token=...)
    const hash = window.location.hash;
    if (hash && hash.includes("token=")) {
      const extractedToken = hash.split("token=")[1]?.split("&")[0];
      if (extractedToken) {
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, extractedToken);
        // Set cookie for middleware access
        document.cookie = `${LOCAL_STORAGE_KEY.ACCESS_TOKEN}=${extractedToken}; path=/; max-age=31536000; SameSite=Lax`;
        // Redirect to dashboard immediately
        router.replace("/dashboard");
      }
    }
  }, [router]);
  return (
    <Box boxProps={{
      sx: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 2, md: 2 },
        px: 2,
        position: "relative",
        overflow: "hidden",
      }
    }}>
      {/* Background glow effects */}
      <Box boxProps={{
        sx: {
          position: "absolute",
          width: { xs: 250, md: 400 },
          height: { xs: 250, md: 400 },
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(88, 166, 255, 0.08), transparent 60%)",
          top: "10%",
          right: "20%",
          pointerEvents: "none",
        }
      }} />
      <Box boxProps={{
        sx: {
          position: "absolute",
          width: { xs: 200, md: 350 },
          height: { xs: 200, md: 350 },
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(188, 140, 255, 0.06), transparent 60%)",
          bottom: "10%",
          left: "15%",
          pointerEvents: "none",
        }
      }} />

      <Container containerProps={{ maxWidth: "xs" }}>
        <Box boxProps={{
          className: "animate-scale-in",
          sx: {
            p: { xs: 3, md: 5 },
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 28px 56px rgba(0,0,0,0.5)",
              borderColor: "rgba(88, 166, 255, 0.3)",
            },
          }
        }}>
          <Stack stackProps={{ alignItems: "center", gap: 2.5 }}>
            {/* Animated Icon */}
            <Typography {...PAGE_HEADER} />
            <Typography {...PAGE_SUBTITLE} />

            <Button
              buttonProps={{
                ...GITHUB_LOGIN_BUTTON.buttonProps,
                onClick: loginWithGithubHandler,
                startIcon: <GitHubIcon iconProps={{ sx: { fontSize: 18 } }} />,
                fullWidth: true,
                sx: {
                  ...GITHUB_LOGIN_BUTTON.buttonProps.sx,
                  py: 1.2,
                  fontSize: "0.9rem",
                  background: "#fff",
                  color: "#0d1117",
                  fontWeight: 700,
                  "&:hover": {
                    background: "#f0f0f0",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.3s ease",
                }
              }}
            />

            {/* Feature Bullets */}
            <Stack stackProps={{ gap: 1, width: "100%", mt: 0.5 }}>
              {LOGIN_FEATURES.map((text, i) => (
                <Stack
                  key={i}
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <AutoAwesomeIcon iconProps={{ sx: { fontSize: 12, color: "#58a6ff" } }} />
                  <Typography typographyProps={{ variant: "body2", color: "#8b949e", sx: { fontSize: "0.78rem" } }}>
                    {text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
