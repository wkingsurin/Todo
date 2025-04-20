import { validateDate } from "../../utils/utils";

import { Checkmark, Time, Close } from "../SVG";

import Button from "../Button";
import TextInput from "../TextInput";

import { useNewTask } from "../../features/newTask/useNewTask";
import { useDateModal } from "../../features/dateModal/useDateModal";
import { useModal } from "../../features/modal/useModal";
import { useRef } from "react";

export default function NewTask({ addTask }) {
	const { newTask, input, handleFocus } = useNewTask();
	const { dateModal, handlers: dateModalHandlers } = useDateModal();
	const { showModal } = useModal();

	const inputFieldRef = useRef(null);

	return (
		<div className="todo todo-new" onClick={handleFocus}>
			<div className="todo-content">
				<TextInput
					value={input.bind.value}
					onChange={input.bind.onChange}
					ref={inputFieldRef}
				></TextInput>
				<div className="todo-settings">
					<Button
						name="save"
						disabled={newTask.text ? false : true}
						onClick={() => {
							if (!validateDate(dateModal)) return;
							addTask(newTask, dateModal);

							showModal();

							input.clear();
						}}
					>
						<Checkmark></Checkmark>
					</Button>
					<Button
						name="time"
						onClick={(e) => {
							dateModalHandlers.showDateModal(e.currentTarget);
						}}
					>
						<Time></Time>
					</Button>
					<Button name="remove" onClick={input.clear}>
						<Close></Close>
					</Button>
				</div>
			</div>
		</div>
	);
}
