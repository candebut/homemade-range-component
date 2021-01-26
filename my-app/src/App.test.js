import React from "react";
import App from "./App";
import Enzyme, { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("App rendering test", () => {
  // const location = { name: "Massage Room" };
  it("App renders with the correct structure", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Router").length).toBe(1);
  });
});
