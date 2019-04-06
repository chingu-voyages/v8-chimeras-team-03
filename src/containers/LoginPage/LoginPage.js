import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.scss";
import { auth, provider } from "../../components/Firebase/firebase";
import { Redirect } from "react-router-dom";
import App from "../App/App";

class LoginPage extends Component {
  constructor(){
    super();
    this.login = this.login.bind(this);
    this.state = {
      user: null
    }
  }
  login() {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });

  }
  render() {
    return (

      <div className="login">
        {this.state.user ?
        <Redirect
          from="/LoginPage"
          to="/"
          render={() => <App user={this.state.user}/>}
        />
      :
      <div></div>
    }
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
          <button onClick={this.login} className="log-in-google-btn">
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
