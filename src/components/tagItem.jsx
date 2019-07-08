import React, { Component } from "react";

class TagItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="tag mx-2 py-1">
        <div
          style={{ backgroundColor: this.props.color }}
          className="tag-inner pl-1"
        >
          <div className="tag-text mx-1">{this.props.text}</div>
          <div className="tag-text mx-1">+</div>
          <div onClick={this.props.crossClick} className="tag-text mx-1 cursor">
            &times;
          </div>
        </div>
      </div>
    );
  }
}

export default TagItem;
