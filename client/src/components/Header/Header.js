import React from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import logo from "../../assets/Group 10@2x.png";
import "./Header.scss";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>toggl clone</h1>
      </div>
      <HamburgerMenu />
      <div className="nav">
        <ul>
          <li>Features</li>
          <li>Pricing</li>
          <li>Training</li>
          <li>Log in</li>
          <li>Sign up</li>
        </ul>
      </div>
    </div>
  );
}
