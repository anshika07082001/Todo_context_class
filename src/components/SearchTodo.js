import React, { Component } from "react";
import { TodoConsumer } from "../context/TodoContext";

export class SearchTodo extends Component {
  render() {
    return (
      // consumer of todo context
      <TodoConsumer>
        {(ref) => (
          <div className="col-10 d-flex flex-row m-auto border rounded p-1">
            <button className="btn btn-primary col-1" type="submit">
              <i className="bi bi-search"></i>
            </button>
            <input
              className="border-0 col-11 rounded"
              placeholder="Search Todos..."
              ref={ref.ref}
              onChange={this.props.searchHandler}
            />
          </div>
        )}
      </TodoConsumer>
    );
  }
}

export default SearchTodo;