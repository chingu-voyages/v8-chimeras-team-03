import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./App.scss";
import LandingPage from "../../components/LandingPage/LandingPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import LoginPage from "../LoginPage/LoginPage";
import Header from "../../components/Header/Header";
import DropDown from "../../components/DropDown/DropDown";
import { auth, provider } from "../../components/Firebase/firebase";


class App extends Component {
  constructor(){
    super();
    this.logout = this.logout.bind(this); // <-- add this line
    this.state = {
      dropDown: false,
      user: false
    }
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }
  // state = {
  //   dropDown: false,
  //   isUserLogged: false
  // };

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: false
      });
    });
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
    const { user } = this.state;
    const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
      return (
        React.createElement(component, finalProps)
      );
    }

    const PropsRoute = ({ component, ...rest }) => {
      return (
        <Route {...rest} render={routeProps => {
          return renderMergedProps(component, routeProps, rest);
        }}/>
      );
    }

    return (

      <div>
        <div className="wrapper">
          {this.state.user ?
            <div>
            <h2>{this.state.user.displayName}</h2>
            <button onClick={this.logout}>Log Out</button>
            </div>
            :
            <div></div>
          }
        </div>
        {this.state.dropDown ? (
          <DropDown hideDropDown={hideDropDown} />
        ) : user ? (
          <div>
            <Switch>
              <PropsRoute path="/" component={DashboardPage} user={this.state.user}/>
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
