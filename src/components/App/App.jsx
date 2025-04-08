import "./App.scss";
import { useState, useEffect } from "react";

import { useTasks } from "../../hooks/useTasks";

import Providers from "../Providers";

import {
	correctDate,
	taskTemplate,
	computePercentOfTime,
} from "../../utils/utils";

import AppContainer from "../AppContainer";
import NewTask from "../NewTask";
import Task from "../Task";
import Empty from "../Empty";
import Button from "../Button";

export default function App() {
	const {
		tasks,
		addTask,
		wastedTasks,
		wasteTask,
		completedTasks,
		completeTask,
		deleteTask,
		updateTask,
	} = useTasks();
	const [content, setContent] = useState(() => ({
		isActiveTab: "new",
		newTask: taskTemplate,
		notification: { text: "Task saved!" },
	}));

	const switchTab = (e) => {
		setContent((prev) => {
			return {
				...prev,
				isActiveTab: e.target.name,
			};
		});
	};

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
				deleteTask={deleteTask}
				key={task.id}
				content={content}
				setContent={setContent}
			></Task>
		);
	});

	return (
		<Providers>
			<div className="app">
				<AppContainer>
					<div className="tabs">
						<button
							className={`btn ${content.isActiveTab == "new" ? "active" : ""}`}
							name="new"
							onClick={(e) => switchTab(e)}
						>
							New
						</button>
						<button
							className={`btn ${
								content.isActiveTab == "actual" ? "active" : ""
							}`}
							name="actual"
							onClick={(e) => switchTab(e)}
						>
							Actual
						</button>
						<button
							className={`btn ${
								content.isActiveTab == "wasted" ? "active" : ""
							}`}
							name="wasted"
							onClick={(e) => switchTab(e)}
						>
							Wasted
						</button>
						<button
							className={`btn ${
								content.isActiveTab == "completed" ? "active" : ""
							}`}
							name="completed"
							onClick={(e) => switchTab(e)}
						>
							Completed
						</button>
					</div>
					<div className="box">
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
							(completedTasks.length > 0 ? (
								completedTasksList
							) : (
								<Empty>Empty</Empty>
							))}
						{content.isActiveTab == "empty" && <Empty>Empty</Empty>}
					</div>
				</AppContainer>
			</div>
		</Providers>
	);
}
