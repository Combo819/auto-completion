import React, { Component } from "react";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.info);
  }
  render() {
    
    return (
      <div>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Value</th>
              <th scope="col">Description</th>

            </tr>
            {this.props.info.map((item, key) => {
              return (
                <tr key={key}>
                  <th scope="col">{key}</th>
                  <th scope="col">{item.text}</th>
                  <th scope="col">{item.content||'Null'}</th>
                </tr>
              );
            })}
          </thead>
          <tbody />
        </table>
      </div>
    );
  }
}

export default Table;
