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
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="angle-double-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
            >
              <g className="fa-group">
                <path
                  fill="currentColor"
                  d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                  className="fa-secondary"
                ></path>
                <path
                  fill="currentColor"
                  d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                  className="fa-primary"
                ></path>
              </g>
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
