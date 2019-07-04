import React, { Component } from "react";

class TagItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        colors:['#ff7875','#ff9c6e','#ffc069','#ffd666','#fff566','#d3f261','#95de64','#5cdbd3','#69c0ff','#85a5ff','#b37feb','#ff85c0']
    };
  }


  render() {
     
      
    return (
      <div  className="tag mx-2 py-1">
        <div style={{backgroundColor:this.state.colors[this.props.index%this.state.colors.length]}} className="tag-inner pl-1">
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
