import React from "react";
import App from "./App";
import { myFetch } from "./utils/helper";
import Enzyme, { shallow, configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  mount(<App />);
});

beforeAll(() => {
  global.fetch = jest.fn();
  //window.fetch = jest.fn(); utilizar este para correr en ambiente browser
});

let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />, { disableLifecycleMethods: true });
});

afterEach(() => {
  wrapper.unmount();
});

it("must render a loading title before api call success", () => {
  expect(wrapper.find("h3").exists()).toBeTruthy();
});

it("must show the ranges and hide the loading title after api call success", (done) => {
  const spyDidMount = jest.spyOn(App.prototype, "componentDidMount");
  fetch.mockImplementation(() => {
    return Promise.resolve({
      status: 200,
      json: () => {
        return Promise.resolve({
          min: 1,
          max: 100,
        });
      },
    });
  });
  const didMount = wrapper.instance().componentDidMount();
  expect(spyDidMount).toHaveBeenCalled();

  didMount.then(() => {
    wrapper.update();
    expect(wrapper.find("h3").length).toBe(0);
    expect(wrapper.find("div.app-container").length).toBe(1);
    spyDidMount.mockRestore();
    fetch.mockClear();
    done();
  });
});

// describe("Range render correctly", () => {
//   it("renders two ranges ready to be used", () => {
//     const wrapper = shallow(<App />);
//     const element = wrapper.find("Range");
//     expect(element.length).toBe(2);
//   });
// });

// describe("Links render correctly", () => {
//   it("renders two links", () => {
//     const wrapper = shallow(<App />);
//     const element = wrapper.find("Link");
//     expect(element.length).toBe(2);
//   });
// });
