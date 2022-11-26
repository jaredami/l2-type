import { ReactNode } from "react";
import Nav from "../Nav/Nav";
import styles from "./Layout.module.css";
import { signIn, useSession } from "next-auth/react";

export default function Layout({ children }: { children: ReactNode }) {
  const { data, status } = useSession();

  const handleSignIn = async () => {
    await signIn("github", {
      callbackUrl: "http://localhost:3000/practice",
    });
  };

  return (
    <>
      <Nav />
      <button
        style={{
          right: 0,
          position: "absolute",
        }}
        onClick={handleSignIn}
      >
        Sign In
      </button>
      <main className={styles.layout}>{children}</main>
    </>
  );
}
