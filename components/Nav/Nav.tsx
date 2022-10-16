import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem/NavItem";

const MENU = [
  { text: "Home", href: "/" },
  { text: "Practice", href: "/practice" },
  { text: "Settings", href: "/settings" },
];

const Nav = () => {
  const [navActive, setNavActive] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>
          <a>
            <h1 className="logo">L2Type</h1>
          </a>
        </Link>
        {/* <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div> */}
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
