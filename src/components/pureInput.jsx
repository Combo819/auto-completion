import React, { Component } from "react";
import TagItem from "./tagItem";
import DropDown from "./dropDown";
class PureInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        {
          text: "hello",
          fold: false
        },
        {
          text: "hi",
          fold: false
        }
      ],
      inputValue: "",
      moreShow: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.getTagsWidth = this.getTagsWidth.bind(this);
  }

  deleteTag(index) {
    const newTags = [...this.state.tags];
    console.log(index);

    if (!newTags[index].fold) {
      const foldIndex = newTags.findIndex(item => {
        return item.fold;
      });
      if (foldIndex !== -1) {
        newTags[foldIndex].fold = false;
      }
    }
    newTags.splice(index, 1);
    console.log(newTags);
    this.setState(
      {
        tags: newTags,
        moreShow: this.state.tags.findIndex(item => item.fold === true) !== -1
      },
      () => {
        this.setPadding();
      }
    );
  }

  setPadding() {
    const inputMask = document.getElementById("inputMask");
    const width = window.getComputedStyle(inputMask).getPropertyValue("width");
    const inputItem = document.getElementById("inputItem");
    inputItem.style.paddingLeft = width;
    console.log(width);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  componentDidMount() {
    this.setPadding();
  }

  getTagsWidth(inputValue) {
    const totalTags = this.state.tags.filter(item => !item.fold).length;
    const totalString =
      totalTags !== 0
        ? this.state.tags.reduce((pre, next) => pre.text + next.text) +
          inputValue
        : inputValue;
    return totalTags * 60 + totalString.length * 16 > 500;
  }

  submitTag() {
    if (!this.state.inputValue) {
      return false;
    }
    this.setState(
      prevState => ({
        tags: [
          ...prevState.tags,
          {
            text: prevState.inputValue,
            fold: this.getTagsWidth(this.state.inputValue)
          }
        ],
        inputValue: ""
      }),
      () => {
        this.setState(
          {
            moreShow:
              this.state.tags.findIndex(item => item.fold === true) !== -1
          },
          () => {
            this.setPadding();
          }
        );
      }
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col" />
            <div className="col-8">
              <div className="input-group mb-3  input-container">
                <div id="inputMask" className="input-mask">
                  {this.state.tags.map((item, key) => {
                    return item.fold ? (
                      false
                    ) : (
                      <TagItem
                        crossClick={() => this.deleteTag(key)}
                        key={key}
                        text={item.text}
                      />
                    );
                  })}
                  {this.state.moreShow ? <DropDown tags={this.state.tags} /> : false}
                </div>
                <input
                  id="inputItem"
                  type="text"
                  className="form-control input-item"
                  value={this.state.inputValue}
                  onChange={this.handleChange}
                />
                <button
                  onClick={this.submitTag.bind(this)}
                  type="button"
                  className="btn btn-primary ml-2"
                >
                  Primary
                </button>
              </div>
            </div>
            <div className="col" />
          </div>
        </div>
      </div>
    );
  }
}

export default PureInput;
