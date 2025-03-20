import "./App.scss";
import { Checkmark, Time, Close, Notification } from "../SVG";
import { useState } from "react";

export default function App() {
  const [content, setContent] = useState(() => ({
    isActiveTab: "new",
    actualTasks: [
      {
        text: "Create project for client",
        remainingTime: 3600,
        totalTime: 3600,
        status: { isFinished: false, isCompleted: false },
        type: "actual",
      },
      {
        text: "Create project for client",
        remainingTime: 1800,
        totalTime: 3600,
        status: { isFinished: false, isCompleted: false },
        type: "actual",
      },
      {
        text: "Create project for client",
        remainingTime: 900,
        totalTime: 3600,
        status: { isFinished: false, isCompleted: false },
        type: "actual",
      },
    ],
    wastedTasks: [
      {
        text: "Create project for client",
        remainingTime: 0,
        totalTime: 3600,
        status: { isFinished: true, isCompleted: false },
        type: "wasted",
      },
      {
        text: "Create project for client",
        remainingTime: 0,
        totalTime: 3600,
        status: { isFinished: true, isCompleted: false },
        type: "wasted",
      },
      {
        text: "Create project for client",
        remainingTime: 0,
        totalTime: 3600,
        status: { isFinished: true, isCompleted: false },
        type: "wasted",
      },
    ],
    completedTasks: [
      {
        text: "Create project for client",
        remainingTime: 0,
        totalTime: 3600,
        status: { isFinished: true, isCompleted: true },
        type: "completed",
      },
      {
        text: "Create project for client",
        remainingTime: 0,
        totalTime: 3600,
        status: { isFinished: true, isCompleted: true },
        type: "completed",
      },
      {
        text: "Create project for client",
        remainingTime: 0,
        totalTime: 3600,
        status: { isFinished: true, isCompleted: true },
        type: "completed",
      },
    ],
  }));

  const notificationText = `Time remaining to complete the project: 5h 1m 32s`;

  const switchTab = (e) => {
    setContent((prev) => {
      return { ...prev, isActiveTab: e.target.name };
    });
  };

  const computePercentOfTime = (total, remaining, status) => {
    if (status.isCompleted) {
      return 100;
    }
    return (remaining * 100) / total;
  };

  const TodoComponent = (task, width, index, completeTodoListener) => {
    return (
      <div
        className={`todo todo-${task.type}`}
        key={index}
        onClick={(e) => {
          completeTodoListener(e);
        }}
      >
        {task.type == "actual" && (
          <div className="notification">
            <Notification></Notification>
          </div>
        )}
        <div className="todo-content">
          <div className="text">{task.text}</div>
          <div className="todo-settings">
            {task.type == "actual" && (
              <button className="btn" name="complete">
                <Checkmark></Checkmark>
              </button>
            )}
            {/* <button className="btn">
              <Time fill={"#95FF8F"}></Time>
            </button> */}
            <button className="btn" name="remove">
              <Close></Close>
            </button>
          </div>
          <div
            className="time-bar"
            style={{
              width: width + "%",
              background:
                width == 100 ? "#95FF8F" : width == 50 ? "#F2FF8F" : "#F9C68F",
            }}
          ></div>
        </div>
      </div>
    );
  };

  const completeTodo = (e) => {
    const target = e.target;
    const currentTarget = e.currentTarget;
    const todoText = currentTarget.querySelector(".text").textContent;

    if (target.closest('[name="complete"]')) {
      setContent((prev) => {
        return {
          ...prev,
          actualTasks: prev.actualTasks.filter((task) => task.text != todoText),
          completedTasks: [
            ...prev.completedTasks,
            ...prev.actualTasks.filter((task) => task.text == todoText),
          ],
        };
      });
    }
  };

  const saveNewTodo = (e) => {
    const target = e.target;
    const currentTarget = e.currentTarget;

    if (target.closest('[name="save"]')) {
      const input = currentTarget.querySelector("input");
      const inputValue = input.value;

      const newTodo = { text: null, remainingTime: null, totalTime: null };

      if (!inputValue) {
        return;
      }

      newTodo.text = inputValue;
      newTodo.remainingTime = 3600; // Set time
      newTodo.totalTime = 3600;
      (newTodo.status = { isFinished: false, isCompleted: false }),
        (newTodo.type = "actual");

      if (
        newTodo.text &&
        newTodo.remainingTime &&
        newTodo.totalTime &&
        newTodo.status &&
        newTodo.type
      ) {

        setContent((prev) => {
          return { ...prev, actualTasks: [...prev.actualTasks, newTodo] };
        });

        return newTodo;
      }

      console.log("Cannot save this Todo");
      return false;
    }
  };

  return (
    <>
      <div className="app">
        <div className="app-container">
          <div className="tabs" onClick={(e) => switchTab(e)}>
            <button
              className={`btn ${content.isActiveTab == "new" ? "active" : ""}`}
              name="new"
            >
              New
            </button>
            <button
              className={`btn ${
                content.isActiveTab == "actual" ? "active" : ""
              }`}
              name="actual"
            >
              Actual
            </button>
            <button
              className={`btn ${
                content.isActiveTab == "wasted" ? "active" : ""
              }`}
              name="wasted"
            >
              Wasted
            </button>
            <button
              className={`btn ${
                content.isActiveTab == "completed" ? "active" : ""
              }`}
              name="completed"
            >
              Completed
            </button>
          </div>
          <div className="box">
            {content.isActiveTab == "new" && (
              <div className="todo todo-new" onClick={(e) => saveNewTodo(e)}>
                <div className="todo-content">
                  <input type="text" placeholder="Enter the text..." />
                  <div className="todo-settings">
                    <button className="btn" name="save">
                      <Checkmark></Checkmark>
                    </button>
                    <button className="btn" name="time">
                      <Time fill={"#95FF8F"}></Time>
                    </button>
                    <button className="btn" name="remove">
                      <Close></Close>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {content.isActiveTab == "actual" &&
              content.actualTasks.map((task, index) => {
                const width = computePercentOfTime(
                  task.totalTime,
                  task.remainingTime,
                  task.status
                );

                return TodoComponent(task, width, index, completeTodo);
              })}
            {content.isActiveTab == "wasted" &&
              content.wastedTasks.map((task, index) => {
                return TodoComponent(task, 100, index, completeTodo);
              })}
            {content.isActiveTab == "completed" &&
              content.completedTasks.map((task, index) => {
                const width = computePercentOfTime(
                  task.totalTime,
                  task.remainingTime,
                  task.status
                );

                return TodoComponent(task, width, index, completeTodo);
              })}
            {content.isActiveTab == "empty" && <p className="empty">Empty</p>}
          </div>
        </div>
        {/* <div className="modal settings">
          <div className="content">
            <div className="line">
              <p className="property">Date:</p>
              <p className="value">19.03.25</p>
            </div>
            <div className="line">
              <p className="property">Time:</p>
              <p className="value">19:00</p>
            </div>
          </div>
        </div> */}
        {/* <div className="modal notification">
          <div className="content">
            <p className="text">{notificationText}</p>
          </div>
        </div> */}
      </div>
    </>
  );
}
