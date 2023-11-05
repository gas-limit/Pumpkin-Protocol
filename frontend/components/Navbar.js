import React, { useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const Navbar = () => {
  useEffect(() => {}, []);
  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Link href="/" className="nav__logo">
          <p>
            <img
              src="https://aux2.iconspalace.com/uploads/pumpkin-icon-256-169712166.png"
              className="pumpkin_icon"
            />
            Pumpkin Index
          </p>
        </Link>
        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            {/* <li className="nav__item">
              <Link href="/view-tokens" className="nav__link">
                Explore
              </Link>
            </li> */}
            <li className="nav__item">
              <Link href="/about" className="nav__link">
                About
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/mint-underlying" className="nav__link">
                Utility Faucet
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/view-tokens" className="nav__link">
                My Tokens
              </Link>
            </li>

            {/* <a href="#" className="button button--ghost">
              Support
            </a> */}
            <ConnectButton
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
            />
          </ul>
          <div className="nav__close" id="nav-close">
            <i className="bx bx-x"></i>
          </div>
          <img
            src="https://assets.codepen.io/7773162/nav-img.png"
            alt=""
            className="nav__img"
          />
        </div>
        <div className="nav__toggle" id="nav-toggle">
          <i className="bx bx-grid-alt"></i>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
