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
      },
      {
        text: "Create project for client",
        remainingTime: 1800,
        totalTime: 3600,
        status: { isFinished: false, isCompleted: false },
      },
      {
        text: "Create project for client",
        remainingTime: 900,
        totalTime: 3600,
        status: { isFinished: false, isCompleted: false },
      },
    ],
    wastedTasks: [
      {
        text: "Create project for client",
        remainingTime: 0,
        totalTime: 3600,
        status: { isFinished: true, isCompleted: false },
      },
      {
        text: "Create project for client",
        remainingTime: 0,
        totalTime: 3600,
        status: { isFinished: true, isCompleted: false },
      },
      {
        text: "Create project for client",
        remainingTime: 0,
        totalTime: 3600,
        status: { isFinished: true, isCompleted: false },
      },
    ],
    completedTasks: [
      {
        text: "Create project for client",
        remainingTime: 0,
        totalTime: 3600,
        status: { isFinished: true, isCompleted: true },
      },
      {
        text: "Create project for client",
        remainingTime: 0,
        totalTime: 3600,
        status: { isFinished: true, isCompleted: true },
      },
      {
        text: "Create project for client",
        remainingTime: 0,
        totalTime: 3600,
        status: { isFinished: true, isCompleted: true },
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
      return 100
    }
    return (remaining * 100) / total;
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
              <div className="todo todo-new">
                <div className="todo-content">
                  <input type="text" placeholder="Enter the text..." />
                  <div className="todo-settings">
                    <button className="btn">
                      <Checkmark></Checkmark>
                    </button>
                    <button className="btn">
                      <Time fill={"#95FF8F"}></Time>
                    </button>
                    <button className="btn">
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

                return (
                  <div className="todo todo-actual" key={index}>
                    <div className="notification">
                      <Notification></Notification>
                    </div>
                    <div className="todo-content">
                      <div className="text">{task.text}</div>
                      <div className="todo-settings">
                        <button className="btn">
                          <Checkmark></Checkmark>
                        </button>
                        <button className="btn">
                          <Close></Close>
                        </button>
                      </div>
                      <div
                        className="time-bar"
                        style={{
                          width: width + "%",
                          background:
                            width == 100
                              ? "#95FF8F"
                              : width == 50
                              ? "#F2FF8F"
                              : "#F9C68F",
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            {content.isActiveTab == "wasted" &&
              content.wastedTasks.map((task, index) => {
                return (
                  <div className="todo todo-wasted" key={index}>
                    <div className="todo-content">
                      <div className="text">{task.text}</div>
                      <div className="todo-settings">
                        <button className="btn">
                          <Close></Close>
                        </button>
                      </div>
                      <div
                        className="time-bar"
                        style={{ background: "#FF8F8F" }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            {content.isActiveTab == "completed" &&
              content.completedTasks.map((task, index) => {
                const width = computePercentOfTime(
                  task.totalTime,
                  task.remainingTime,
                  task.status
                );

                return (
                  <div className="todo todo-completed" key={index}>
                    <div className="todo-content">
                      <div className="text">{task.text}</div>
                      <div className="todo-settings">
                        <button className="btn">
                          <Close></Close>
                        </button>
                      </div>
                      <div
                        className="time-bar"
                        style={{
                          width: width + "%",
                          background:
                            width == 100
                              ? "#95FF8F"
                              : width == 50
                              ? "#F2FF8F"
                              : "#F9C68F",
                        }}
                      ></div>
                    </div>
                  </div>
                );
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
