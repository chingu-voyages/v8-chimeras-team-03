import React from "react";
import { shallow } from "enzyme";
import HamburgerMenu from "./HamburgerMenu";

it("should render without crashing", () => {
  const wrapper = shallow(<HamburgerMenu />);
  expect(wrapper).toMatchSnapshot();
});
