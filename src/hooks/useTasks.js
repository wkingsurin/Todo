import { useEffect, useState } from "react";
import { counter, objectClone } from "../utils/utils";

export function useTasks() {
	const [tasks, setTasks] = useState([]);
	const [wastedTasks, setWastedTasks] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);

	const addTask = (taskTemplate, dateModal) => {
		const taskClone = objectClone(taskTemplate);
		const time = dateModal.date - new Date();

		const newTask = {
			...taskClone,
			id: counter(),
			remainingTime: time,
			totalTime: time,
		};
		const newTasks = [...tasks, newTask];

		if (!taskTemplate.type) {
			console.log(`Невозможно сохранить задачу`);
			return;
		}

		setTasks(newTasks);

		localStorage.setItem("actualTasks", JSON.stringify(newTasks));
	};

	const completeTask = (taskId) => {
		const findTask = tasks.find((task) => task.id === taskId);
		if (!findTask) return;

		const taskToComplete = { ...findTask, type: "completed" };

		const newTasks = tasks.filter((task) => task.id !== taskId);
		const newCompletedTasks = [...completedTasks, taskToComplete];

		setTasks(newTasks);
		setCompletedTasks(newCompletedTasks);

		localStorage.setItem("actualTasks", JSON.stringify(newTasks));
		localStorage.setItem("completedTasks", JSON.stringify(newCompletedTasks));
	};

	const wasteTask = (taskId) => {
		const findTask = tasks.find((task) => task.id === taskId);
		if (!findTask) return;

		const taskToWaste = { ...findTask, type: "wasted" };

		const newTasks = tasks.filter((task) => task.id !== taskId);
		const newWastedTasks = [...wastedTasks, taskToWaste];

		setTasks(newTasks);
		setWastedTasks(newWastedTasks);

		localStorage.setItem("actualTasks", JSON.stringify(newTasks));
		localStorage.setItem("wastedTasks", JSON.stringify(newWastedTasks));
	};

	const deleteTask = (tasks, taskType, taskId) => {
		const taskToDelete = tasks.find((task) => task.id === taskId);
		if (!taskToDelete) return;

		const newTasks = tasks.filter((task) => task.id !== taskId);

		switch (taskType) {
			case "actual":
				setTasks(newTasks);
				break;

			case "wasted":
				setWastedTasks(newTasks);
				break;

			case "completed":
				setCompletedTasks(newTasks);
				break;
		}

		localStorage.setItem(`${taskType}Tasks`, JSON.stringify(newTasks));
	};

	useEffect(() => {
		const savedTasks = JSON.parse(localStorage.getItem("actualTasks")) || [];
		const savedWastedTasks =
			JSON.parse(localStorage.getItem("wastedTasks")) || [];
		const savedCompletedTasks =
			JSON.parse(localStorage.getItem("completedTasks")) || [];

		setTasks(savedTasks);
		setWastedTasks(savedWastedTasks);
		setCompletedTasks(savedCompletedTasks);
	}, []);

	return {
		tasks,
		completedTasks,
		wastedTasks,
		addTask,
		completeTask,
		wasteTask,
		deleteTask,
	};
}
