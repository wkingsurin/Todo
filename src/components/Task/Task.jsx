import "./Task.scss";
import { useEffect } from "react";
import { Checkmark, Time, Close, Alert } from "../SVG";
import { saveTask, removeTask, hoverOnAlert } from "../../utils/utils";
import { useAlert } from "../../features/alert/useAlert";

export default function Task(props) {
	const { tasks, task, width, completeTaskListener, deleteTask, updateTask } =
		props;
	const { alert, setAlert } = useAlert();

	useEffect(() => {
		const taskUpdateInterval = setInterval(() => {
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

			setAlert((prev) => {
				return {
					...prev,
					text: `Time remaining to complete
					the project: ${correctRemainingTime(
						updatedTask.remainingTime,
						updatedTask.totalTime
					)}`,
				};
			});

			if (updatedTask.type == "actual" && updatedTask.remainingTime) {
				updateTask(updatedTask);
				saveTask(updatedTask, "actual");
			} else {
				updateTask(updatedTask);
				removeTask(updatedTask, "actual");
			}
			if (updatedTask.type == "wasted") {
				saveTask(updatedTask, "wasted");
			}
			if (updatedTask.type == "completed") {
				saveTask(updatedTask, "completed");
			}
		}, 1000);

		return () => {
			clearInterval(taskUpdateInterval);
		};
	}, []);

	// Fix it
	const correctRemainingTime = (remainingTime) => {
		let string = "";

		let years = Math.trunc(remainingTime / 1000 / 60 / 60 / 24 / 30 / 12);
		let months =
			Math.trunc(remainingTime / 1000 / 60 / 60 / 24 / 30) ||
			Math.trunc(remainingTime / 1000 / 60 / 60 / 24 / 30 - years * 12);
		let days =
			Math.trunc(remainingTime / 1000 / 60 / 60 / 24) ||
			Math.trunc(remainingTime / 1000 / 60 / 60 / 24 - months * 30);
		let hours =
			Math.trunc(remainingTime / 1000 / 60 / 60) ||
			Math.trunc(remainingTime / 1000 / 60 / 60 - days * 24);
		let minutes =
			Math.trunc(remainingTime / 1000 / 60) ||
			Math.trunc(remainingTime / 1000 / 60 - hours * 60);
		let seconds = Math.trunc(remainingTime / 1000 - minutes * 60);

		if (years) string += years + "y ";
		if (months) string += months + "m ";
		if (days) string += days + "d ";
		if (hours) string += hours + "h ";
		if (minutes) string += minutes + "m ";
		if (seconds) string += seconds + "s ";

		return string;
	};

	return (
		<div className={`todo todo-${task.type}`} id={task.id}>
			{task.type == "actual" && (
				<div
					className="notification"
					onMouseOver={(e) => hoverOnAlert(e, alert, setAlert)}
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
							onClick={() => {
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
						onClick={() => deleteTask(tasks, task.type, task.id)}
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
