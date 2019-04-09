import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./SignUpPage.module.scss";

class SignUpPage extends Component {
  state = {
    email: "",
    password: "",
    country: "",
    userAgreedToTerms : false
  }

  handleCheckbox = () => {
    this.setState({userAgreedToTerms : !this.state.userAgreedToTerms});
  }
  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  }
  handleCountry = (event) => {
    this.setState({ country: event.target.value });
  }
  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  }
  handleSubmit = (event) => {
    if(!this.canBeSubmitted){
      event.preventDefault();
      return;
    }else{
    const {email, password, country, userAgreedToTerms} = this.state;
    alert(`Signed up with email: ${email} password: ${password} country: ${country} termsAgreed: ${userAgreedToTerms}`)
    }
  }
  canBeSubmitted = () => {
    const { email, password, country, userAgreedToTerms } = this.state;
    return (  email.length > 0 && 
              password.length > 0 && 
              country.length > 0 && 
              userAgreedToTerms === true
          );
  }

  render() {
    const isEnabled = this.canBeSubmitted();
    return (
      <div className={classes.signup}>
        <h1>Let's get started</h1>
        <p>Kickstart your productivity with toggl clone</p>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <label htmlFor="email">EMAIL ADDRESS</label>
          <input type="email" id="email" onChange={this.handleEmail} value={this.state.email} />
          <label htmlFor="password">SET A PASSWORD</label>
          <input type="password" id="password" onChange={this.handlePassword} value={this.state.password}/>
          <label htmlFor="country">COUNTRY</label>
          <input type="country" id="country" onChange={this.handleCountry} value={this.state.country}/>
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
