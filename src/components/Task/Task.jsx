import "./Task.scss";
import { CheckmarkSVG, RemoveSVG, AlertSVG } from "../SVG";
import { hoverOnAlert, changeAlertMessage } from "../../utils/utils";
import { useAlertModal } from "../../features/alertModal/useAlertModal";
import { useEffect } from "react";

import Button from "../Button";
import ProgressBar from "../ProgressBar";

export default function Task(props) {
	const { tasks, task, width, completeTaskListener, deleteTask, ref } = props;
	const {
		alertModal,
		setAlertModal,
		hideAlert: hideAlertModal,
	} = useAlertModal();

	const handleMouseEnter = (e) => {
		hoverOnAlert(e.currentTarget, alertModal, setAlertModal);
		setAlertModal((prev) => {
			if (prev.hoveredTaskId === task.id) return prev;

			changeAlertMessage(task.remainingTime, setAlertModal);

			return { ...prev, hoveredTaskId: task.id, hovered: true };
		});
	};

	useEffect(() => {
		if (alertModal.hoveredTaskId != task.id) return;

		const timer = setInterval(() => {
			changeAlertMessage(task.remainingTime, setAlertModal);
		}, 1000);

		return () => clearInterval(timer);
	}, [task, alertModal.hoveredTaskId]);

	return (
		<div className={`todo todo-${task.type}`} id={task.id} ref={ref}>
			{task.type === "active" && (
				<div
					className="notification"
					onMouseEnter={(e) => {
						if (!alertModal.hovered) {
							handleMouseEnter(e);
						}
					}}
					onMouseLeave={() => {
						hideAlertModal();
					}}
				>
					<AlertSVG></AlertSVG>
				</div>
			)}
			<div className="todo-content">
				<div className="text">{task.text}</div>
				<div className="todo-settings">
					{task.type === "active" && (
						<Button
							name="complete"
							onClick={() => {
								completeTaskListener(task.id);
							}}
						>
							<CheckmarkSVG></CheckmarkSVG>
						</Button>
					)}
					<Button
						name="remove"
						onClick={() => deleteTask(tasks, task.type, task.id)}
					>
						<RemoveSVG></RemoveSVG>
					</Button>
				</div>
				<ProgressBar task={task} width={width}></ProgressBar>
			</div>
		</div>
	);
}
