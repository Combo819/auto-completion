import React, { Component } from "react";
class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="tag mx-2 py-1">
        <div className="tag-inner pl-1 dropdown">
          <div className="tag-text mx-1">More</div>
          <div id="dropdownMenuButton" className="tag-text mx-1 cursor"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="material-icons mt-1">keyboard_arrow_down</i>
          </div>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {
                this.props.tags.map((item,key)=>item.fold?<span className="dropdown-item" key={key}>{item.text}</span>:false)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DropDown;
