import React, { Component } from "react";
class MarginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="row mb-5">
        <div className="col-sm" />
        <div className="col-sm" />
        <div className="col-sm" />
      </div>
    );
  }
}

export default MarginBox;
