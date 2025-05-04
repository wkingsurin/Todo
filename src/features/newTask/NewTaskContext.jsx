import { createContext, useReducer } from "react";
import { taskTemplate } from "../../utils/utils";
import { taskReducer } from "../../store/taskReducer";

export const NewTaskContext = createContext(taskTemplate);

export const NewTaskProvider = ({ children }) => {
	const [newTask, dispatch] = useReducer(taskReducer, taskTemplate);

	const handleTypeText = (text) => dispatch({ type: "TYPE_TEXT", text });
	const handleClear = () => dispatch({ type: "CLEAR_TEXT", text: "" });
	const handleFocus = (inputRef) => dispatch({ type: "FOCUS", inputRef });
	const handleBlur = (open) => dispatch({ type: "BLUR", open });

	return (
		<NewTaskContext.Provider
			value={{
				newTask,
				input: {
					bind: { value: newTask.text, onChange: handleTypeText },
					value: newTask.text,
					handleClear,
				},
				handleFocus,
				handleBlur,
			}}
		>
			{children}
		</NewTaskContext.Provider>
	);
};
