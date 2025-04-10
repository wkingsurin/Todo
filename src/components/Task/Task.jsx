import "./Task.scss";
import { Checkmark, Time, Close, Alert } from "../SVG";
import { hoverOnAlert } from "../../utils/utils";
import { useAlert } from "../../features/alert/useAlert";

export default function Task(props) {
	const { tasks, task, width, completeTaskListener, deleteTask } = props;
	const { alert, setAlert } = useAlert();

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

	// useEffect(() => {
	// }, []);

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
