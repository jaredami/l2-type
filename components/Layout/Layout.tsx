import { useRouter } from "next/router";
import { ReactNode } from "react";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import Nav from "../Nav/Nav";
import styles from "./Layout.module.css";

const getPageTitleFromRoutePath = (pathName: string): string => {
  if (pathName.length < 2) return "";

  let indexOfSecondSlash = pathName.indexOf("/", pathName.indexOf("/") + 1);
  if (indexOfSecondSlash !== -1) {
    pathName = pathName.slice(0, indexOfSecondSlash);
  }

  let pageTitle = pathName.charAt(1).toUpperCase() + pathName.slice(2);
  return pageTitle;
};

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <>
      <Nav />
      <AvatarMenu />
      <h1 style={{ textAlign: "center" }}>
        {getPageTitleFromRoutePath(router.pathname)}
      </h1>
      <main className={styles.layout}>{children}</main>
    </>
  );
}
