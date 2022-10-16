import { ReactNode } from "react";
import Nav from "./Nav/Nav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
}
