import { Stack, Container, Box, Typography, Button, GitHubIcon, AutoAwesomeIcon } from "@/components";
import { LOGIN_PAGE_CONFIG } from "@/constants";
import { loginWithGithubHandler } from "@/helper";

const { PAGE_HEADER, PAGE_SUBTITLE, GITHUB_LOGIN_BUTTON } = LOGIN_PAGE_CONFIG;

export default function Login() {
  return (
    <Box boxProps={{
      sx: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        position: "relative",
        overflow: "hidden",
      }
    }}>
      {/* Background glow effects */}
      <Box boxProps={{
        sx: {
          position: "absolute",
          width: 400,
          height: 400,
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
          width: 350,
          height: 350,
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
            p: { xs: 4, md: 6 },
            background: "rgba(22, 27, 34, 0.7)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "24px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
              borderColor: "rgba(88, 166, 255, 0.3)",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #58a6ff, #bc8cff, #f778ba)",
              backgroundSize: "200% 100%",
              animation: "gradientShift 4s ease infinite",
            }
          }
        }}>
          <Stack stackProps={{ alignItems: "center", gap: 3 }}>
            {/* Animated Icon */}
            <Box boxProps={{
              className: "animate-float",
              sx: {
                width: 72,
                height: 72,
                borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(88, 166, 255, 0.15), rgba(188, 140, 255, 0.15))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }
            }}>
              <GitHubIcon iconProps={{ sx: { fontSize: 40, color: "#e6edf3" } }} />
            </Box>

            <Typography {...PAGE_HEADER} />
            <Typography {...PAGE_SUBTITLE} />

            <Button
              buttonProps={{
                ...GITHUB_LOGIN_BUTTON.buttonProps,
                onClick: loginWithGithubHandler,
                startIcon: <GitHubIcon iconProps={{ sx: { fontSize: 20 } }} />,
                fullWidth: true,
                sx: {
                  ...GITHUB_LOGIN_BUTTON.buttonProps.sx,
                  py: 1.5,
                  fontSize: "1rem",
                  background: "linear-gradient(135deg, #58a6ff, #388bfd)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #388bfd, #58a6ff)",
                    boxShadow: "0 0 24px rgba(88, 166, 255, 0.3)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                }
              }}
            />

            {/* Feature Bullets */}
            <Stack stackProps={{ gap: 1.5, width: "100%", mt: 1 }}>
              {[
                "Discover beginner-friendly projects",
                "Track your contribution history",
                "Build your developer profile",
              ].map((text, i) => (
                <Stack
                  key={i}
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <AutoAwesomeIcon iconProps={{ sx: { fontSize: 14, color: "#58a6ff" } }} />
                  <Typography typographyProps={{ variant: "body2", color: "#8b949e" }}>
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
