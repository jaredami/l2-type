import { ReactNode } from "react";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import Nav from "../Nav/Nav";
import styles from "./Layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <AvatarMenu />
      <main className={styles.layout}>{children}</main>
    </>
  );
}
