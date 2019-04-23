import React from "react";
import { shallow } from "enzyme";
import DropDown from "./DropDown";

it("should render without crashing", () => {
  const wrapper = shallow(<DropDown />);
  expect(wrapper).toMatchSnapshot();
});
