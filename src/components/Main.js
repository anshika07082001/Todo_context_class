import React, { Component, createRef } from "react";
import Todo from "./Todo";
import { TodoProvider } from "../context/TodoContext";
import { ThemeProvider } from "../context/ThemeContext";
import { LoaderProvider } from "../context/LoaderContext";
import SearchTodo from "./SearchTodo";

export class Main extends Component {
  constructor(props) {
    super(props);

    this.inpRef = createRef();
    this.searchRef = createRef();

    this.state = {
      todoData: [],
      theme: "light",
      loader: true,
    };
  }

  componentDidMount() {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          todoData: result.todos,
          loader: false,
        });
      });
  }

  addTodo = () => {
    let todoTitle = this.inpRef.current.value;
    let obj = {
      id: this.state.todoData.length + 1,
      todo: todoTitle,
      completed: false,
      userId: Math.floor(Math.random() * 100),
    };
    this.state.todoData.push(obj);
    this.setState({
      todoData: this.state.todoData,
      loader: true,
    });
    setTimeout(() => {
      this.setState({
        loader: false,
      });
    }, 1000);
    this.inpRef.current.value = "";
  };

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

  render() {
    return (
      <LoaderProvider value={{ loader: this.state.loader }}>
        <ThemeProvider value={{ theme: this.state.theme }}>
          <div
            className={`${
              this.state.theme === "light" ? "bg-light text-dark" : ""
            } ${
              this.state.theme === "dark" ? "bg-dark text-light" : ""
            } col-12 m-auto text-center`}
          >
            <h2>Todo App</h2>
            <SearchTodo searchRef={this.searchRef} />
            <div className="col-10 d-flex flex-row m-auto border rounded p-1 mt-3">
              <input
                className="border-0 col-9 rounded"
                placeholder="Add New Todo..."
                ref={this.inpRef}
              />
              <button className="btn btn-primary col-3" onClick={this.addTodo}>
                Add New Task
              </button>
            </div>

            <TodoProvider value={{ todoData: this.state.todoData }}>
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
