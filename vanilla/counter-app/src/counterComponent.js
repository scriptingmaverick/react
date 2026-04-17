import React from "https://esm.sh/react@19";

export default class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };

    this.stepCount = 1;
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
    this.setStepCount = this.setStepCount.bind(this);
  }

  increment() {
    this.setState({
      count: this.state.count + this.stepCount,
    });
  }

  decrement() {
    this.setState({
      count: this.state.count - this.stepCount,
    });
  }

  reset() {
    this.setState({
      count: 0,
    });
  }

  setStepCount() {
    const stepCount = prompt("Enter step count: ");

    this.stepCount = Number(stepCount);
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "p",
        null,
        `${this.props.name} : ${this.state.count}`,
      ),
      React.createElement("button", { onClick: this.increment }, "increment"),
      React.createElement("button", { onClick: this.decrement }, "decrement"),
      React.createElement("button", { onClick: this.reset }, "reset"),
      React.createElement(
        "button",
        { onClick: this.setStepCount },
        "set step count",
      ),
    );
  }
}
