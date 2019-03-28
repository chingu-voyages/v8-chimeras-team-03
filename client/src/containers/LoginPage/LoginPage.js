import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.scss";

class LoginPage extends Component {
  render() {
    return (
      <div className="login">
        <h1>Get tracking</h1>
        <p>Log in to your Toggl account.</p>
        <form className="form">
          <label htmlFor="email">EMAIL ADDRESS</label>
          <input type="email" id="email" />
          <label htmlFor="password">PASSWORD</label>
          <input type="password" id="password" />
          <p>Forgot password?</p>
          <button className="log-in-btn">
            LOG IN <span />
          </button>
          <div className="or">
            <div className="hr" />
            <p>OR</p>
            <div className="hr" />
          </div>
          <button className="log-in-google-btn">
            LOG IN WITH GOOGLE
            <span />
          </button>
        </form>
        <p className="no-acc">Don't have an account?</p>
        <button>
          <Link to="/signup">
            SIGN UP FOR FREE <span />
          </Link>
        </button>
      </div>
    );
  }
}

export default LoginPage;
