import React from "react";
import EditableBox from "./EditableBox";
import Enzyme, { shallow, configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  mount(<EditableBox />);
});
