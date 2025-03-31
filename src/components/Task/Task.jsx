import "./Task.scss";
import { useEffect } from "react";
import { Checkmark, Time, Close, Notification } from "../SVG";
import {
	getTasks,
	saveTask,
	removeTask,
} from "../../assets/utils";

export default function Task(props) {
	const {
		task,
		width,
		completeTaskListener,
		deleteTask,
		hoverOnNotification,
		content,
		setContent,
	} = props;

	useEffect(() => {
		const interval = setInterval(() => {
			if (content.isActiveTab != "actual") return;

			const activeTasks = getTasks("actual");

			const updatedTasks = activeTasks.map((currentTask) => {
				const finishedTIme = new Date(
					new Date(task.creationDate).getTime() + task.totalTime
				);
				const remainingTime =
					finishedTIme - new Date() > 0 ? finishedTIme - new Date() : null;

				const status = {
					...task.status,
					isFinished: remainingTime == null ? true : false,
				};

				const type =
					status.isFinished && !status.isCompleted
						? "wasted"
						: status.isCompleted
						? "completed"
						: "actual";

				return { ...currentTask, remainingTime, status, type };
			});

			const updatedTask = updatedTasks.filter(
				(currentTask) => currentTask.id == task.id
			)[0];

      if (updatedTask.type == "actual" && updatedTask.remainingTime) {
				saveTask(updatedTask, "actual");
			} else {
				removeTask(updatedTask, "actual");
			}
			if (updatedTask.type == "wasted") {
				saveTask(updatedTask, "wasted");
			}
			if (updatedTask.type == "completed") {
				saveTask(updatedTask, "completed");
			}

			setContent((prev) => {
				return {
					...prev,
					actualTasks: getTasks("actual"),
					wastedTasks: getTasks("wasted"),
					completedTasks: getTasks("completed"),
				};
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

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
