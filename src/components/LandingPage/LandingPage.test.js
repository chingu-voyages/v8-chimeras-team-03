import React from "react";
import { shallow, mount } from "enzyme";
import LandingPage from "./LandingPage";

it("should render without crashing", () => {
  const wrapper = mount(<LandingPage />);
  expect(wrapper).toMatchSnapshot();
});
