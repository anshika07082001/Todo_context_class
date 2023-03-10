import React, { Component } from "react";
import { ThemeConsumer } from "../context/ThemeContext";
import { TodoConsumer } from "../context/TodoContext";

export class Todo extends Component {
  render() {
    return (
      <div className="col-10 m-auto p-2 rounded">
        <TodoConsumer>
          {(todoData) =>
            todoData.todoData.map((item) => {
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
          }
        </TodoConsumer>
      </div>
    );
  }
}

export default Todo;
