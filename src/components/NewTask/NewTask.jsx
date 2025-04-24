import { highlightInvalidField, validateDate } from "../../utils/utils";

import { CheckmarkSVG, CalendarSVG, ClearSVG } from "../SVG";

import Button from "../Button";
import TextInput from "../TextInput";

import { useNewTask } from "../../features/newTask/useNewTask";
import { useDateModal } from "../../features/dateModal/useDateModal";
import { useModal } from "../../features/modal/useModal";
import { useRef } from "react";

export default function NewTask({ addTask }) {
	const { newTask, input, handleFocus, handleBlur } = useNewTask();
	const { dateModal, handlers: dateModalHandlers } = useDateModal();
	const { showModal } = useModal();

	const newTaskRef = useRef(null);
	const inputFieldRef = useRef(null);

	return (
		<div
			className="todo todo-new"
			onClick={() => {
				handleFocus(newTaskRef);
			}}
			ref={newTaskRef}
		>
			<div className="todo-content">
				<TextInput
					value={input.bind.value}
					onChange={input.bind.onChange}
					onFocus={() => handleFocus(newTaskRef, dateModal.isOpen)}
					onBlur={() => handleBlur(dateModal.isOpen)}
					ref={inputFieldRef}
					minLength={1}
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

							showModal();

							input.clear();
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
					<Button name="remove" onClick={input.clear}>
						<ClearSVG></ClearSVG>
					</Button>
				</div>
			</div>
		</div>
	);
}
