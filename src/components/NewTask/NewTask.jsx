import { Checkmark, Time, Close } from "../SVG";
import Button from "../Button";

export default function NewTask(props) {
	const { interactOnTodo, content, typeText, clearInputText } = props;

	return (
		<div className="todo todo-new" onClick={(e) => interactOnTodo(e)}>
			<div className="todo-content">
				<input
					type="text"
					placeholder="Enter the text..."
					value={content.newTask.text != null ? content.newTask.text : ""}
					onInput={(e) => typeText(e)}
				/>
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
