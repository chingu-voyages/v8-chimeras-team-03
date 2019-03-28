import React from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { Link } from "react-router-dom";
import logo from "../../assets/Group 10@2x.png";
import "./Header.scss";

export default function Header(props) {
  const { showDropDown } = props;
  return (
    <div className="header">
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h1>toggl clone</h1>
        </div>
      </Link>
      <HamburgerMenu showDropDown={showDropDown} />
      <div className="nav">
        <ul>
          <li>
            <Link to="#">Features</Link>
          </li>
          <li>
            <Link to="#">Pricing</Link>
          </li>
          <li>
            <Link to="#">Training</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
