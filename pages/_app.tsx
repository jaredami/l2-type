import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import "../styles/design_tokens.css";
import "../styles/keyboard.css";
import { SettingsProvider } from "../contexts/SettingsContext";
import { StatsProvider } from "../contexts/StatsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <SettingsProvider>
        <StatsProvider>
          <Component {...pageProps} />
        </StatsProvider>
      </SettingsProvider>
    </Layout>
  );
}

export default MyApp;
