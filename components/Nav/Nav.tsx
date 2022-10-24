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
          <li className={[styles.logo, styles.navLink].join(" ")}>
            <span className={[styles.linkText, styles.logoText].join(" ")}>
              L2Type
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </li>
        </Link>
        <ul className={styles.navList}>
          {/* {MENU.map((item, idx) => (
            <NavItem active={activeIdx === idx} {...item} key={item.text} />
          ))} */}
          <li className={styles.navItem}>
            <Link href={MENU[1].href}>
              <a href="#" className={styles.navLink}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
                <span className={styles.linkText}>{MENU[1].text}</span>
              </a>
            </Link>
            <Link href={MENU[2].href}>
              <a href="#" className={styles.navLink}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
                <span className={styles.linkText}>{MENU[2].text}</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
