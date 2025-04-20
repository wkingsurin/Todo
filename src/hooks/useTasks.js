import { useEffect, useState } from "react";
import { counter, objectClone, saveTasks } from "../utils/utils";

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
			creationDate: new Date(),
		};
		const newTasks = [...tasks, newTask];

		if (!taskTemplate.type) {
			console.log(`Невозможно сохранить задачу`);
			return;
		}

		setTasks(newTasks);

		try {
			localStorage.setItem("actualTasks", JSON.stringify(newTasks));
		} catch (e) {
			console.log(e.message);
		}
	};

	const completeTask = (taskId) => {
		const findTask = tasks.find((task) => task.id === taskId);
		if (!findTask) return;

		const taskToComplete = {
			...findTask,
			type: "completed",
			status: { ...findTask.status, isCompleted: true },
		};

		const newTasks = tasks.filter((task) => task.id !== taskId);
		const newCompletedTasks = [...completedTasks, taskToComplete];

		setTasks(newTasks);
		setCompletedTasks(newCompletedTasks);

		try {
			localStorage.setItem("actualTasks", JSON.stringify(newTasks));
			localStorage.setItem("completedTasks", JSON.stringify(newCompletedTasks));
		} catch (e) {
			console.log(e.message);
		}
	};

	const wasteTask = (taskId) => {
		const findTask = tasks.find((task) => task.id === taskId);
		if (!findTask) return;

		const taskToWaste = { ...findTask, type: "wasted" };

		const newTasks = tasks.filter((task) => task.id !== taskId);
		const newWastedTasks = [...wastedTasks, taskToWaste];

		setTasks(newTasks);
		setWastedTasks(newWastedTasks);

		try {
			localStorage.setItem("actualTasks", JSON.stringify(newTasks));
			localStorage.setItem("wastedTasks", JSON.stringify(newWastedTasks));
		} catch (e) {
			console.log(e.message);
		}
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

		try {
			localStorage.setItem(`${taskType}Tasks`, JSON.stringify(newTasks));
		} catch (e) {
			console.log(e.message);
		}
	};

	const updateTask = (taskToUpdate) => {
		const findTask = tasks.find((task) => task.id === taskToUpdate.id);
		if (!findTask) return;
		const taskToUpdateClone = objectClone(taskToUpdate);

		const filteredTasks = tasks.filter((task) => task.id !== taskToUpdate.id);

		if (!taskToUpdate.remainingTime) {
			const newWastedTasks = [...wastedTasks, taskToUpdateClone];

			setTasks(filteredTasks);
			setWastedTasks(newWastedTasks);

			try {
				localStorage.setItem("actualTasks", JSON.stringify(filteredTasks));
				localStorage.setItem("wastedTasks", JSON.stringify(newWastedTasks));
			} catch (e) {
				console.log(e.message);
			}
		} else {
			const newTasks = [...filteredTasks, taskToUpdateClone];

			setTasks(newTasks);

			try {
				localStorage.setItem("actualTasks", JSON.stringify(newTasks));
			} catch (e) {
				console.log(e.message);
			}
		}
	};
	const updateTasks = (tasks, type) => {
		switch (type) {
			case "actual": {
				setTasks(tasks);
				saveTasks(tasks, type);

				break;
			}

			case "wasted": {
				setWastedTasks(tasks);
				saveTasks(tasks, type);

				break;
			}

			default:
				break;
		}
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
		updateTask,
		updateTasks,
		setTasks,
		setWastedTasks,
		setCompletedTasks,
	};
}
