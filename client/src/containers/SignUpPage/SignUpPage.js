import React, { Component } from "react";
import "./SignUpPage.scss";
import { Redirect } from "react-router";
import { auth } from "../../components/Firebase/firebase";

class SignUpPage extends Component {
  constructor() {
    super();
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {
      redirect: false
    }
  }
  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await auth.createUserWithEmailAndPassword(email.value, password.value);
      this.setState({
        redirect: true
      });
    } catch (error) {
      alert(error);
    }
  }
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/"/>
    }
    return <div>SignUp Page</div>;
  }
}

export default SignUpPage;
