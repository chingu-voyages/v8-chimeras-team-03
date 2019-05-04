import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { auth } from "../../components/Firebase/firebase";
import classes from "./SignUpPage.module.scss";

class SignUpPage extends Component {
  state = {
      redirect: false,
      email: "",
      password: "",
      repeatedPassword: "",
      userAgreedToTerms : false
    }

  handleSignUp = async event => {
    if(!this.canBeSubmitted){
      event.preventDefault();
      return;
    }
    const { email, password } = this.state;
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      this.setState({
        redirect: true
      });
    } catch (error) {
      alert(error);
    }
  }
  handleCheckbox = () => {
    this.setState({userAgreedToTerms : !this.state.userAgreedToTerms});
  }
  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  }
  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  }
  handleConfirmPassword = (event) => {
    this.setState({ repeatedPassword: event.target.value });
  }
  canBeSubmitted = () => {
    const { email, password, repeatedPassword, userAgreedToTerms } = this.state;
    return (  email.length > 0 && 
              password.length > 0 && 
              repeatedPassword.length > 0 &&
              password === repeatedPassword && 
              userAgreedToTerms === true
          );
  }
  
  render() {
    const isEnabled = this.canBeSubmitted();
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/"/>
    }
    return (
      <div className={classes.signup}>
        <h1>Let's get started</h1>
        <p>Kickstart your productivity with toggl clone</p>
        <form className={classes.form} onSubmit={this.handleSignUp}>
          <label htmlFor="email">EMAIL ADDRESS</label>
          <input type="email" id="email" onChange={this.handleEmail} value={this.state.email} />
          <label htmlFor="password">SET A PASSWORD</label>
          <input type="password" id="password" onChange={this.handlePassword} value={this.state.password}/>
          <label htmlFor="password">CONFIRM PASSWORD</label>
          <input type="password" id="confirmPassword" onChange={this.handleConfirmPassword} value={this.state.repeatedPassword}/>
          <div><input type="checkbox" onChange={this.handleCheckbox} id="checkbox" value={this.state.userAgreedToTerms} /> <p>Accept the terms</p></div>
          <button className={classes['sign-up-btn']} type="submit" disabled={!isEnabled}>
            SIGN UP FOR FREE <span />
          </button>
          <button className={classes['sign-up-google-btn']} >
            SIGN UP WITH GOOGLE
            <span />
          </button>
        </form>
        <p className={classes['no-acc']}>Already signed Up?</p>
        <button className={classes['sign-up-google-btn']}>
          <Link to="/login">
             Login here<span />
          </Link>
        </button>
      </div>
    )
  }
}
export default SignUpPage;
