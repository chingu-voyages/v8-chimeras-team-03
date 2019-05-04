import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./LoginPage.scss";
import { auth, provider } from "../../components/Firebase/firebase";

class LoginPage extends Component {
  constructor() {
    super();
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleGoogleLogIn = this.handleGoogleLogIn.bind(this);
    this.state = {
      redirect: false
    };
  }
  handleLogIn = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await auth.signInWithEmailAndPassword(email.value, password.value);
      localStorage.setItem("IsLogged", true);
      this.setState({
        redirect: true
      });
    } catch (error) {
      alert(error);
    }
  };
  handleGoogleLogIn = async event => {
    event.preventDefault();
    try {
      await auth.signInWithPopup(provider);
      localStorage.setItem("isLogged", true);
      this.setState({
        redirect: true
      });
    } catch (error) {
      alert(error);
    }
  };
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="login">
        <h1>Get tracking</h1>
        <p>Log in to your Toggl account.</p>
        <form onSubmit={this.handleLogIn} className="form">
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
          <button
            onClick={this.handleGoogleLogIn}
            className="log-in-google-btn"
          >
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
