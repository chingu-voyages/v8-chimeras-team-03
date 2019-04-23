import React from "react";
import { shallow } from "enzyme";
import DashboardPage from "./DashboardPage";

it("should render without crashing", () => {
  const wrapper = shallow(<DashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
