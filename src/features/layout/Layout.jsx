import Navbar from "./Navbar.jsx";
import { Box, Container, Stack, Typography, GitHubIcon } from "@/components";
import { APP_CONFIG, HOME_PAGE_CONFIG } from "@/constants";

export default function Layout({ children }) {
  return (
    <Box boxProps={{ sx: { display: "flex", flexDirection: "column", minHeight: "100vh" } }}>
      <Navbar />
      <Box boxProps={{ component: "main", sx: { flexGrow: 1, display: "flex", flexDirection: "column" } }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

function Footer() {
  return (
    <Box boxProps={{
      component: "footer",
      sx: {
        borderTop: "1px solid #21262d",
        bgcolor: "#0d1117",
        py: 4,
        mt: "auto",
      }
    }}>
      <Container containerProps={{ maxWidth: "lg" }}>
        <Stack stackProps={{
          direction: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}>
          <Stack stackProps={{ direction: "row", alignItems: "center", gap: 1 }}>
            <Box boxProps={{
              sx: {
                width: 24,
                height: 24,
                borderRadius: "6px",
                background: "linear-gradient(135deg, #58a6ff, #bc8cff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }
            }}>
              <GitHubIcon iconProps={{ sx: { fontSize: 14, color: "#fff" } }} />
            </Box>
            <Typography typographyProps={{ variant: "body2", color: "#8b949e" }}>
              {APP_CONFIG.TITLE}
            </Typography>
            <Typography typographyProps={{ variant: "body2", color: "#6e7681", sx: { mx: 1 } }}>
              ·
            </Typography>
            <Typography typographyProps={{ variant: "body2", color: "#6e7681" }}>
              {HOME_PAGE_CONFIG.FOOTER_TAGLINE}
            </Typography>
          </Stack>

          <Stack stackProps={{ direction: "row", gap: 3 }}>
            {HOME_PAGE_CONFIG.FOOTER_LINKS.map((link) => (
              <Typography
                key={link.label}
                typographyProps={{
                  variant: "body2",
                  component: "a",
                  href: link.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  sx: {
                    color: "#8b949e",
                    textDecoration: "none",
                    "&:hover": { color: "#58a6ff" },
                    transition: "color 200ms",
                  }
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
