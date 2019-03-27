import React, { Component } from "react";
import "./LoginPage.scss";
import Header from "../../components/Header/Header";
class LoginPage extends Component {
  render() {
    return (
      <div className="login">
        <div className="green">
          <Header />
          <div className="title">
            <h1>Get tracking</h1>
            <p>Log in to your Toggl account.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
