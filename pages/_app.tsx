import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import "../styles/design_tokens.css";
import "../styles/keyboard.css";
import { SettingsProvider } from "../contexts/SettingsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <SettingsProvider>
        <Component {...pageProps} />
      </SettingsProvider>
    </Layout>
  );
}

export default MyApp;
