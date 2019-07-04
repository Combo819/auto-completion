import React, { Component } from "react";
import TagItem from "./tagItem";
class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [
        "#ff7875",
        "#ff9c6e",
        "#ffc069",
        "#ffd666",
        "#fff566",
        "#d3f261",
        "#95de64",
        "#5cdbd3",
        "#69c0ff",
        "#85a5ff",
        "#b37feb",
        "#ff85c0"
      ]
    };
  }
  render() {
    return (
      <div className="tag mx-2 py-1">
        <div
          style={{ backgroundColor: "#595959" }}
          className="tag-inner pl-1 dropdown"
        >
          <div className="tag-text mx-1">More</div>
          <div
            id="dropdownMenuButton"
            className="tag-text mx-1 cursor"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="material-icons mt-1">keyboard_arrow_down</i>
          </div>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {//this.props.tags.map((item,key)=>item.fold?<span className="dropdown-item" key={key}>{item.text}</span>:false)
            this.props.tags.map((item, key) =>
              item.fold ? (
                <TagItem
                  index={key}
                  crossClick={() => this.props.deleteTag(key)}
                  key={key}
                  text={item.text}
                />
              ) : (
                false
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default DropDown;
