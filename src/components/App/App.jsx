import "./App.scss";
import { Checkmark, Time, Close, Notification } from "../SVG";

export default function App() {
  const isActiveTab = "actual";
  const notificationText = `Time remaining to complete the project: 5h 1m 32s`;

  return (
    <>
      <div className="app">
        <div className="app-container">
          <div className="tabs">
            <button className={`btn ${isActiveTab == "new" && "active"}`}>
              New
            </button>
            <button className={`btn ${isActiveTab == "actual" && "active"}`}>
              Actual
            </button>
            <button className={`btn ${isActiveTab == "wasted" && "active"}`}>
              Wasted
            </button>
            <button className={`btn ${isActiveTab == "completed" && "active"}`}>
              Completed
            </button>
          </div>
          <div className="box">
            {isActiveTab == "new" && (
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
            {isActiveTab == "actual" && (
              <>
                <div className="todo todo-actual">
                  <div className="notification">
                    <Notification></Notification>
                  </div>
                  <div className="todo-content">
                    <div className="text">Create project for client</div>
                    <div className="todo-settings">
                      <button className="btn">
                        <Checkmark></Checkmark>
                      </button>
                      <button className="btn">
                        <Close></Close>
                      </button>
                    </div>
                    <div className="time-bar"></div>
                  </div>
                </div>
                <div className="todo todo-actual">
                  <div className="notification">
                    <Notification></Notification>
                  </div>
                  <div className="todo-content">
                    <div className="text">Create project for client</div>
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
                      style={{ width: "50%", background: "#F2FF8F" }}
                    ></div>
                  </div>
                </div>
                <div className="todo todo-actual">
                  <div className="notification">
                    <Notification></Notification>
                  </div>
                  <div className="todo-content">
                    <div className="text">Create project for client</div>
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
                      style={{ width: "25%", background: "#F9C68F" }}
                    ></div>
                  </div>
                </div>
                <div className="todo todo-actual">
                  <div className="notification">
                    <Notification></Notification>
                  </div>
                  <div className="todo-content">
                    <div className="text">Create project for client</div>
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
                      style={{ width: "12.5%", background: "#FF8F8F" }}
                    ></div>
                  </div>
                </div>
              </>
            )}
            {isActiveTab == "wasted" && (
              <div className="todo todo-wasted">
                <div className="todo-content">
                  <div className="text">Create project for client</div>
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
            )}
            {isActiveTab == "completed" && (
              <div className="todo todo-completed">
                <div className="todo-content">
                  <div className="text">Create project for client</div>
                  <div className="todo-settings">
                    <button className="btn">
                      <Close></Close>
                    </button>
                  </div>
                  <div className="time-bar"></div>
                </div>
              </div>
            )}
            {isActiveTab == "empty" && <p className="empty">Empty</p>}
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
