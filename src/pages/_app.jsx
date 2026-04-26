import "@/styles/globals.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SWRConfig } from "swr";
import { apiClient } from "@/helper/apiClient";
import theme from "@/styles/theme";
import { NotificationProvider } from "@/features/layout/NotificationContext";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <SWRConfig
          value={{
            fetcher: (url) => apiClient({ url, method: "GET" }),
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </NotificationProvider>
    </ThemeProvider>
  );
}
