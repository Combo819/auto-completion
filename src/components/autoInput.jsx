import React, { Component } from "react";
import { AutoComplete } from "antd";
class AutoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ["a", "abc", "abcd"]
    };
  }

  handleSearch = value => {
    this.setState({
      //dataSource: !value ? [] : [value, value + value, value + value + value]
      
      
    });
  };

  onSelect = value => {
    console.log("onSelect", value);
  };

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        placeholder="input here"
      />
    );
  }
}

export default AutoInput;
