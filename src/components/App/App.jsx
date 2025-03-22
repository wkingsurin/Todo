import "./App.scss";
import { Checkmark, Close } from "../SVG";
import { useState } from "react";
import { counter } from "../../assets/utils";
import ModalNotification from "../ModalNotification";
import Empty from "../Empty";
import Task from "../Task";
import Button from "../Button";

export default function App() {
  const [content, setContent] = useState(() => ({
    isActiveTab: "new",
    actualTasks: getTasks('actualTasks'),
    wastedTasks: getTasks('wastedTasks'),
    completedTasks: getTasks('completedTasks'),
    notification: { text: "Task saved!" },
  }));
  const [newTask, setNewTask] = useState(() => ({
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

  function jsonParse(json) {
    return JSON.parse(json);
  }
  function jsonStringify(json) {
    return JSON.stringify(json);
  }

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

  const completeTask = (e) => {
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

  const saveNewTask = (e) => {
    const target = e.target;
    const currentTarget = e.currentTarget;

    if (target.closest('[name="save"]')) {
      const input = currentTarget.querySelector("input");
      const inputValue = input.value;

      if (!inputValue) {
        return;
      }

      newTask.text = inputValue;
      newTask.remainingTime = 3600; // Set time
      newTask.totalTime = 3600;
      newTask.status = { isFinished: false, isCompleted: false };
      newTask.type = "actual";

      if (
        newTask.text &&
        newTask.remainingTime &&
        newTask.totalTime &&
        newTask.status &&
        newTask.type
      ) {
        setNewTask((prev) => {
          return { ...prev, text: null, id: counter() };
        });

        setContent((prev) => {
          return { ...prev, actualTasks: [...prev.actualTasks, newTask] };
        });

        saveTask(newTask, newTask.type)

        return newTask;
      }

      console.log("Cannot save this Todo");
      return false;
    }
  };

  const clearInputText = (e) => {
    const target = e.target;

    if (target.closest('[name="remove"]')) {
      target.closest(".todo").querySelector("input").value = "";

      setNewTask((prev) => {
        return { ...prev, text: null };
      });
    }
  };

  const typeText = (e) => {
    setNewTask((prev) => {
      const newTask = { ...prev, text: e.target.value };

      return newTask;
    });
  };

  const deleteTask = (e) => {
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
      const coordinates = target.closest("svg").getBoundingClientRect();

      if (newTask.notification.isCooldown) {
        return;
      } else {
        showNotification(coordinates);
        // setNewTask((prev) => {
        //   return {
        //     ...prev,
        //     notification: { ...prev.notification, isCooldown: true },
        //   };
        // });
        // setTimeout(
        //   () =>
        //     setNewTask((prev) => {
        //       return {
        //         ...prev,
        //         notification: { ...prev.notification, isCooldown: false },
        //       };
        //     }),
        //   1500
        // );
      }
    } else {
      hideNotification();
    }
  };

  const showNotification = (position) => {
    setNewTask((prev) => {
      const newTask = {
        ...prev,
        notification: {
          ...prev.notification,
          isOpen: true,
          position: { x: position.x - 30, y: position.y + 31 },
        },
      };

      return newTask;
    });

    // setTimeout(() => {
    //   setNewTask((prev) => {
    //     return {
    //       ...prev,
    //       notification: { ...prev.notification, isOpen: false },
    //     };
    //   });
    // }, 1000);
  };

  const hideNotification = () => {
    setNewTask((prev) => {
      return { ...prev, notification: { ...prev.notification, isOpen: false } };
    });
  };

  function getTasks(type) {
    if (isExistsTasks(type)) {
      return jsonParse(localStorage.getItem(type));
    }

    return []
  }

  function isExistsTasks(type) {
    return localStorage.getItem(type) ? true : false;
  }

  function saveTask(task, type) {
    const tasksList = getTasks(type);
    tasksList.push(task)

    // const tasks = [
    //   {
    //     text: "Go to walk",
    //     remainingTime: 3600,
    //     totalTime: 3600,
    //     status: { isFinished: false, isCompleted: false },
    //     type: "actual",
    //     id: counter(),
    //     notification: {
    //       text: `Time remaining to complete
    //             the project: 5h 1m 32s`,
    //       isOpen: false,
    //       isCooldown: false,
    //       position: { x: null, y: null },
    //     },
    //   },
    //   {
    //     text: "Finish the project",
    //     remainingTime: 1800,
    //     totalTime: 3600,
    //     status: { isFinished: false, isCompleted: false },
    //     type: "actual",
    //     id: counter(),
    //     notification: {
    //       text: `Time remaining to complete
    //             the project: 5h 1m 32s`,
    //       isOpen: false,
    //       isCooldown: false,
    //       position: { x: null, y: null },
    //     },
    //   },
    //   {
    //     text: "Watch the movie after work",
    //     remainingTime: 900,
    //     totalTime: 3600,
    //     status: { isFinished: false, isCompleted: false },
    //     type: "actual",
    //     id: counter(),
    //     notification: {
    //       text: `Time remaining to complete
    //             the project: 5h 1m 32s`,
    //       isOpen: false,
    //       isCooldown: false,
    //       position: { x: null, y: null },
    //     },
    //   },
    // ];

    // localStorage.setItem("actualTasks", jsonStringify(tasks));

    localStorage.setItem(type, jsonStringify(tasksList))
  }

  // saveActualTask(newTask);

  const actualTasksList = content.actualTasks.map((task) => {
    const width = computePercentOfTime(
      task.totalTime,
      task.remainingTime,
      task.status
    );

    return (
      <Task
        task={task}
        width={width}
        completeTaskListener={completeTask}
        deleteTask={deleteTask}
        hoverOnNotification={hoverOnNotification}
        key={task.id}
      ></Task>
    );
  });

  const wastedTasksList = content.wastedTasks.map((task) => {
    return (
      <Task
        task={task}
        width={100}
        completeTaskListener={completeTask}
        deleteTask={deleteTask}
        hoverOnNotification={hoverOnNotification}
        key={task.id}
      ></Task>
    );
  });

  const completedTasksList = content.completedTasks.map((task) => {
    const width = computePercentOfTime(
      task.totalTime,
      task.remainingTime,
      task.status
    );

    return (
      <Task
        task={task}
        width={width}
        completeTaskListener={completeTask}
        deleteTask={deleteTask}
        hoverOnNotification={hoverOnNotification}
        key={task.id}
      ></Task>
    );
  });

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
              <div className="todo todo-new" onClick={(e) => saveNewTask(e)}>
                <div className="todo-content">
                  <input
                    type="text"
                    placeholder="Enter the text..."
                    value={newTask.text != null ? newTask.text : ""}
                    onInput={(e) => typeText(e)}
                  />
                  <div className="todo-settings">
                    <Button name="save">
                      <Checkmark></Checkmark>
                    </Button>
                    {/* <button className="btn" name="time">
                      <Time fill={"#95FF8F"}></Time>
                    </button> */}
                    <Button name="remove" onClick={clearInputText}>
                      <Close></Close>
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {content.isActiveTab == "actual" &&
              (content.actualTasks.length > 0 ? (
                actualTasksList
              ) : (
                <Empty>Empty</Empty>
              ))}
            {content.isActiveTab == "wasted" &&
              (content.wastedTasks.length > 0 ? (
                wastedTasksList
              ) : (
                <Empty>Empty</Empty>
              ))}
            {content.isActiveTab == "completed" &&
              (content.completedTasks.length > 0 ? (
                completedTasksList
              ) : (
                <Empty>Empty</Empty>
              ))}
            {content.isActiveTab == "empty" && <Empty>Empty</Empty>}
          </div>
        </div>
        {newTask.notification.isOpen && (
          <ModalNotification newTask={newTask}></ModalNotification>
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
