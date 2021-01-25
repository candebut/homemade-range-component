import React from "react";
import Range from "./components/Range.js";
import "./App.css";
import { myFetch } from "./utils/helper";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  state = {
    min: 0,
    max: 0,
    slots: 0,
    start: 2,
    end: 6,
    loading: true,
    fixed: false,
    fixedValues: [],
  };

  async componentDidMount() {
    try {
      const response = await myFetch("minmaxvalues");
      const fixedResponse = await myFetch("rangevalues");
      this.setState({
        min: response.min,
        slots: response.max,
        max: response.max,
        fixedValues: fixedResponse.rangeValues,
        loading: false,
      });
    } catch (error) {
      alert("Hubo un error. Intente nuevamente.");
    }
  }
  render() {
    return (
      <>
        <Router>
          {this.state.loading ? (
            "Cargando..."
          ) : (
            <div className="app-container">
              <h2>Mango Range Component</h2>

              <Link to="/exercise1">Exercise 1</Link>
              <Link to="/exercise2">Exercise 2</Link>

              <Switch>
                <Route path="/exercise1">
                  <Range
                    min={this.state.min}
                    max={this.state.max}
                    slots={this.state.slots}
                    start={this.state.start}
                    end={this.state.end}
                    labelMode={this.state.labelMode}
                    fixed={false}
                  />
                </Route>

                <Route path="/exercise2">
                  <Range
                    min={this.state.fixedValues[0]}
                    max={
                      this.state.fixedValues[this.state.fixedValues.length - 1]
                    }
                    slots={this.state.fixedValues.length}
                    start={this.state.fixedValues[0]}
                    end={
                      this.state.fixedValues[this.state.fixedValues.length - 1]
                    }
                    labelMode={this.state.labelMode}
                    fixed={true}
                    fixedValues={this.state.fixedValues}
                  />
                </Route>
              </Switch>
            </div>
          )}
        </Router>
      </>
    );
  }
}
export default App;
