import React from "react";
import "./HamburgerMenu.scss";

export default function HamburgerMenu(props) {
  const { showDropDown } = props;
  return (
    <div className="hamburger-menu" onClick={showDropDown}>
      <div />
      <div />
    </div>
  );
}
