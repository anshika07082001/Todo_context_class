import React from "react";

const SearchTodo = () => {
  return (
    <form className="col-10 d-flex flex-row m-auto border rounded p-1">
      <button className="btn btn-primary col-1">
        <i className="bi bi-search"></i>
      </button>
      <input
        className="border-0 col-11 rounded"
        placeholder="Search Todos..."
        ref={this.props.searchRef}
      />
    </form>
  );
};

export default SearchTodo;
