import "./Task.scss";
import { Checkmark, Time, Close, Notification } from "../SVG";

export default function Task(props) {
  const { task, width, completeTaskListener, deleteTask, hoverOnNotification } =
    props;

  return (
    <div
      className={`todo todo-${task.type}`}
      onClick={(e) => {
        completeTaskListener(e);
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
          <button className="btn" name="remove" onClick={(e) => deleteTask(e)}>
            <Close></Close>
          </button>
        </div>
        <div
          className="time-bar"
          style={{
            width: width + "%",
            // background:
            //   width > 50 ? "#95FF8F" : width > 25 ? "#F2FF8F" : "#F9C68F",
            animation:
              width == 100
                ? ""
                : `animatedBackground ${Math.floor(
                    task.remainingTime / 1000
                  )}s linear`,
          }}
        ></div>
      </div>
    </div>
  );
}
