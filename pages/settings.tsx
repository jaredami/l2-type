import Link from "next/link";
import Head from "next/head";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings - L2 Type</title>
      </Head>
      <h1>Settings</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}
