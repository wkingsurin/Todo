import "./App.scss";
import { Checkmark, Time, Close } from "../SVG";
import { useState } from "react";
import { counter } from "../../assets/utils";
import ModalNotification from "../ModalNotification";
import ModalSettings from "../ModalSettings";
import Empty from "../Empty";
import Task from "../Task";
import Button from "../Button";

const START_TIME = new Date(2025, 2, 23, 18);
const taskTemplate = {
  text: null,
  remainingTime: START_TIME,
  totalTime: START_TIME,
  status: { isFinished: false, isCompleted: false },
  type: null,
  id: null,
  notification: {
    text: `Time remaining to complete
          the project: 5h 1m 32s`,
    isOpen: false,
    isCooldown: false,
    position: { x: null, y: null },
  },
  timeModal: {
    isOpen: false,
    date: null,
    time: null,
    position: { x: null, y: null },
  },
};

export default function App() {
  const [content, setContent] = useState(() => ({
    isActiveTab: "new",
    newTask: taskTemplate,
    actualTasks: getTasks("actual"),
    wastedTasks: getTasks("wasted"),
    completedTasks: getTasks("completed"),
    notification: { text: "Task saved!" },
  }));

  function jsonParse(json) {
    return JSON.parse(json);
  }
  function jsonStringify(json) {
    return JSON.stringify(json);
  }

  function getTypeFromClassName(elem) {
    return elem.classList[1].split("-")[1];
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
      const currentTask = content.actualTasks.filter(
        (task) => task.id == taskId
      )[0];
      currentTask.type = "completed";
      currentTask.status.isCompleted = true;
      saveTask(currentTask, "completed");
      removeTask(currentTarget, "actual");

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
                status: { ...task.status, isCompleted: true },
              })),
          ],
        };
      });
    }
  };

  const saveNewTask = (e) => {
    const target = e.target;

    if (target.closest('[name="save"]')) {
      if (
        !content.newTask.text ||
        !content.newTask.remainingTime ||
        !content.newTask.totalTime
      ) {
        console.log("Невозможно сохранить задачу");
        return;
      }

      console.log(`saveNewTask [counter]`, counter());

      const newTask = { ...content.newTask, id: counter(), type: "actual" };

      const newContent = {
        ...content,
        actualTasks: [...content.actualTasks, newTask],
        newTask: { ...taskTemplate },
      };

      setContent(() => {
        return newContent;
      });
      saveTask(newTask, "actual");

      return true;
    }

    console.log("Cannot save this Todo");
    return false;
  };

  const clearInputText = (e) => {
    const target = e.target;

    if (target.closest('[name="remove"]')) {
      target.closest(".todo").querySelector("input").value = "";

      setContent((prev) => {
        return { ...prev, newTask: { ...prev.newTask, text: null } };
      });
    }
  };

  const typeText = (e) => {
    setContent((prev) => {
      return { ...prev, newTask: { ...prev.newTask, text: e.target.value } };
    });
  };

  const deleteTask = (e) => {
    const target = e.target;
    const taskTarget = target.closest(".todo");
    const taskId = target.closest(".todo").id;
    const targetType = getTypeFromClassName(taskTarget);

    if (targetType == "new") return;

    const currentTask = content[targetType + "Tasks"].filter(
      (task) => task.id == taskId
    )[0];
    removeTask(currentTask, targetType);

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

      if (content.newTask.notification.isCooldown) {
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
    setContent((prev) => {
      return {
        ...prev,
        newTask: {
          ...prev.newTask,
          notification: {
            ...prev.newTask.notification,
            isOpen: true,
            position: { x: position.x - 30, y: position.y + 31 },
          },
        },
      };
    });
  };

  const hideNotification = () => {
    setContent((prev) => {
      return {
        ...prev,
        newTask: {
          ...prev.newTask,
          notification: { ...prev.newTask.notification, isOpen: false },
        },
      };
    });
  };

  function getTasks(type) {
    const correctType = type + "Tasks";
    if (isExistsTasks(correctType)) {
      return jsonParse(localStorage.getItem(correctType));
    }

    // console.log(isExistsTasks(correctType));
    // console.log(`correctType:`, correctType);

    return [];
  }

  function isExistsTasks(type) {
    return localStorage.getItem(type) ? true : false;
  }

  function saveTask(task, type) {
    const tasksList = getTasks(type);

    if (task) {
      tasksList.push(task);
    }

    const tasks = [
      {
        text: "Go to walk",
        remainingTime: 3600,
        totalTime: 3600,
        status: { isFinished: false, isCompleted: false },
        type: "actual",
        id: counter(),
        notification: {
          text: `Time remaining to complete
                the project: 5h 1m 32s`,
          isOpen: false,
          isCooldown: false,
          position: { x: null, y: null },
        },
      },
      {
        text: "Finish the project",
        remainingTime: 1800,
        totalTime: 3600,
        status: { isFinished: false, isCompleted: false },
        type: "actual",
        id: counter(),
        notification: {
          text: `Time remaining to complete
                the project: 5h 1m 32s`,
          isOpen: false,
          isCooldown: false,
          position: { x: null, y: null },
        },
      },
      {
        text: "Watch the movie after work",
        remainingTime: 900,
        totalTime: 3600,
        status: { isFinished: false, isCompleted: false },
        type: "actual",
        id: counter(),
        notification: {
          text: `Time remaining to complete
                the project: 5h 1m 32s`,
          isOpen: false,
          isCooldown: false,
          position: { x: null, y: null },
        },
      },
    ];

    // localStorage.setItem("actualTasks", jsonStringify(tasks));

    localStorage.setItem(type + "Tasks", jsonStringify(tasksList));
    console.log(`tasksList:`, tasksList);
  }

  // saveTask(newTask, 'actual');

  function removeTask(task, type) {
    const tasksList = getTasks(type);
    const newTasksList = tasksList.filter(
      (currentTask) => currentTask.id != task.id
    );

    localStorage.setItem(type + "Tasks", jsonStringify(newTasksList));
  }

  function interactOnTodo(e) {
    const target = e.target;
    const targetBtn = target.closest("button");

    if (targetBtn) {
      switch (targetBtn.name) {
        case "save":
          saveNewTask(e);
          break;

        case "time":
          showTimeModal(e);
          break;

        case "complete":
          completeTask(e);
          break;

        case "remove":
          deleteTask(e);
          break;

        default:
          console.log("There is no such action");
      }
    }
  }

  function showTimeModal(e) {
    const target = e.target;
    const targetBtn = target.closest("button");
    const targetSvg = targetBtn.querySelector("svg");

    const coordinates = targetSvg.getBoundingClientRect();
    const position = { x: coordinates.x - 30, y: coordinates.y + 30 };

    content.newTask.timeModal.isOpen
      ? closeTimeModal()
      : openTimeModal(position);
  }

  function openTimeModal(position) {
    setContent((prev) => {
      return {
        ...prev,
        newTask: {
          ...prev.newTask,
          timeModal: {
            ...prev.newTask.timeModal,
            isOpen: true,
            position: { ...position },
          },
        },
      };
    });
  }

  function closeTimeModal() {
    setContent((prev) => {
      return {
        ...prev,
        newTask: {
          ...prev.newTask,
          timeModal: { ...prev.newTask.timeModal, isOpen: false },
        },
      };
    });
  }

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
              <div className="todo todo-new" onClick={(e) => interactOnTodo(e)}>
                {/* <div className="todo todo-new" onClick={(e) => saveNewTask(e)}> */}
                <div className="todo-content">
                  <input
                    type="text"
                    placeholder="Enter the text..."
                    value={
                      content.newTask.text != null ? content.newTask.text : ""
                    }
                    onInput={(e) => typeText(e)}
                  />
                  <div className="todo-settings">
                    <Button name="save">
                      <Checkmark></Checkmark>
                    </Button>
                    <button className="btn" name="time">
                      <Time></Time>
                    </button>
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
        {content.newTask.notification.isOpen && (
          <ModalNotification newTask={content.newTask}></ModalNotification>
        )}
        {content.newTask.timeModal.isOpen && (
          <ModalSettings data={content.newTask.timeModal}></ModalSettings>
        )}
        {/* <div className="modal notification">
          <div className="content">
            <p className="text">{notificationText}</p>
          </div>
        </div> */}
      </div>
    </>
  );
}
