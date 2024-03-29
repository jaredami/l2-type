import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import AuthWrapper from "../components/AuthWrapper/AuthWrapper";
import Layout from "../components/Layout/Layout";
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
      <AuthWrapper>
        <Layout>
          <StatsProvider>
            <Component {...pageProps} />
          </StatsProvider>
        </Layout>
      </AuthWrapper>
    </SessionProvider>
  );
}

export default MyApp;
