export function counter(setState) {
	if (!isExistsCount()) {
		localStorage.setItem("count", 0);
		return getCount();
	}

	let newCount = getCount() + 1;

	setState((prev) => ({ ...prev, newTask: { ...prev.newTask, id: newCount } }));
	saveCount(newCount);

	return getCount();
}

function isExistsCount() {
	return !localStorage.getItem("count") ? false : true;
}

function getCount() {
	if (!isExistsCount()) {
		return 0;
	}
	return Number(localStorage.getItem("count"));
}

function saveCount(count) {
	if (count) {
		localStorage.setItem("count", count);
	}
	return false;
}

export function correctDate(date) {
	const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
	const month =
		date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

	return `${day}.${month}.${date.getFullYear()}`;
}

export const months = {
	0: "Январь",
	1: "Февраль",
	2: "Март",
	3: "Апрель",
	4: "Май",
	5: "Июнь",
	6: "Июль",
	7: "Август",
	8: "Сентябрь",
	9: "Октябрь",
	10: "Ноябрь",
	11: "Декабрь",
};

export const taskTemplate = {
	text: null,
	remainingTime: null,
	totalTime: null,
	creationDate: null,
	status: { isFinished: false, isCompleted: false },
	type: null,
	id: null,
	notification: {
		text: `Time remaining to complete
          the project: 5h 1m 32s`,
		isOpen: false,
		isCooldown: false,
		position: { x: null, y: null },
	},
	dateModal: {
		dateInput: null,
		timeInput: null,
		isOpen: false,
		time: null,
		position: { x: null, y: null },
		date: null,
		data: {
			hours: null,
			minutes: null,
			day: null,
			month: null,
			year: null,
		},
	},
	statusModal: {
		isOpen: false,
		position: {
			x: null,
			y: null,
		},
	},
};

export function jsonParse(json) {
	return JSON.parse(json);
}
export function jsonStringify(json) {
	return JSON.stringify(json);
}

export function getTasks(type) {
	const correctType = type + "Tasks";
	if (isExistsTasks(correctType)) {
		return jsonParse(localStorage.getItem(correctType));
	}
	return [];
}

export function isExistsTasks(type) {
	return localStorage.getItem(type) ? true : false;
}

export function saveTask(task, type) {
	const tasksList = getTasks(type);
	const hasTask = getTasks(type).filter(
		(currentTask) => currentTask.id == task.id
	)[0]
		? true
		: false;
	const updatedTask = getTasks(type).filter((currentTask) => currentTask.remainingTime == task.remainingTime ? false : true)
	let newTasksList = [...tasksList];

	if (task && !hasTask) {
		newTasksList.push(task);
	}
	if (updatedTask && hasTask) {
		newTasksList = newTasksList.filter((currentTask) => currentTask.id != task.id)
		newTasksList.push(task)	
	}

	localStorage.setItem(type + "Tasks", jsonStringify(newTasksList));
	console.log(`tasksList:`, newTasksList);
}

export function removeTask(task, type) {
	const tasksList = getTasks(type);
	const newTasksList = tasksList.filter(
		(currentTask) => currentTask.id != task.id
	);

	localStorage.setItem(type + "Tasks", jsonStringify(newTasksList));
}

export function updateTasks(tasks, type) {
	localStorage.setItem(`${type}Tasks`, jsonStringify(tasks));
}

export function getTypeFromClassName(elem) {
	return elem.classList[1].split("-")[1];
}

export function computePercentOfTime(total, remaining, status) {
	if (status.isCompleted) {
		return 100;
	}
	if (status.isFinished && !status.isCompleted) {
		return 0;
	}
	return (remaining * 100) / total;
}
