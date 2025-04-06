import { Checkmark, Time, Close } from "../SVG";
import Button from "../Button";
import TextInput from "../TextInput";
import { useNewTask } from "../../features/newTask/useNewTask";
import { useDateModal } from "../../features/dateModal/useDateModal";
import { correctDate, validateDate } from "../../utils/utils";

export default function NewTask({ addTask }) {
	const { newTask, input, dateInput, timeInput } = useNewTask();
	const {
		dateModal,
		dispatch: dateModalDispatch,
		handlers: dateModalHandlers,
	} = useDateModal();

	return (
		<div className="todo todo-new">
			<div className="todo-content">
				<TextInput {...input.bind}></TextInput>
				<div className="todo-settings">
					<Button
						name="save"
						disabled={newTask.text ? false : true}
						onClick={() => {
							if (!validateDate(dateModal)) return
							addTask(newTask);
							input.clear();
						}}
					>
						<Checkmark></Checkmark>
					</Button>
					<Button
						name="time"
						onClick={(e) => {
							dateInput.setInput(correctDate(new Date()));
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
