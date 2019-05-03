import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./LoginPage.scss";
import { auth, provider } from "../../components/Firebase/firebase";

class LoginPage extends Component {
  state = {
    redirect: false,
    email: false,
    password: false
  };

  handleLogIn = async event => {
    if (!this.canBeSubmitted) {
      event.preventDefault();
      return;
    }
    const { email, password } = event.target.elements;
    try {
      await auth.signInWithEmailAndPassword(email.value, password.value);
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
      this.setState({
        redirect: true
      });
    } catch (error) {
      alert(error);
    }
  };
  handleEmail = event => {
    event.target.value
      ? this.setState({ email: true })
      : this.setState({ email: false });
  };
  handlePassword = event => {
    event.target.value
      ? this.setState({ password: true })
      : this.setState({ password: false });
  };
  canBeSubmitted = () => {
    const { email, password } = this.state;
    return email && password;
  };

  render() {
    const { redirect } = this.state;
    const isEnabled = this.canBeSubmitted();
    if (redirect) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="login">
        <h1>Get tracking</h1>
        <p>Log in to your Toggl account.</p>
        <form onSubmit={this.handleLogIn} className="form">
          <label htmlFor="email">EMAIL ADDRESS</label>
          <input type="email" id="email" onChange={this.handleEmail} />
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            onChange={this.handlePassword}
          />
          <p>Forgot password?</p>
          <button className="log-in-btn" disabled={!isEnabled}>
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
