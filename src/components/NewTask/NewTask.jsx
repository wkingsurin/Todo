import { Checkmark, Time, Close } from "../SVG";
import Button from "../Button";
import TextInput from "../TextInput";

export default function NewTask(props) {
	const { interactOnTodo, setContent, content } = props;

	const typeText = (e) => {
		// Костыль - убрать, когда вынесу стейт в компоненты
		setContent((prev) => {
			const task = { ...prev.newTask, text: e.target.value };

			return { ...prev, newTask: task };
		});
	};

	const clearInputText = (e) => {
		const target = e.target;

		if (target.closest('[name="remove"]')) {
			target.closest(".todo").querySelector("input").value = "";

			setContent((prev) => {
				return { ...prev, newTask: { ...prev.newTask, text: null } };
			});
		}
	};

	return (
		<div className="todo todo-new" onClick={(e) => interactOnTodo(e)}>
			<div className="todo-content">
				<TextInput value={content.newTask.text} typeText={typeText}></TextInput>
				<div className="todo-settings">
					<Button name="save">
						<Checkmark></Checkmark>
					</Button>
					<button className="btn" name="time">
						<Time></Time>
					</button>
					<Button name="remove" onClick={clearInputText}>
						<Close></Close>
					</Button>
				</div>
			</div>
		</div>
	);
}
