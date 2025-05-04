import { highlightInvalidField, validateDate } from "../../utils/utils";

import { CheckmarkSVG, CalendarSVG, ClearSVG } from "../SVG";

import Button from "../Button";
import TextInput from "../TextInput";

import { useNewTask } from "../../features/newTask/useNewTask";
import { useDateModal } from "../../features/dateModal/useDateModal";
import { useNotificationModal } from "../../features/notificationModal/useNotificationModal";
import { useRef } from "react";

export default function NewTask({ addTask }) {
	const { newTask, input, handleFocus, handleBlur } = useNewTask();
	const { dateModal, handlers: dateModalHandlers } = useDateModal();
	const { showModal: showNotificationModal } = useNotificationModal();

	const newTaskRef = useRef(null);
	const inputFieldRef = useRef(null);

	return (
		<div
			className="todo todo-new"
			onClick={() => {
				handleFocus(newTaskRef);
			}}
			ref={newTaskRef}
			style={{
				border: dateModal.isOpen ? "1px solid rgba(10, 65, 75, 0.15)" : "",
			}}
		>
			<div className="todo-content">
				<TextInput
					value={input.bind.value}
					minLength={1}
					ref={inputFieldRef}
					onChange={input.bind.onChange}
					onFocus={() => handleFocus(newTaskRef, dateModal.isOpen)}
					onBlur={() => handleBlur(dateModal.isOpen)}
				></TextInput>
				<div className={`todo-settings ${newTask.isFocused ? "visible" : ""}`}>
					<Button
						name="save"
						onClick={() => {
							if (!validateDate(dateModal) || newTask.text.trim().length < 1) {
								highlightInvalidField(inputFieldRef, ".todo-new");
								return;
							}
							addTask(newTask, dateModal);

							showNotificationModal();

							input.handleClear();
							dateModalHandlers.resetDate();
						}}
					>
						<CheckmarkSVG></CheckmarkSVG>
					</Button>
					<Button
						name="time"
						className={dateModal.isOpen ? "open" : ""}
						onClick={(e) => {
							dateModalHandlers.showDateModal(e.currentTarget);
						}}
					>
						<CalendarSVG></CalendarSVG>
					</Button>
					<Button name="remove" onClick={input.handleClear}>
						<ClearSVG></ClearSVG>
					</Button>
				</div>
			</div>
		</div>
	);
}
