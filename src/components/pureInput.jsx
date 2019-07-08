import React, { Component } from "react";
import TagItem from "./tagItem";
import DropDown from "./dropDown";
import Table from "./table";
import MarginBox from "./marginBox";
const randomstring = require("randomstring");

class PureInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      tableInfo: [],
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
    this.tagsWidthAfterDelete = this.tagsWidthAfterDelete.bind(this);
  }
  /**
   * @description: When hit Enter in input box
   * @param {Object}
   * @return: None or false
   */
  enterPress = e => {
    if (!this.state.inputValue) {
      return false;
    }
    if (this.state.inputValue.trim() === "") {
      this.setState({
        inputValue: ""
      });
      return false;
    }
    this.setState(
      prevState => ({
        tags: [
          ...prevState.tags,
          {
            text: prevState.inputValue.trim(),
            fold:
              this.getTagsWidth(this.state.inputValue) ||
              this.state.tags.findIndex(item => item.fold === true) !== -1,
            content: ""
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
  };
  /**
   * @description: filter the auto completion source
   * @param {type}
   * @return:
   */
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
  /**
   * @description: generate fake auto completion source
   * @param {number} n total random source
   * @return:
   */
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
  /**
   * @description: remove a tag
   * @param {number} index the index of the deleted tag
   * @return:
   */
  deleteTag(index) {
    const newTags = [...this.state.tags];
    newTags.splice(index, 1);
    let foldIndex = newTags.findIndex(item => {
      return item.fold;
    });
    while (foldIndex !== -1 && this.tagsWidthAfterDelete(newTags, foldIndex)) {
      console.log(newTags[foldIndex]);

      newTags[foldIndex].fold = false;
      foldIndex = newTags.findIndex(item => {
        return item.fold;
      });
    }
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
  /**
   * @description: set the layout of tags
   * @param {type}
   * @return:
   */
  setPadding() {
    const inputMask = document.getElementById("inputMask");
    const width = window.getComputedStyle(inputMask).getPropertyValue("width");
    const inputItem = document.getElementById("inputItem");
    inputItem.style.paddingLeft = width;
  }
  /**
   * @description: set the input of the main input box
   * @param {type}
   * @return:
   */
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

  /**
   * @description: If tags total width will exceed the input box
   * @param {string} inputValue the input value in the main input box
   * @return: Boolean
   */
  getTagsWidth(inputValue) {
    const totalTags = this.state.tags.filter(item => !item.fold).length;
    const totalString =
      totalTags !== 0
        ? this.state.tags.reduce((pre, next) => pre.text + next.text) +
          inputValue
        : inputValue;
    return totalTags * 60 + totalString.length * 16 > 500;
  }
  /**
   * @description: If tags total width will exceed the input box when remove a tag
   * @param {array} newTags the tags list
   * @param {number} foldIndex the first tag whose fold attribute is true
   * @return: Boolean
   */
  tagsWidthAfterDelete(newTags, foldIndex) {
    // a pair of brackets are necessary
    const totalTags =
      (newTags.filter(item => !item.fold).length) +
      (foldIndex === newTags.length ? 0 : 1);

    const totalString =
      newTags.filter(item => !item.fold).length > 1
        ? newTags
            .filter(item => !item.fold)
            .reduce((pre, next) => pre.text + next.text) +
          newTags[foldIndex].text
        : newTags[0].text;

    return totalTags * 60 + totalString.length * 16 < 500;
  }
  /**
   * @description: submit the tags and show them on the table
   * @param {type}
   * @return:
   */
  submitTag() {
    this.setState({
      tableInfo: this.state.tags
    });
  }

  /**
   * @description: when you click on one of the suggested option
   * @param {number} key the key th option is clicked
   * @return:
   */
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
            fold:
              this.getTagsWidth(this.state.inputValue) ||
              this.state.tags.findIndex(item => item.fold === true) !== -1,
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
  /**
   * @description: one of the input box options changes
   * @param {object} e input event
   * @param {number} key the key th option
   * @return:
   */
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
        <div style={{ position: "relative" }} className="container">
          <MarginBox />
          <div className="row mb-5">
            <div className="col-sm" />
            <div className="col-sm h2">Auto Completion</div>
            <div className="col-sm" />
          </div>

          <div className="row mt-5">
            <div className="col" />
            <div
              style={{
                position: "absolute",
                zIndex: 1,
                left: 0,
                right: "0",
                marginLeft: " auto",
                marginRight: "auto"
              }}
              className="col-8"
            >
              <div style={{flexWrap:"nowrap"}} className="input-group mb-3  input-container ">
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
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      this.enterPress(e);
                    }
                  }}
                />
                <button
                  onClick={this.submitTag.bind(this)}
                  type="button"
                  className="btn btn-primary ml-2"
                >
                  submit
                </button>
              </div>
              {this.state.inputValue.trim() !== "" ? (
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
                        style={{ position: "relative" }}
                        className="row"
                      >
                        <div
                          style={{ width: "500px", wordWrap: "break-word" }}
                          className="overflow-hidden"
                        >
                          {item.value}
                        </div>

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
          <MarginBox />
          <MarginBox />
          <Table info={this.state.tableInfo} />
        </div>
      </div>
    );
  }
}

export default PureInput;
