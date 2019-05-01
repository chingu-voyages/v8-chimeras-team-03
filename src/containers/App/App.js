import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./App.scss";
import LandingPage from "../../components/LandingPage/LandingPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import LoginPage from "../LoginPage/LoginPage";
import Header from "../../components/Header/Header";
import DropDown from "../../components/DropDown/DropDown";
import { auth } from '../../components/Firebase/firebase'

class App extends Component {
  state = {
    dropDown: false,
    isUserLogged: false
  };
  componentWillMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isUserLogged: true
        })
      }
      else {
        this.setState({
          isUserLogged: false
        });
      }
    })
  }
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
              <Route path="/" component={DashboardPage} />
            </Switch>
          </div>
        ) : (
          <div>
            <Header showDropDown={showDropDown} />
            <Switch>
              <Redirect
                from="/dashboard"
                to="/"
                render={() => <LandingPage />}
              />
              <Route exact path="/signup" component={SignUpPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route path="/" component={LandingPage} />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);
