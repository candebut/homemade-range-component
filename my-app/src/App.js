import React from "react";
import Range from "./components/Range.js";
import "./App.css";
import { myFetch } from "./utils/helper";

class App extends React.Component {
  state = {
    min: 0,
    max: 0,
    slots: 0,
    start: 10,
    end: 20,
    loading: true,
  };

  async componentDidMount() {
    try {
      const response = await myFetch("minmaxvalues");
      this.setState({
        min: response.min,
        slots: response.max,
        max: response.max,
        loading: false,
      });
    } catch (error) {
      alert("Hubo un error. Intente nuevamente.");
    }
  }
  render() {
    return (
      <>
        {this.state.loading ? (
          "Cargando..."
        ) : (
          <div className="app-container">
            <h2>React Slider</h2>
            <Range
              min={this.state.min}
              max={this.state.max}
              slots={this.state.slots}
              start={this.state.start}
              end={this.state.end}
              labelMode={this.state.labelMode}
            />
          </div>
        )}
      </>
    );
  }
}
export default App;
