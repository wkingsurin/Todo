import "./Task.scss";
import { useEffect, useState } from "react";
import { Checkmark, Time, Close, Alert } from "../SVG";
import { getTasks, saveTask, removeTask } from "../../utils/utils";

export default function Task(props) {
	const {
		tasks,
		task,
		width,
		completeTaskListener,
		deleteTask,
		hoverOnNotification,
	} = props;

	useEffect(() => {
		const interval = setInterval(() => {
			if (task.type !== "actual") return;

			const updatedTasks = tasks.map((currentTask) => {
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

			const updatedTask = updatedTasks.find(
				(currentTask) => currentTask.id == task.id
			);

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

			// setContent((prev) => {
			// 	return {
			// 		...prev,
			// 		actualTasks: getTasks("actual"),
			// 		wastedTasks: getTasks("wasted"),
			// 		completedTasks: getTasks("completed"),
			// 	};
			// });
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={`todo todo-${task.type}`} id={task.id}>
			{task.type == "actual" && (
				<div
					className="notification"
					onMouseOver={(e) => hoverOnNotification(e)}
				>
					<Alert></Alert>
				</div>
			)}
			<div className="todo-content">
				<div className="text">{task.text}</div>
				<div className="todo-settings">
					{task.type == "actual" && (
						<button
							className="btn"
							name="complete"
							onClick={(e) => {
								completeTaskListener(task.id);
							}}
						>
							<Checkmark></Checkmark>
						</button>
					)}
					{/* <button className="btn">
                <Time fill={"#95FF8F"}></Time>
              </button> */}
					<button
						className="btn"
						name="remove"
						onClick={(e) => deleteTask(tasks, task.type, task.id)}
					>
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
