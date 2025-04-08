import { createContext, useContext, useReducer } from "react";
import { taskReducer } from "../../store/taskReducer";
import { taskTemplate } from "../../utils/utils";

const TaskContext = createContext(taskTemplate);

export const TaskProvider = ({ children }) => {
	const [newTask, dispatch] = useReducer(taskReducer, taskTemplate);

	return (
		<TaskContext.Provider
			value={{
				newTask,
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
