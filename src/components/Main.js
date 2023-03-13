import React, { Component, createRef } from "react";
import Todo from "./Todo";
import { TodoProvider } from "../context/TodoContext";
import { ThemeProvider } from "../context/ThemeContext";
import { LoaderProvider } from "../context/LoaderContext";
import SearchTodo from "./SearchTodo";

export class Main extends Component {
  constructor(props) {
    super(props);

    // ref created for add new todo input box
    this.inpRef = createRef();
    // ref created for search todo input box
    this.searchRef = createRef();

    this.state = {
      // state for todo data
      todoData: [],
      // state for search todo data
      searchTodo: [],
      // state for theme
      theme: "light",
      // state for loader
      loader: true,
    };
  }

  // fetching of data in componentdidmount
  componentDidMount() {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          todoData: result.todos,
          searchTodo: result.todos,
          loader: false,
        });
      });
  }

  // function to add newtodo
  addTodo = () => {
    let todoTitle = this.inpRef.current.value;
    let obj = {
      id: this.state.todoData.length + 1,
      todo: todoTitle,
      completed: false,
      userId: Math.floor(Math.random() * 100),
    };
    this.state.todoData.push(obj);
    this.state.searchTodo = this.state.todoData;
    this.setState({
      todoData: this.state.todoData,
      searchTodo: this.state.searchTodo,
      loader: true,
    });
    setTimeout(() => {
      this.setState({
        loader: false,
      });
    }, 1000);
    this.inpRef.current.value = "";
  };

  // function to change status to complete or incomplete
  checkHandler = (id) => {
    let itemId = (ele) => ele.id === id;
    let index = this.state.todoData.findIndex(itemId);
    let todos = this.state.todoData;
    if (this.state.todoData[index].completed) {
      todos[index].completed = false;
    } else {
      todos[index].completed = true;
    }
    this.setState({
      todoData: this.state.todoData,
    });
  };

  // function to change the theme in light or dark
  switchHandler = (e) => {
    if (e.target.checked) {
      this.setState({
        theme: "dark",
      });
    } else {
      this.setState({
        theme: "light",
      });
    }
  };

  // function to search todo on change of inputfield
  searchHandler = () => {
    this.state.searchTodo = [];
    let val = this.searchRef.current.value;
    this.state.todoData.map((item, i) => {
      // conditions to check whether the filled input is present in todo array or not
      if (
        item.todo
          .toString()
          .toLocaleLowerCase()
          .includes(val.toString().toLocaleLowerCase())
      ) {
        this.state.searchTodo.push(item);
      }
      if (
        !item.todo
          .toString()
          .toLocaleLowerCase()
          .includes(val.toString().toLocaleLowerCase())
      ) {
        this.state.searchTodo.splice(i, 1);
      }
    });
    this.setState({
      searchTodo: this.state.searchTodo,
    });
  };

  render() {
    return (
      // loader context provider
      <LoaderProvider value={{ loader: this.state.loader }}>
        {/* theme context provider */}
        <ThemeProvider value={{ theme: this.state.theme }}>
          <div
            className={`${this.state.theme === "light" ? " text-dark" : ""} ${
              this.state.theme === "dark" ? "bg-dark text-light" : ""
            } col-12 m-auto text-center`}
          >
            <h2>Todo App</h2>
            {/* todo context provider */}
            <TodoProvider value={{ ref: this.searchRef }}>
              {/* rendering of search input component */}
              <SearchTodo searchHandler={this.searchHandler} />
            </TodoProvider>
            <div className="col-10 d-flex flex-row m-auto border rounded p-1 mt-3">
              {/* rendering of input box for adding new todo */}
              <input
                className="border-0 col-9 rounded"
                placeholder="Add New Todo..."
                ref={this.inpRef}
              />
              <button className="btn btn-primary col-3" onClick={this.addTodo}>
                Add New Task
              </button>
            </div>
            {/* todo context provider */}
            <TodoProvider value={{ searchTodo: this.state.searchTodo }}>
              {/* rendering of todo component */}
              <Todo
                checkHandler={this.checkHandler}
                switchHandler={this.switchHandler}
              />
            </TodoProvider>
          </div>
        </ThemeProvider>
      </LoaderProvider>
    );
  }
}

export default Main;