import Head from "next/head";
import SettingsControls from "../components/SettingsControls/SettingsControls";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings - L2Type</title>
      </Head>
      <h1>Settings</h1>
      <SettingsControls />
    </>
  );
}
