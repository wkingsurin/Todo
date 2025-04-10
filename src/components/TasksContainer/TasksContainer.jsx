import { useEffect } from "react";
import { useTasks } from "../../hooks/useTasks";

import { computePercentOfTime } from "../../utils/utils";

import NewTask from "../NewTask";
import Task from "../Task";
import Empty from "../Empty";

export default function TasksContainer({ content, setContent }) {
	const {
		tasks,
		wastedTasks,
		completedTasks,
		addTask,
		completeTask,
		deleteTask,
		updateTask,
		updateTasks,
	} = useTasks();

	const actualTasksList = tasks.map((task) => {
		const width = computePercentOfTime(
			new Date(task.totalTime),
			new Date(task.remainingTime),
			task.status
		);

		return (
			<Task
				tasks={tasks}
				task={task}
				width={width}
				completeTaskListener={completeTask}
				deleteTask={deleteTask}
				updateTask={updateTask}
				updateTasks={updateTasks}
				key={task.id}
				content={content}
				setContent={setContent}
			></Task>
		);
	});

	const wastedTasksList = wastedTasks.map((task) => {
		return (
			<Task
				tasks={wastedTasks}
				task={task}
				width={100}
				completeTaskListener={completeTask}
				updateTask={updateTask}
				updateTasks={updateTasks}
				deleteTask={deleteTask}
				key={task.id}
				content={content}
				setContent={setContent}
			></Task>
		);
	});

	const completedTasksList = completedTasks.map((task) => {
		const width = computePercentOfTime(
			task.totalTime,
			task.remainingTime,
			task.status
		);

		return (
			<Task
				tasks={completedTasks}
				task={task}
				width={width}
				completeTaskListener={completeTask}
				updateTask={updateTask}
				updateTasks={updateTasks}
				deleteTask={deleteTask}
				key={task.id}
				content={content}
				setContent={setContent}
			></Task>
		);
	});

	useEffect(() => {
		const taskUpdateInterval = setInterval(() => {
			const updatedTasks = tasks.map((currentTask) => {
				const finishedTIme = new Date(
					new Date(currentTask.creationDate).getTime() + currentTask.totalTime
				);
				const remainingTime =
					finishedTIme - new Date() > 0 ? finishedTIme - new Date() : null;

				const status = {
					...currentTask.status,
					isFinished: remainingTime == null ? true : false,
				};

				const type =
					status.isFinished && !status.isCompleted
						? "wasted"
						: status.isCompleted
						? "completed"
						: "actual";

				return { ...currentTask, remainingTime, status, type };
			});

			if (updateTasks.length < 1) return;

			const toActive = updatedTasks.filter(
				(currentTask) => currentTask.type == "actual"
			);
			const toWasted = updatedTasks.filter(
				(currentTask) => currentTask.type == "wasted"
			);

			updateTasks(toActive, "actual");

			if (toWasted.length < 1) return;
			updateTasks([...wastedTasks, ...toWasted], "wasted");
		}, 1000);

		return () => {
			clearInterval(taskUpdateInterval);
		};
	}, [tasks]);

	return (
		<div className="tasks-container">
			{content.isActiveTab == "new" && (
				<NewTask
					addTask={addTask}
					setContent={setContent}
					content={content}
				></NewTask>
			)}
			{content.isActiveTab == "actual" &&
				(tasks.length > 0 ? actualTasksList : <Empty>Empty</Empty>)}
			{content.isActiveTab == "wasted" &&
				(wastedTasks.length > 0 ? wastedTasksList : <Empty>Empty</Empty>)}
			{content.isActiveTab == "completed" &&
				(completedTasks.length > 0 ? completedTasksList : <Empty>Empty</Empty>)}
			{content.isActiveTab == "empty" && <Empty>Empty</Empty>}
		</div>
	);
}
