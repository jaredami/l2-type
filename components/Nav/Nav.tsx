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
          {MENU.map((item, idx) => (
            <NavItem active={activeIdx === idx} {...item} key={item.text} />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
