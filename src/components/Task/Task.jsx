import "./Task.scss";
import { Checkmark, Time, Close, Alert } from "../SVG";
import { hoverOnAlert, changeAlertMessage } from "../../utils/utils";
import { useAlert } from "../../features/alert/useAlert";
import { useEffect } from "react";

export default function Task(props) {
	const { tasks, task, width, completeTaskListener, deleteTask, ref } = props;
	const { alert, setAlert, hideAlert } = useAlert();

	const handleMouseEnter = () => {
		setAlert((prev) => {
			if (prev.hoveredTaskId === task.id) return prev;

			changeAlertMessage(task.remainingTime, setAlert);

			return { ...prev, hoveredTaskId: task.id };
		});
	};

	useEffect(() => {
		if (alert.hoveredTaskId != task.id) return;

		const timer = setInterval(() => {
			changeAlertMessage(task.remainingTime, setAlert);
		}, 1000);

		return () => clearInterval(timer);
	}, [task, alert.hoveredTaskId]);

	return (
		<div className={`todo todo-${task.type}`} id={task.id} ref={ref}>
			{task.type == "actual" && (
				<div
					className="notification"
					tabIndex={0}
					onMouseOver={(e) => {
						hoverOnAlert(e, alert, setAlert, task.remainingTime);
					}}
					onMouseEnter={(e) => {
						handleMouseEnter();
					}}
					onMouseLeave={(e) => {
						hideAlert();
					}}
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
						background: task.type == "wasted" ? "#E64F4F" : "#4FE681",
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
