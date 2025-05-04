import { useContext } from "react";
import { NewTaskContext } from "./NewTaskContext";

export const useNewTask = () => {
	return useContext(NewTaskContext);
};
