import "./Task.scss";
import { CheckmarkSVG, RemoveSVG, AlertSVG } from "../SVG";
import { hoverOnAlert, changeAlertMessage } from "../../utils/utils";
import { useAlert } from "../../features/alert/useAlert";
import { useEffect } from "react";

export default function Task(props) {
	const { tasks, task, width, completeTaskListener, deleteTask, ref } = props;
	const { alert, setAlert, hideAlert } = useAlert();

	const handleMouseEnter = (e) => {
		hoverOnAlert(e.currentTarget, alert, setAlert);
		setAlert((prev) => {
			if (prev.hoveredTaskId === task.id) return prev;

			changeAlertMessage(task.remainingTime, setAlert);

			return { ...prev, hoveredTaskId: task.id, hovered: true };
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
					onMouseEnter={(e) => {
						if (!alert.hovered) {
							handleMouseEnter(e);
						}
					}}
					onMouseLeave={() => {
						hideAlert();
					}}
				>
					<AlertSVG></AlertSVG>
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
							<CheckmarkSVG></CheckmarkSVG>
						</button>
					)}
					<button
						className="btn"
						name="remove"
						onClick={() => deleteTask(tasks, task.type, task.id)}
					>
						<RemoveSVG></RemoveSVG>
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
