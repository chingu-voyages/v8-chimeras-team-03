import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter, Link } from "react-router-dom";
import { mount, render, shallow } from "enzyme";
import { wrap } from "module";
import LandingPage from "../../components/LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <HashRouter>
      <App />,
    </HashRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Checks if the state is changing", () => {
  const wrapper = shallow(<App />);

  expect(wrapper.state("isUserLogged")).toEqual(false);

  wrapper.setState({ isUserLogged: true });

  expect(wrapper.state("isUserLogged")).toEqual(true);
});

it("check if sign up button navigates to signup page", () => {
  const wrapper = mount(
    <HashRouter>
      <App />
    </HashRouter>
  );

  // go to login page
  // press sign up button
  // check current url

  const button = wrapper.find("#_log-in");
  //expect(wrapper.find("#_log-in").length).toBe(1);

  expect(wrapper.find(LoginPage).props.match.params.id).toEqual(true);
  button.at(1).simulate("click");
  expect(wrapper.contains(LoginPage)).toEqual(true);
  expect(wrapper.contains(LandingPage)).toEqual(true);
  wrapper.unmount();
});
