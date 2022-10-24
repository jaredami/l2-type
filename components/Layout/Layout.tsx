import { ReactNode } from "react";
import Nav from "../Nav/Nav";
import styles from "./Layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className={styles.layout}>{children}</main>
    </>
  );
}
