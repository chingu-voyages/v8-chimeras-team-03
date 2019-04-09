import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import LandingPage from "../../components/LandingPage/LandingPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import LoginPage from "../LoginPage/LoginPage";
import Header from "../../components/Header/Header";
import DropDown from "../../components/DropDown/DropDown";

class App extends Component {
  state = {
    dropDown: false
  };

  showDropDown = () => {
    this.setState({
      dropDown: true
    });
  };

  hideDropDown = () => {
    this.setState({
      dropDown: false
    });
  };
  render() {
    const { showDropDown, hideDropDown } = this;
    return (
      <div>
        {this.state.dropDown ? (
          <DropDown hideDropDown={hideDropDown} />
        ) : (
          <div ref="parent">
            <Header showDropDown={showDropDown} />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/signup" component={SignUpPage} />
              <Route exact path="/dashboard" component={DashboardPage} />
              <Route exact path="/login" component={LoginPage} />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default App;
