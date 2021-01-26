import React from "react";
import Range from "./Range";
import EditableBox from "./EditableBox";
import Enzyme, { shallow, configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  mount(<Range />);
});

describe("Elements render when component gets the data", () => {
  it("when values are filled, component renders", () => {
    const RangeComponent = shallow(<Range />);
    RangeComponent.setState({ min: 1, max: 100 });
    expect(RangeComponent.find("div.container").length).toBe(1);
  });
});

describe("min EditableBox renders", () => {
  it("it renders with an input ready to be filled", () => {
    const wrapper = mount(<Range />);
    const element = wrapper.find("#min-box");
    expect(element.length).toBe(2);
  });
});

describe("max EditableBox renders", () => {
  it("it renders with an input ready to be filled", () => {
    const wrapper = mount(<Range />);
    const element = wrapper.find("#max-box");
    expect(element.length).toBe(2);
  });
});

describe("range elements render correctly", () => {
  it("it renders with an input ready to be filled", () => {
    const wrapper = mount(<Range />);
    const element = wrapper.find("div.range-container");
    expect(element.length).toBe(1);
  });
});

describe("Fixed range works properly with props", () => {
  it("Fixed range components renders with its two bullets", () => {
    mount(
      <Range
        fixed={true}
        min={1.99}
        max={70.99}
        slots={6}
        start={1.99}
        end={70.99}
        fixedValues={[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]}
      />
    );
  });
});

describe("Range works properly with props", () => {
  it("Range components renders with its two bullets", () => {
    mount(
      <Range fixed={false} min={1} max={100} slots={100} start={1} end={100} />
    );
  });
});
