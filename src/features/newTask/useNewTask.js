import { useTask } from "./TaskContext";

export function useNewTask() {
	const { newTask, dateInput, timeInput, dispatch } = useTask();

	const typeText = (text) => dispatch({ type: "TYPE_TEXT", text });
	const clear = () => dispatch({ type: "CLEAR_TEXT", text: "" });

	return {
		newTask,
		input: {
			bind: { value: newTask.text, onChange: typeText },
			value: newTask.text,
			clear,
		},
		dateInput,
		timeInput,
	};
}
