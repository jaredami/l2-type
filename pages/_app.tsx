import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import "../styles/design_tokens.css";
import "../styles/keyboard.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;