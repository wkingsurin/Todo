import { useTask } from "./TaskContext";

export function useNewTask() {
	const { newTask, dispatch } = useTask();

	const typeText = (text) => dispatch({ type: "TYPE_TEXT", text });
	const clear = () => dispatch({ type: "CLEAR_TEXT", text: "" });
	const handleFocus = (inputRef) => dispatch({ type: "FOCUS", inputRef });
	const handleBlur = (open) => dispatch({ type: "BLUR", open });

	return {
		newTask,
		input: {
			bind: { value: newTask.text, onChange: typeText },
			value: newTask.text,
			clear,
		},
		handleFocus,
		handleBlur,
	};
}
