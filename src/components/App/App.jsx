import "./App.scss";
import { Checkmark, Time, Close, Notification } from "../SVG";
import { useState } from "react";
import { counter } from "../../assets/utils";

export default function App() {
  const [content, setContent] = useState(() => ({
    isActiveTab: "new",
    actualTasks: [
      // {
      //   text: "Create project for client",
      //   remainingTime: 3600,
      //   totalTime: 3600,
      //   status: { isFinished: false, isCompleted: false },
      //   type: "actual",
      // },
      // {
      //   text: "Create project for client",
      //   remainingTime: 1800,
      //   totalTime: 3600,
      //   status: { isFinished: false, isCompleted: false },
      //   type: "actual",
      // },
      // {
      //   text: "Create project for client",
      //   remainingTime: 900,
      //   totalTime: 3600,
      //   status: { isFinished: false, isCompleted: false },
      //   type: "actual",
      // },
    ],
    wastedTasks: [
      // {
      //   text: "Create project for client",
      //   remainingTime: 0,
      //   totalTime: 3600,
      //   status: { isFinished: true, isCompleted: false },
      //   type: "wasted",
      // },
      // {
      //   text: "Create project for client",
      //   remainingTime: 0,
      //   totalTime: 3600,
      //   status: { isFinished: true, isCompleted: false },
      //   type: "wasted",
      // },
      // {
      //   text: "Create project for client",
      //   remainingTime: 0,
      //   totalTime: 3600,
      //   status: { isFinished: true, isCompleted: false },
      //   type: "wasted",
      // },
    ],
    completedTasks: [
      // {
      //   text: "Create project for client",
      //   remainingTime: 0,
      //   totalTime: 3600,
      //   status: { isFinished: true, isCompleted: true },
      //   type: "completed",
      // },
      // {
      //   text: "Create project for client",
      //   remainingTime: 0,
      //   totalTime: 3600,
      //   status: { isFinished: true, isCompleted: true },
      //   type: "completed",
      // },
      // {
      //   text: "Create project for client",
      //   remainingTime: 0,
      //   totalTime: 3600,
      //   status: { isFinished: true, isCompleted: true },
      //   type: "completed",
      // },
    ],
    notification: { text: "Task saved!" },
  }));
  const [newTodo, setNewTodo] = useState(() => ({
    text: null,
    remainingTime: null,
    totalTime: null,
    status: { isFinished: false, isCompleted: false },
    type: null,
    id: counter(),
    notification: {
      text: `Time remaining to complete
            the project: 5h 1m 32s`,
      isOpen: false,
      isCooldown: false,
      position: { x: null, y: null },
    },
  }));

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

  const TodoComponent = (
    task,
    width,
    index,
    completeTodoListener,
    deleteTodo,
    hoverOnNotification
  ) => {
    return (
      <div
        className={`todo todo-${task.type}`}
        key={index}
        onClick={(e) => {
          completeTodoListener(e);
        }}
        id={task.id}
      >
        {task.type == "actual" && (
          <div
            className="notification"
            onMouseOver={(e) => hoverOnNotification(e)}
          >
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
            <button
              className="btn"
              name="remove"
              onClick={(e) => deleteTodo(e)}
            >
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
    const taskId = currentTarget.id;

    if (target.closest('[name="complete"]')) {
      setContent((prev) => {
        return {
          ...prev,
          actualTasks: prev.actualTasks.filter((task) => task.id != taskId),
          completedTasks: [
            ...prev.completedTasks,
            ...prev.actualTasks
              .filter((task) => task.id == taskId)
              .map((task) => ({
                ...task,
                type: "completed",
              })),
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
        localStorage.setItem("newTodo", JSON.stringify(content.actualTasks));

        setContent((prev) => {
          return { ...prev, actualTasks: [...prev.actualTasks, newTodo] };
        });

        setNewTodo((prev) => {
          return { ...prev, text: null, id: counter() };
        });

        return newTodo;
      }

      console.log("Cannot save this Todo");
      return false;
    }
  };

  const clearInputText = (e) => {
    const target = e.target;

    if (target.closest('[name="remove"]')) {
      target.closest(".todo").querySelector("input").value = "";
      setNewTodo((prev) => {
        return { ...prev, text: null };
      });
    }
  };

  const typeText = (e) => {
    setNewTodo((prev) => {
      const newTodo = { ...prev, text: e.target.value };

      return newTodo;
    });
  };

  const deleteTodo = (e) => {
    const target = e.target;

    const taskId = target.closest(".todo").id;

    setContent((prev) => {
      return {
        ...prev,
        actualTasks: prev.actualTasks.filter((task) => task.id != taskId),
        wastedTasks: prev.wastedTasks.filter((task) => task.id != taskId),
        completedTasks: prev.completedTasks.filter((task) => task.id != taskId),
      };
    });
  };

  const hoverOnNotification = (e) => {
    const target = e.target;

    if (target.closest("svg")) {
      const coordinates = target.closest('svg').getBoundingClientRect();

      if (newTodo.notification.isCooldown) {
        return;
      } else {
        showNotification(coordinates);
        // setNewTodo((prev) => {
        //   return {
        //     ...prev,
        //     notification: { ...prev.notification, isCooldown: true },
        //   };
        // });
        // setTimeout(
        //   () =>
        //     setNewTodo((prev) => {
        //       return {
        //         ...prev,
        //         notification: { ...prev.notification, isCooldown: false },
        //       };
        //     }),
        //   1500
        // );
      }
    } else {
      hideNotification()
    }
  };

  const showNotification = (position) => {
    setNewTodo((prev) => {
      const newTodo = {
        ...prev,
        notification: {
          ...prev.notification,
          isOpen: true,
          position: { x: position.x - 30, y: position.y + 31 },
        },
      };

      return newTodo;
    });

    // setTimeout(() => {
    //   setNewTodo((prev) => {
    //     return {
    //       ...prev,
    //       notification: { ...prev.notification, isOpen: false },
    //     };
    //   });
    // }, 1000);
  };

  const hideNotification = () => {
    setNewTodo((prev) => {
      return {...prev, notification: {...prev.notification, isOpen: false}}
    })
  }

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
                  <input
                    type="text"
                    placeholder="Enter the text..."
                    value={newTodo.text != null ? newTodo.text : ""}
                    onInput={(e) => typeText(e)}
                  />
                  <div className="todo-settings">
                    <button className="btn" name="save">
                      <Checkmark></Checkmark>
                    </button>
                    <button className="btn" name="time">
                      <Time fill={"#95FF8F"}></Time>
                    </button>
                    <button
                      className="btn"
                      name="remove"
                      onClick={(e) => clearInputText(e)}
                    >
                      <Close></Close>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {content.isActiveTab == "actual" &&
              (content.actualTasks.length > 0 ? (
                content.actualTasks.map((task, index) => {
                  const width = computePercentOfTime(
                    task.totalTime,
                    task.remainingTime,
                    task.status
                  );

                  return TodoComponent(
                    task,
                    width,
                    index,
                    completeTodo,
                    deleteTodo,
                    hoverOnNotification
                  );
                })
              ) : (
                <p className="empty">Empty</p>
              ))}
            {content.isActiveTab == "wasted" &&
              (content.wastedTasks.length > 0 ? (
                content.wastedTasks.map((task, index) => {
                  return TodoComponent(
                    task,
                    100,
                    index,
                    completeTodo,
                    deleteTodo,
                    hoverOnNotification
                  );
                })
              ) : (
                <p className="empty">Empty</p>
              ))}
            {content.isActiveTab == "completed" &&
              (content.completedTasks.length > 0 ? (
                content.completedTasks.map((task, index) => {
                  const width = computePercentOfTime(
                    task.totalTime,
                    task.remainingTime,
                    task.status
                  );

                  return TodoComponent(
                    task,
                    width,
                    index,
                    completeTodo,
                    deleteTodo,
                    hoverOnNotification
                  );
                })
              ) : (
                <p className="empty">Empty</p>
              ))}
            {content.isActiveTab == "empty" && <p className="empty">Empty</p>}
          </div>
        </div>
        {newTodo.notification.isOpen && (
          <div
            className="modal notification"
            style={{
              position: "absolute",
              left: `${newTodo.notification.position.x}px`,
              top: `${newTodo.notification.position.y}px`,
              zIndex: 2,
            }}
          >
            <div className="content">
              <p className="text">{newTodo.notification.text}</p>
            </div>
          </div>
        )}

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
