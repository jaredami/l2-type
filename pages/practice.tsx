import Head from "next/head";
import Link from "next/link";
import Keyboard from "../components/Keyboard/Keyboard";

export default function Practice() {
  return (
    <>
      <Head>
        <title>Practice - L2 Type</title>
      </Head>
      <h1>Practice</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      <Keyboard></Keyboard>
    </>
  );
}