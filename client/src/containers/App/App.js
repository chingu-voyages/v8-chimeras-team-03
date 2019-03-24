import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";
import "./App.scss";
import LandingPage from "../../components/LandingPage/LandingPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import LoginPage from "../LoginPage/LoginPage";

class App extends Component {
  render() {

    return (
    <div>

      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/signup" component={SignUpPage}/>
        <Route exact path="/dashboard" component={DashboardPage}/>
        <Route exact path="/login" component={LoginPage}/>
      </Switch>
    </div>
    );

  }
}

export default App;
