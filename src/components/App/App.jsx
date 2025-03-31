import "./App.scss";
import { Chevron } from "../SVG";
import { useState, useEffect } from "react";
import {
	counter,
	correctDate,
	taskTemplate,
	getTasks,
	saveTask,
	removeTask,
	updateTasks,
	getTypeFromClassName,
	computePercentOfTime,
} from "../../assets/utils";
import ModalNotification from "../ModalNotification";
import ModalSettings from "../ModalSettings";
import Empty from "../Empty";
import Task from "../Task";
import Modal from "../Modal";
import NewTask from "../NewTask";

export default function App() {
	const [content, setContent] = useState(() => ({
		isActiveTab: "new",
		newTask: taskTemplate,
		actualTasks: getTasks("actual"),
		wastedTasks: getTasks("wasted"),
		completedTasks: getTasks("completed"),
		notification: { text: "Task saved!" },
	}));

	const switchTab = (e) => {
		setContent((prev) => {
			return { ...prev, isActiveTab: e.target.name };
		});
	};

	const completeTask = (e) => {
		const target = e.target;
		const currentTarget = e.currentTarget;
		const taskId = currentTarget.id;

		if (target.closest('[name="complete"]')) {
			const currentTask = content.actualTasks.filter(
				(task) => task.id == taskId
			)[0];
			currentTask.type = "completed";
			currentTask.status.isCompleted = true;
			saveTask(currentTask, "completed");
			removeTask(currentTarget, "actual");

			setContent((prev) => {
				return {
					...prev,
					actualTasks: prev.actualTasks.filter((task) => task.id != taskId),
					completedTasks: [
						...prev.completedTasks,
						...prev.actualTasks
							.filter((task) => task.id == taskId)
							.map((task) => ({
								...task,
								type: "completed",
								status: { ...task.status, isCompleted: true },
							})),
					],
				};
			});
		}
	};

	const saveNewTask = (e) => {
		const target = e.target;

		if (target.closest('[name="save"]')) {
			if (
				!content.newTask.text ||
				!content.newTask.dateModal.data.hours ||
				!Number.isFinite(content.newTask.dateModal.data.minutes) ||
				!content.newTask.dateModal.data.day ||
				!content.newTask.dateModal.data.month ||
				!content.newTask.dateModal.data.year
			) {
				console.log("Невозможно сохранить задачу");
				return;
			}

			const newTask = {
				...content.newTask,
				id: counter(setContent),
				type: "actual",
				creationDate: new Date(),
			};

			const newContent = {
				...content,
				actualTasks: [...content.actualTasks, newTask],
				newTask: { ...taskTemplate },
			};

			setContent(() => {
				return newContent;
			});
			saveTask(newTask, "actual");
			showModal(e);
			setTimeout(() => hideModal(), 1500);

			return true;
		}

		console.log("Cannot save this Todo");
		return false;
	};

	const clearInputText = (e) => {
		const target = e.target;

		if (target.closest('[name="remove"]')) {
			target.closest(".todo").querySelector("input").value = "";

			setContent((prev) => {
				return { ...prev, newTask: { ...prev.newTask, text: null } };
			});
		}
	};

	const typeText = (e) => {
		setContent((prev) => {
			return { ...prev, newTask: { ...prev.newTask, text: e.target.value } };
		});
	};

	const deleteTask = (e) => {
		const target = e.target;
		const taskTarget = target.closest(".todo");
		const taskId = target.closest(".todo").id;
		const targetType = getTypeFromClassName(taskTarget);

		if (targetType == "new") return;

		const currentTask = content[targetType + "Tasks"].filter(
			(task) => task.id == taskId
		)[0];
		removeTask(currentTask, targetType);

		setContent((prev) => {
			return {
				...prev,
				actualTasks: prev.actualTasks.filter((task) => task.id != taskId),
				wastedTasks: prev.wastedTasks.filter((task) => task.id != taskId),
				completedTasks: prev.completedTasks.filter((task) => task.id != taskId),
			};
		});
	};

	const hoverOnNotification = (e) => {
		const target = e.target;

		if (target.closest("svg")) {
			const coordinates = target.closest("svg").getBoundingClientRect();

			if (content.newTask.notification.isCooldown) {
				return;
			} else {
				showNotification(coordinates);
				// setNewTask((prev) => {
				//   return {
				//     ...prev,
				//     notification: { ...prev.notification, isCooldown: true },
				//   };
				// });
				// setTimeout(
				//   () =>
				//     setNewTask((prev) => {
				//       return {
				//         ...prev,
				//         notification: { ...prev.notification, isCooldown: false },
				//       };
				//     }),
				//   1500
				// );
			}
		} else {
			hideNotification();
		}
	};

	const showNotification = (position) => {
		setContent((prev) => {
			return {
				...prev,
				newTask: {
					...prev.newTask,
					notification: {
						...prev.newTask.notification,
						isOpen: true,
						position: { x: position.x - 30, y: position.y + 31 },
					},
				},
			};
		});
	};

	const hideNotification = () => {
		setContent((prev) => {
			return {
				...prev,
				newTask: {
					...prev.newTask,
					notification: { ...prev.newTask.notification, isOpen: false },
				},
			};
		});
	};

	function interactOnTodo(e) {
		const target = e.target;
		const targetBtn = target.closest("button");

		if (targetBtn) {
			switch (targetBtn.name) {
				case "save":
					saveNewTask(e);
					break;

				case "time":
					showDateModal(e);
					break;

				case "complete":
					completeTask(e);
					break;

				case "remove":
					deleteTask(e);
					break;

				default:
					console.log("There is no such action");
			}
		}
	}

	function showDateModal(e) {
		const target = e.target;
		const targetBtn = target.closest("button");
		const targetSvg = targetBtn.querySelector("svg");

		const coordinates = targetSvg.getBoundingClientRect();
		console.log(`coordinates`, coordinates);
		const position = { x: coordinates.right - 254, y: coordinates.bottom + 30 };

		content.newTask.dateModal.isOpen
			? closeDateModal()
			: openDateModal(position);
	}

	function openDateModal(position) {
		setCurrentDate();

		setContent((prev) => {
			return {
				...prev,
				newTask: {
					...prev.newTask,
					dateModal: {
						...prev.newTask.dateModal,
						isOpen: true,
						position: { ...position },
					},
				},
			};
		});
	}

	function closeDateModal() {
		setContent((prev) => {
			return {
				...prev,
				newTask: {
					...prev.newTask,
					dateModal: { ...prev.newTask.dateModal, isOpen: false },
				},
			};
		});
	}

	const actualTasksList = content.actualTasks.map((task) => {
		const width = computePercentOfTime(
			new Date(task.totalTime),
			new Date(task.remainingTime),
			task.status
		);

		return (
			<Task
				task={task}
				width={width}
				completeTaskListener={completeTask}
				deleteTask={deleteTask}
				hoverOnNotification={hoverOnNotification}
				key={task.id}
			></Task>
		);
	});

	const wastedTasksList = content.wastedTasks.map((task) => {
		return (
			<Task
				task={task}
				width={100}
				completeTaskListener={completeTask}
				deleteTask={deleteTask}
				hoverOnNotification={hoverOnNotification}
				key={task.id}
			></Task>
		);
	});

	const completedTasksList = content.completedTasks.map((task) => {
		const width = computePercentOfTime(
			task.totalTime,
			task.remainingTime,
			task.status
		);

		return (
			<Task
				task={task}
				width={width}
				completeTaskListener={completeTask}
				deleteTask={deleteTask}
				hoverOnNotification={hoverOnNotification}
				key={task.id}
			></Task>
		);
	});

	function setCurrentDate() {
		const currentDate = new Date();
		const currentDay = currentDate.getDate();
		const currentMonth = currentDate.getMonth();
		const currentYear = currentDate.getFullYear();

		setContent((prev) => {
			return {
				...prev,
				newTask: {
					...prev.newTask,
					dateModal: {
						...prev.newTask.dateModal,
						dateInput: correctDate(currentDate),
						date: currentDate,
						data: {
							...prev.newTask.dateModal.data,
							year: currentYear,
							month: currentMonth,
							day: currentDay,
						},
					},
				},
			};
		});
	}

	function showModal(e) {
		setContent((prev) => ({
			...prev,
			newTask: {
				...prev.newTask,
				statusModal: {
					...prev.newTask.statusModal,
					isOpen: true,
					position: {
						x: window.innerWidth / 2 - 180 / 2,
						y: window.innerHeight / 2 - 80 / 2,
					},
				},
			},
		}));
	}

	function hideModal() {
		setContent((prev) => ({
			...prev,
			newTask: {
				...prev.newTask,
				statusModal: { ...prev.newTask.statusModal, isOpen: false },
			},
		}));
	}

	useEffect(() => {
		const interval = setInterval(() => {
			const updatedActualTasks = getTasks("actual").map((task) => {
				const finishedTIme = new Date(
					new Date(task.creationDate).getTime() + task.totalTime
				);
				const remainingTime =
					finishedTIme - new Date() > 0 ? finishedTIme - new Date() : null;

				const status = {
					...task.status,
					isFinished: remainingTime == null ? true : false,
				};

				const type =
					status.isFinished && !status.isCompleted
						? "wasted"
						: status.isCompleted
						? "completed"
						: "actual";

				return { ...task, remainingTime, status, type };
			});

			const activeTasks = updatedActualTasks.filter(
				(task) => task.type == "actual"
			);

			setContent((prev) => {
				return {
					...prev,
					actualTasks: activeTasks,
				};
			});
			updateTasks(activeTasks, "actual");
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<div className="app">
				<div className="app-container">
					<div className="tabs" onClick={(e) => switchTab(e)}>
						<button
							className={`btn ${content.isActiveTab == "new" ? "active" : ""}`}
							name="new"
						>
							New
						</button>
						<button
							className={`btn ${
								content.isActiveTab == "actual" ? "active" : ""
							}`}
							name="actual"
						>
							Actual
						</button>
						<button
							className={`btn ${
								content.isActiveTab == "wasted" ? "active" : ""
							}`}
							name="wasted"
						>
							Wasted
						</button>
						<button
							className={`btn ${
								content.isActiveTab == "completed" ? "active" : ""
							}`}
							name="completed"
						>
							Completed
						</button>
					</div>
					<div className="box">
						{content.isActiveTab == "new" && (
							<NewTask
								interactOnTodo={interactOnTodo}
								content={content}
								typeText={typeText}
								clearInputText={clearInputText}
							></NewTask>
						)}
						{content.isActiveTab == "actual" &&
							(content.actualTasks.length > 0 ? (
								actualTasksList
							) : (
								<Empty>Empty</Empty>
							))}
						{content.isActiveTab == "wasted" &&
							(content.wastedTasks.length > 0 ? (
								wastedTasksList
							) : (
								<Empty>Empty</Empty>
							))}
						{content.isActiveTab == "completed" &&
							(content.completedTasks.length > 0 ? (
								completedTasksList
							) : (
								<Empty>Empty</Empty>
							))}
						{content.isActiveTab == "empty" && <Empty>Empty</Empty>}
					</div>
				</div>
				{content.newTask.notification.isOpen && (
					<ModalNotification newTask={content.newTask}></ModalNotification>
				)}
				{content.newTask.dateModal.isOpen && (
					<ModalSettings
						task={content.newTask}
						setContent={setContent}
						closeDateModal={closeDateModal}
						Chevron={Chevron}
					></ModalSettings>
				)}
				{content.newTask.statusModal.isOpen && (
					<Modal position={content.newTask.statusModal.position}></Modal>
				)}
			</div>
		</>
	);
}
