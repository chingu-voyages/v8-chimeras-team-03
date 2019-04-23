import React from "react";
import LoginPage from "./LoginPage";
import { render, shallow, mount } from "enzyme";
import { HashRouter, Link, MemoryRouter } from "react-router-dom";

it("renders <LoginPage/>", () => {
  const wrapper = render(
    <HashRouter>
      <LoginPage />
    </HashRouter>
  );
  expect(wrapper.find(".form").length).toBe(1);
});

it("checks if input if empty first time it renders", () => {
  const wrapper = shallow(
    <HashRouter>
      <LoginPage />
    </HashRouter>
  );
  expect(wrapper.find("#password").val).toEqual(undefined);
});

it("renders without crashing", () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});
