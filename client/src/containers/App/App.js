import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.scss";
import LandingPage from "../../components/LandingPage/LandingPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import LoginPage from "../LoginPage/LoginPage";
import Header from "../../components/Header/Header";
import DropDown from "../../components/DropDown/DropDown";

class App extends Component {
  state = {
    dropDown: false,
    isUserLogged: true
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
    const { isUserLogged } = this.state;
    return (
      <div>
        {this.state.dropDown ? (
          <DropDown hideDropDown={hideDropDown} />
        ) : isUserLogged ? (
          <div>
            <Switch>
              <Route exact path="/dashboard" component={DashboardPage} />
              <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
          </div>
        ) : (
          <div>
            <Header showDropDown={showDropDown} />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/signup" component={SignUpPage} />
              <Route exact path="/login" component={LoginPage} />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);
