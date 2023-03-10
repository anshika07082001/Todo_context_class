import React, { Component, createRef } from "react";
import Todo from "./Todo";
import { TodoProvider } from "../context/TodoContext";
import { ThemeConsumer, ThemeProvider } from "../context/ThemeContext";

export class Main extends Component {
  constructor(props) {
    super(props);

    this.inpRef = createRef();

    this.state = {
      todoData: [],
    };
  }

  componentDidMount() {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          todoData: result.todos,
          theme: "light",
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
    });
    this.inpRef.current.value = "";
  };

  checkHandler = (id) => {
    let itemId = (ele) => ele.id === id;
    let index = this.state.todoData.findIndex(itemId);
    if (this.state.todoData[index].completed) {
      this.state.todoData[index].completed = false;
    } else {
      this.state.todoData[index].completed = true;
    }
    this.setState({
      todoData: this.state.todoData,
    });
  };

  switchHandler = (e) => {
    if (e.target.checked) {
      this.state.theme = "dark";
    } else {
      this.state.theme = "light";
    }
    this.setState({
      theme: this.state.theme,
    });
  };

  render() {
    // console.log(this.state.todoData);
    return (
      <ThemeProvider value={{ theme: this.state.theme }}>
        <ThemeConsumer>
          {(theme) => {
            return (
              <div
                className={`${
                  theme.theme === "light" ? "bg-light text-dark" : ""
                } ${
                  theme.theme === "dark" ? "bg-dark text-light" : ""
                } col-12 m-auto text-center`}
              >
                <h2>Todo App</h2>
                <div className="col-10 d-flex flex-row m-auto border rounded p-1">
                  <input className="border-0 col-9" ref={this.inpRef} />
                  <button
                    className="btn btn-primary col-3"
                    onClick={this.addTodo}
                  >
                    Add New Task
                  </button>
                </div>
                <div className="form-check form-switch col-10 m-auto mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onChange={(e) => this.switchHandler(e)}
                  />
                </div>
                {this.state.todoData.length > 0 ? (
                  <TodoProvider value={{ todoData: this.state.todoData }}>
                    <Todo checkHandler={this.checkHandler} />
                  </TodoProvider>
                ) : (
                  <></>
                )}
              </div>
            );
          }}
        </ThemeConsumer>
      </ThemeProvider>
    );
  }
}

export default Main;
