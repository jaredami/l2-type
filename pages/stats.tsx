import Head from "next/head";
import StatsPanel from "../components/StatsPanel/StatsPanel";

export default function Stats() {
  return (
    <>
      <Head>
        <title>Stats - L2Type</title>
      </Head>
      <h1>Stats</h1>
      <StatsPanel />
    </>
  );
}
