import React, { Component } from "react";
import { LoaderConsumer } from "../context/LoaderContext";
import { ThemeConsumer } from "../context/ThemeContext";
import { TodoConsumer } from "../context/TodoContext";

export class Todo extends Component {
  render() {
    return (
      <div className="col-10 m-auto p-2 rounded">
        {/* theme context consumer */}
        <ThemeConsumer>
          {(theme) => {
            return (
              <div className="form-check form-switch col-10 m-auto mt-2">
                {/* rendering of search box input */}
                <input
                  className={`form-check-input border ${
                    theme.theme === "light" ? "border-dark" : "border-light"
                  }`}
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={(e) => this.props.switchHandler(e)}
                />
              </div>
            );
          }}
        </ThemeConsumer>
        {/* loader context consumer */}
        <LoaderConsumer>
          {(loader) =>
          // rendering of loader
            loader.loader ? (
              <img
                src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                alt=""
                className="col-1"
              />
            ) : (
              // todo context consumer
              <TodoConsumer>
                {(searchTodo) =>
                  searchTodo.searchTodo.length > 0 ? (
                    // rendering of todo data
                    searchTodo.searchTodo.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="col-10 m-auto mt-4 shadow p-3 rounded border"
                        >
                          <div className="d-flex flex-row justify-content-between align-items-center p-1">
                            <span className="text-start fw-bold fs-5">
                              {item.userId}
                            </span>
                            <span
                              className={
                                item.completed
                                  ? "text-decoration-line-through"
                                  : "text-decoration-none"
                              }
                            >
                              {item.todo}
                            </span>
                            <input
                              type="checkbox"
                              className=""
                              checked={item.completed}
                              onChange={() => this.props.checkHandler(item.id)}
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    // rendering of image if no search results are found
                    <p>
                      <img
                        src="https://cdn.dribbble.com/users/760295/screenshots/4433975/media/03494b209a1511a61868ced337b97931.png?compress=1&resize=400x300"
                        alt=""
                      />
                    </p>
                  )
                }
              </TodoConsumer>
            )
          }
        </LoaderConsumer>
      </div>
    );
  }
}

export default Todo;