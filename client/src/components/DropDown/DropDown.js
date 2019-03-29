import React from "react";
import logo from "../../assets/Group 10@2x.png";
import { Link } from "react-router-dom";
import "./DropDown.scss";

export default function DropDown(props) {
  const { hideDropDown } = props;
  return (
    <div>
      <div className="drop-down-header">
        <div className="logo">
          <img src={logo} alt="" />
          <h1>toggl clone</h1>
        </div>
        <span onClick={hideDropDown}>X</span>
      </div>
      <div className="drop-down-menu">
        <ul>
          <li>
            <Link onClick={hideDropDown} to="#">
              Features
            </Link>
          </li>
          <hr />
          <li>
            <Link onClick={hideDropDown} to="#">
              Pricing
            </Link>
          </li>
          <hr />
          <li>
            <Link onClick={hideDropDown} to="#">
              Training
            </Link>
          </li>
          <hr />
          <li>
            <Link onClick={hideDropDown} to="/login">
              Log in
            </Link>
          </li>
          <hr />
          <li>
            <Link onClick={hideDropDown} to="/signup">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
