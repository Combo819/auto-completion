import React, { Component } from "react";
import TagItem from "./tagItem";
import DropDown from "./dropDown";
const randomstring = require("randomstring");

class PureInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        {
          text: "hello",
          fold: false,
          content: ""
        },
        {
          text: "hi",
          fold: false,
          content: ""
        }
      ],
      source: [],
      inputValue: "",
      moreShow: false,
      sourceFilter: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.getTagsWidth = this.getTagsWidth.bind(this);
    this.generateSource = this.generateSource.bind(this);
    this.arrFilter = this.arrFilter.bind(this);
    this.dropDownClick = this.dropDownClick.bind(this);
    this.dropDownInputChange = this.dropDownInputChange.bind(this);
  }

  arrFilter() {
    const value = this.state.inputValue;
    const source = this.state.source;
    const sourceFilter = source
      .filter(item => {
        return item.value.indexOf(value) === 0;
      })
      .map((item, key) => {
        if (key % 3 === 2) {
          item.content = randomstring.generate({ length: 10 });
          return item;
        } else {
          return item;
        }
      });
    this.setState({
      sourceFilter
    });
  }

  generateSource(n) {
    const num = n < 40 ? n : 40;
    const source = [];
    for (let i = 0; i < num; i++) {
      source.push({
        value: randomstring.generate({
          length: Math.round(Math.random() * 10),
          charset: "alphabetic",
          capitalization: "lowercase"
        }),
        content: ""
      });
    }
    const value = this.state.inputValue;
    let sourceConcat = source.concat([
      {
        value,
        content: ""
      },
      {
        value: value + value,
        content: ""
      },
      {
        value: value + value + value,
        content: ""
      }
    ]);
    this.setState(
      {
        source: sourceConcat
      },
      () => {
        this.arrFilter();
      }
    );
  }

  deleteTag(index) {
    const newTags = [...this.state.tags];

    if (!newTags[index].fold) {
      const foldIndex = newTags.findIndex(item => {
        return item.fold;
      });
      if (foldIndex !== -1) {
        newTags[foldIndex].fold = false;
      }
    }
    newTags.splice(index, 1);

    this.setState(
      {
        tags: newTags
      },
      () => {
        this.setState(
          {
            moreShow:
              this.state.tags.findIndex(item => item.fold === true) !== -1
          },
          () => {
            this.setPadding();
            console.log(this.state.tags);
          }
        );
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
    this.setState({ inputValue: event.target.value }, () => {
      if (this.state.inputValue !== "") {
        this.generateSource();
      }
    });
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
            fold: this.getTagsWidth(this.state.inputValue),
            content: randomstring.generate({ length: 10 })
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

  dropDownClick(key) {
    if (!this.state.inputValue) {
      return false;
    }
    this.setState(
      prevState => ({
        tags: [
          ...prevState.tags,
          {
            text: this.state.sourceFilter[key].value,
            fold: this.getTagsWidth(this.state.inputValue),
            content: this.state.sourceFilter[key].content
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
            console.log(this.state.tags);
          }
        );
      }
    );
  }

  dropDownInputChange(e, key) {
    const sourceFilter = [...this.state.sourceFilter];
    sourceFilter[key].content = e.target.value;
    this.setState(
      {
        sourceFilter
      },
      () => {
        console.log(this.state.sourceFilter);
      }
    );
  }

  render() {
    const dropDownRight = (key, item) => {
      {
        if (key % 3 === 0) {
          return (
            <input
              onClick={e => e.stopPropagation()}
              style={{
                height: "30px",
                position: "absolute",
                right: "10px"
              }}
              onChange={e => {
                this.dropDownInputChange(e, key);
              }}
              type="number"
              name="tentacles"
              min="10"
              max="100"
            />
          );
        } else if (key % 3 === 1) {
          return (
            <input
              onClick={e => e.stopPropagation()}
              style={{
                height: "30px",
                position: "absolute",
                right: "10px"
              }}
              onChange={e => {
                this.dropDownInputChange(e, key);
              }}
              placeholder="type in string"
              name="tentacles"
            />
          );
        } else {
          return (
            <span
              style={{
                height: "30px",
                position: "absolute",
                right: "10px"
              }}
            >
              {item.content}
            </span>
          );
        }
      }
    };
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col" />
            <div className="col-8">
              <div className="input-group mb-3  input-container ">
                <div id="inputMask" className="input-mask">
                  {this.state.tags.map((item, key) => {
                    return item.fold ? (
                      false
                    ) : (
                      <TagItem
                        crossClick={() => this.deleteTag(key)}
                        key={key}
                        index={key}
                        text={item.text}
                      />
                    );
                  })}
                  {this.state.moreShow ? (
                    <DropDown
                      deleteTag={this.deleteTag}
                      tags={this.state.tags}
                    />
                  ) : (
                    false
                  )}
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
              {this.state.inputValue !== "" ? (
                <div>
                  {this.state.sourceFilter.map((item, key) => (
                    <div
                      key={key}
                      className="dropdown-item autoComplete container"
                    >
                      <div
                        onClick={() => {
                          this.dropDownClick(key);
                        }}
                        className="row"
                      >
                        <div className="col-sm">{item.value}</div>
                        <div
                          style={{ position: "relative" }}
                          className="col-sm"
                        >
                          {dropDownRight(key, item)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="col" />
          </div>
        </div>
      </div>
    );
  }
}

export default PureInput;
