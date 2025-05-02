import React, { useEffect, useRef, useState } from "react";
import { useTasks } from "../../hooks/useTasks";

import {
	CSSTransition,
	Transition,
	TransitionGroup,
	SwitchTransition,
} from "react-transition-group";

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

	const [hasMounted, setHasMounted] = useState(false);

	const tasksRefs = useRef(new Map());
	tasks.forEach((task) => {
		if (!tasksRefs.current.has(task.id)) {
			tasksRefs.current.set(task.id, React.createRef());
		}
	});

	const wastedTasksRefs = useRef(new Map());
	wastedTasks.forEach((task) => {
		if (!wastedTasksRefs.current.has(task.id)) {
			wastedTasksRefs.current.set(task.id, React.createRef());
		}
	});

	const completedTasksRefs = useRef(new Map());
	completedTasks.forEach((task) => {
		if (!completedTasksRefs.current.has(task.id)) {
			completedTasksRefs.current.set(task.id, React.createRef());
		}
	});

	const activeTasksListRef = useRef(null);
	const wastedTasksListRef = useRef(null);
	const completedTasksListRef = useRef(null);
	const emptyRef = useRef(null);
	const newTabContentRef = useRef(null);
	const wastedTabContentRef = useRef(null);
	const completedTabContentRef = useRef(null);

	const tabContentRef = useRef(null);

	useEffect(() => {
		const taskUpdateInterval = setInterval(() => {
			const updatedTasks = tasks.map((currentTask) => {
				const finishedTIme = new Date(
					new Date(currentTask.creationDate).getTime() + currentTask.totalTime
				);
				const remainingTime =
					finishedTIme - new Date() > 0 ? finishedTIme - new Date() : null;

				const type = remainingTime !== null ? "active" : "wasted";

				return { ...currentTask, remainingTime, type };
			});

			if (updateTasks.length < 1) return;

			const toActive = updatedTasks.filter(
				(currentTask) => currentTask.type == "active"
			);
			const toWasted = updatedTasks.filter(
				(currentTask) => currentTask.type == "wasted"
			);

			updateTasks(toActive, "active");

			if (toWasted.length < 1) return;
			updateTasks([...wastedTasks, ...toWasted], "wasted");
		}, 1000);

		setHasMounted(true);

		return () => {
			clearInterval(taskUpdateInterval);
		};
	}, [tasks]);

	return (
		<div className="tasks-container">
			{hasMounted && (
				<SwitchTransition mode="out-in">
					<CSSTransition
						key={content.activeTab}
						timeout={300}
						classNames="fade"
						nodeRef={tabContentRef}
						mountOnEnter
						unmountOnExit
					>
						<div className="tabs-wrapper" ref={tabContentRef}>
							{content.activeTab === "new" && (
								<>
									<div
										className={`tasks-block ${
											content.activeTab === "new" ? "visible" : "hidden"
										}`}
										ref={newTabContentRef}
									>
										<NewTask
											addTask={addTask}
											setContent={setContent}
											content={content}
										></NewTask>
										<div className="separator"></div>
										<Transition
											in={tasks.length > 0}
											timeout={500}
											nodeRef={activeTasksListRef}
											unmountOnExit
											mountOnEnter
										>
											{(state) => (
												<div
													className={`tasks-container ${state}`}
													ref={activeTasksListRef}
												>
													<TransitionGroup component={null}>
														{tasks.map((task) => {
															const width = computePercentOfTime(
																new Date(task.totalTime),
																new Date(task.remainingTime),
																task.type
															);

															return (
																<CSSTransition
																	key={task.id}
																	timeout={500}
																	classNames="todo"
																	nodeRef={tasksRefs.current.get(task.id)}
																	appear={hasMounted}
																	unmountOnExit
																	mountOnEnter
																>
																	<Task
																		tasks={tasks}
																		task={task}
																		width={width}
																		completeTaskListener={completeTask}
																		deleteTask={deleteTask}
																		updateTask={updateTask}
																		updateTasks={updateTasks}
																		content={content}
																		setContent={setContent}
																		ref={tasksRefs.current.get(task.id)}
																	></Task>
																</CSSTransition>
															);
														})}
													</TransitionGroup>
												</div>
											)}
										</Transition>
									</div>
									<Transition
										in={tasks.length === 0}
										timeout={500}
										nodeRef={emptyRef}
										unmountOnExit
										mountOnEnter
									>
										{(state) => (
											<Empty className={`empty ${state}`} ref={emptyRef}>
												Empty
											</Empty>
										)}
									</Transition>
								</>
							)}
							{content.activeTab === "wasted" && (
								<>
									<div
										className={`tasks-block ${
											content.activeTab === "wasted" ? "visible" : "hidden"
										}`}
										ref={wastedTabContentRef}
									>
										<Transition
											in={wastedTasks.length > 0}
											timeout={500}
											nodeRef={wastedTasksListRef}
											unmountOnExit
											mountOnEnter
										>
											{(state) => (
												<div
													className={`tasks-container ${state}`}
													ref={wastedTasksListRef}
												>
													<TransitionGroup component={null}>
														{wastedTasks.map((task) => {
															return (
																<CSSTransition
																	key={task.id}
																	timeout={500}
																	classNames="todo"
																	unmountOnExit
																	mountOnEnter
																	nodeRef={wastedTasksRefs.current.get(task.id)}
																>
																	<Task
																		tasks={wastedTasks}
																		task={task}
																		width={100}
																		completeTaskListener={completeTask}
																		deleteTask={deleteTask}
																		updateTask={updateTask}
																		updateTasks={updateTasks}
																		content={content}
																		setContent={setContent}
																		ref={wastedTasksRefs.current.get(task.id)}
																	></Task>
																</CSSTransition>
															);
														})}
													</TransitionGroup>
												</div>
											)}
										</Transition>
									</div>
									<Transition
										in={wastedTasks.length === 0}
										timeout={500}
										nodeRef={emptyRef}
										unmountOnExit
										mountOnEnter
									>
										{(state) => (
											<Empty className={`empty ${state}`} ref={emptyRef}>
												Empty
											</Empty>
										)}
									</Transition>
								</>
							)}
							{content.activeTab === "completed" && (
								<>
									<div
										className={`tasks-block ${
											content.activeTab === "completed" ? "visible" : "hidden"
										}`}
										ref={completedTabContentRef}
									>
										<Transition
											in={completedTasks.length > 0}
											timeout={500}
											nodeRef={completedTasksListRef}
											unmountOnExit
											mountOnEnter
										>
											{(state) => (
												<div
													className={`tasks-container ${state}`}
													ref={completedTasksListRef}
												>
													<TransitionGroup component={null}>
														{completedTasks.map((task) => {
															return (
																<CSSTransition
																	key={task.id}
																	timeout={500}
																	classNames="todo"
																	unmountOnExit
																	mountOnEnter
																	nodeRef={completedTasksRefs.current.get(
																		task.id
																	)}
																>
																	<Task
																		tasks={completedTasks}
																		task={task}
																		width={100}
																		completeTaskListener={completeTask}
																		deleteTask={deleteTask}
																		updateTask={updateTask}
																		updateTasks={updateTasks}
																		content={content}
																		setContent={setContent}
																		ref={completedTasksRefs.current.get(
																			task.id
																		)}
																	></Task>
																</CSSTransition>
															);
														})}
													</TransitionGroup>
												</div>
											)}
										</Transition>
									</div>
									<Transition
										in={completedTasks.length === 0}
										timeout={500}
										nodeRef={emptyRef}
										unmountOnExit
										mountOnEnter
									>
										{(state) => (
											<Empty className={`empty ${state}`} ref={emptyRef}>
												Empty
											</Empty>
										)}
									</Transition>
								</>
							)}
						</div>
					</CSSTransition>
				</SwitchTransition>
			)}
		</div>
	);
}
