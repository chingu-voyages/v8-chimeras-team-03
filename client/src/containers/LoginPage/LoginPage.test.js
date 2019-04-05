import React from "react";
import LoginPage from "./LoginPage";
import { render } from "enzyme";

it("renders <LoginPage/>", ()=>{
   const wrapper = render(<LoginPage/>);
   expect(wrapper.contains("<form/>")).toEqual(true)
})