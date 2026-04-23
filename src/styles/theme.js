import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#58a6ff",
      light: "rgba(88, 166, 255, 0.15)",
      dark: "#388bfd",
    },
    secondary: {
      main: "#bc8cff",
      light: "rgba(188, 140, 255, 0.15)",
    },
    background: {
      default: "#0d1117",
      paper: "#161b22",
    },
    text: {
      primary: "#e6edf3",
      secondary: "#8b949e",
    },
    divider: "#30363d",
    error: {
      main: "#f85149",
    },
    success: {
      main: "#3fb950",
    },
    warning: {
      main: "#d29922",
    },
    action: {
      hover: "rgba(88, 166, 255, 0.04)",
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.1 },
    h2: { fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.15 },
    h3: { fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.2 },
    h4: { fontWeight: 700, lineHeight: 1.3 },
    h5: { fontWeight: 600, lineHeight: 1.4 },
    h6: { fontWeight: 600, lineHeight: 1.5 },
    subtitle1: { fontWeight: 400, lineHeight: 1.6 },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.5 },
    caption: { lineHeight: 1.5, color: "#8b949e" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 0 20px rgba(88, 166, 255, 0.2)",
          },
        },
        outlined: {
          borderColor: "#30363d",
          "&:hover": {
            borderColor: "#58a6ff",
            backgroundColor: "rgba(88, 166, 255, 0.04)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "& fieldset": {
              borderColor: "#30363d",
            },
            "&:hover fieldset": {
              borderColor: "#58a6ff",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#58a6ff",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#161b22",
          border: "1px solid #30363d",
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 500,
          fontSize: "0.75rem",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#1c2128",
          border: "1px solid #30363d",
          borderRadius: 8,
          fontSize: "0.8rem",
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(88, 166, 255, 0.06)",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: "rgba(88, 166, 255, 0.08)",
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
  },
});

export default theme;
