import { createContext, useContext, useReducer } from "react";
import { taskReducer } from "../../store/taskReducer";
import { taskTemplate } from "../../utils/utils";
import { useInput } from "../../hooks/useInput";

const TaskContext = createContext(taskTemplate);

export const TaskProvider = ({ children }) => {
	const [newTask, dispatch] = useReducer(taskReducer, taskTemplate);
	const dateInput = useInput("");
	const timeInput = useInput("");

	return (
		<TaskContext.Provider
			value={{
				newTask,
				dateInput,
				timeInput,
				dispatch,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};

export const useTask = () => {
	return useContext(TaskContext);
};
