import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { SettingsProvider } from "../contexts/SettingsContext";
import { StatsProvider } from "../contexts/StatsContext";
import "../styles/design_tokens.css";
import "../styles/globals.css";
import "../styles/keyboard.css";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <SettingsProvider>
          <StatsProvider>
            <Component {...pageProps} />
          </StatsProvider>
        </SettingsProvider>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
