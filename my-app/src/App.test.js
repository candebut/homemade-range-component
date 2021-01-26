import React from "react";
import App from "./App";
import { myFetch } from "./utils/helper";
import { shallow, configure, mount } from "enzyme";
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

it("api call success", (done) => {
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
  fetch.mockImplementation(() => {
    return Promise.resolve({
      status: 200,
      json: () => {
        return Promise.resolve({
          rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
        });
      },
    });
  });
  const didMount = wrapper.instance().componentDidMount();
  expect(spyDidMount).toHaveBeenCalled();

  didMount.then(() => {
    wrapper.update();
    expect(wrapper.find("loading").length).toBe(0);
    spyDidMount.mockRestore();
    fetch.mockClear();
    done();
  });
});

describe("Range doesnt render until data is loaded", () => {
  it("range rendering waits until fetch finishes working", () => {
    const wrapper = shallow(<App loading={true} />);
    const element = wrapper.find("Range");
    expect(element.length).toBe(0);
  });
});

describe("Links dont render until data is loaded", () => {
  it("links rendering waits until fetch finishes working", () => {
    const wrapper = shallow(<App loading={true} />);
    const element = wrapper.find("Link");
    expect(element.length).toBe(0);
  });
});

describe("Components get rendered when fetch is finished", () => {
  it("should render the Links and Ranges if state.loading is false", () => {
    const AppComponent = shallow(<App />);
    AppComponent.setState({ loading: false });
    expect(AppComponent.find("div.app-container").length).toBe(1);
  });
});
