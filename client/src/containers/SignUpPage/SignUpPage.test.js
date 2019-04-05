import React from "react";
import SignUpPage from "./SignUpPage";
import { shallow } from "enzyme";

it("renders <SingUpPage/>", ()=>{
   const wrapper = shallow(<SignUpPage/>);
   expect(wrapper.text("SignUp Page")).toEqual("SignUp Page");
})