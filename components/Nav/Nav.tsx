import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem/NavItem";
import styles from "./Nav.module.css";

const MENU = [
  { text: "Home", href: "/" },
  { text: "Practice", href: "/practice" },
  { text: "Settings", href: "/settings" },
];

const Nav = () => {
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={styles.nav}>
        <Link href={"/"}>
          <a>
            <h1 className="logo">L2Type</h1>
          </a>
        </Link>
        <ul className={styles.navList}>
          {MENU.map((item, idx) => (
            <NavItem active={activeIdx === idx} {...item} key={item.text} />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
