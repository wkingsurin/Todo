export function counter() {
	if (!isExistsCount()) {
		localStorage.setItem("count", 0);
		return getCount();
	}

	let newCount = getCount() + 1;
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

export function correctTime(time) {
	let [hours, minutes] = time.split(":");

	hours = Number(hours) < 10 ? "0" + hours : hours;
	minutes = Number(minutes) < 10 ? "0" + Number(minutes) : minutes;

	return hours + ":" + minutes;
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
	const updatedTask = getTasks(type).filter((currentTask) =>
		currentTask.remainingTime == task.remainingTime ? false : true
	);
	let newTasksList = [...tasksList];

	if (task && !hasTask) {
		newTasksList.push(task);
	}
	if (updatedTask && hasTask) {
		newTasksList = newTasksList.filter(
			(currentTask) => currentTask.id != task.id
		);
		newTasksList.push(task);
	}

	localStorage.setItem(type + "Tasks", jsonStringify(newTasksList));
	// console.log(`tasksList:`, newTasksList);
}

export function removeTask(task, type) {
	const tasksList = getTasks(type);
	const newTasksList = tasksList.filter(
		(currentTask) => currentTask.id != task.id
	);

	localStorage.setItem(type + "Tasks", jsonStringify(newTasksList));
}

export function saveTasks(tasks, type) {
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
	if (remaining < 1000) {
		return 0;
	}
	return Number((remaining * 100) / total).toFixed(2);
}

export function objectClone(object) {
	return JSON.parse(JSON.stringify(object));
}

export function validateDate(object) {
	const { data, date } = object;

	const hasDate = date !== null;
	const hasYear = Number.isFinite(data.year);
	const hasMonth = Number.isFinite(data.month);
	const hasDay = Number.isFinite(data.day);
	const hasHours = Number.isFinite(data.hours);
	const hasMinutes = Number.isFinite(data.minutes);

	if (hasDate && hasYear && hasMonth && hasDay && hasHours && hasMinutes) {
		return true;
	}

	console.log(`Некорректная дата...`);
	return false;
}

export function validationDate(value) {
	let string = value.split(".").reverse();
	const [year, month, day] = string;

	if (year.length < 4) return value;

	let date = new Date(year, month - 1, day);

	if (
		date.getDate() < new Date().getDate() &&
		date.getMonth() <= new Date().getMonth() &&
		date.getFullYear() <= new Date().getFullYear()
	) {
		return correctDate(new Date());
	}

	return value;
}

export function validationTime(value) {
	let string = value.split(":");
	let [hours, minutes] = string;
	let timeNow = new Date();

	if (hours && hours.length < 2) return value;
	if (minutes && minutes.length < 2) return value;

	if (hours && timeNow.getHours() > hours) {
		hours = timeNow.getHours();
	}

	if (
		minutes &&
		hours <= timeNow.getHours() &&
		timeNow.getMinutes() >= minutes
	) {
		hours = Number(hours) + 1;
		minutes = "00";
	}

	let result = correctTime(hours + ":" + minutes);

	return result;
}

export function correctRemainingTime(remainingTime) {
	let string = "";

	let totalSeconds = Math.floor(remainingTime / 1000);

	let seconds = totalSeconds % 60;
	let totalMinutes = Math.floor(totalSeconds / 60);
	let minutes = totalMinutes % 60;
	let totalHours = Math.floor(totalMinutes / 60);
	let hours = totalHours % 24;
	let totalDays = Math.floor(totalHours / 24);
	let days = totalDays % 30;
	let months = Math.floor(totalDays / 30);

	if (months > 0) string += `${months}m `;
	if (days > 0) string += `${days}d `;
	if (hours > 0) string += `${hours}h `;
	if (minutes > 0) string += `${minutes}m `;
	if (seconds > 0) string += `${seconds}s`;

	return string;
}

export function hoverOnAlert(e, alert, setAlert) {
	const target = e.target;

	if (target.closest("svg")) {
		const coordinates = target.closest("svg").getBoundingClientRect();

		if (alert.isCooldown) {
			return;
		} else {
			setAlert((prev) => {
				return { ...prev, isHovered: true };
			});
			showAlert(coordinates, setAlert);
		}
	}
}

export function mouseOnAlert(e, setAlert, remainingTime) {
	changeAlertMessage(remainingTime, setAlert);
}

export function showAlert(position, setAlert) {
	setAlert((prev) => {
		return {
			...prev,
			position: { x: position.x - 30, y: position.y + 31 },
			isOpen: true,
		};
	});
}

export function hideAlert(setAlert) {
	setAlert((prev) => {
		return { ...prev, isOpen: false };
	});
}

export function changeAlertMessage(remainingTime, setAlert) {
	setAlert((prev) => {
		return {
			...prev,
			text: `Time remaining to complete
				the project: ${correctRemainingTime(remainingTime)}`,
		};
	});
}

export function dateMask(value) {
	const digits = value.replace(/\D/g, "").slice(0, 8);
	let result = "";

	if (digits.length > 0) result += digits.substring(0, 2);
	if (digits.length >= 3) result += "." + digits.substring(2, 4);
	else if (digits.length > 2) result += ".";

	if (digits.length >= 5) result += "." + digits.substring(4, 8);
	else if (digits.length > 4) result += ".";

	return result;
}

export function timeMask(value) {
	const digits = value.replace(/\D/g, "").slice(0, 4);
	let result = "";

	if (digits.length > 0) result += digits.substring(0, 2);
	if (digits.length >= 3) result += ":" + digits.substring(2, 4);

	return result;
}

export const splitDaysToWeeks = (days) => {
	const weeks = [];
	let week = [];
	let i = 0;

	while (i !== days.length) {
		week.push(days[i]);
		i++;

		if (week.length === 7) {
			weeks.push(week);
			week = [];
		}
	}

	return weeks;
};
export const collectArr = (arr) => {
	const collectedArr = [];

	for (let i = 0; i < arr.length; i++) {
		for (let k = 0; k < arr[i].length; k++) {
			collectedArr.push(arr[i][k]);
		}
	}
	return collectedArr;
};
export const updateDays = (arr) => {
	let collectedArr = collectArr(arr);

	for (let i = 0; i < collectedArr.length; i++) {
		if (i < 7 && collectedArr[i].day > collectedArr[i + 1].day) {
			collectedArr[i].open = false;
		}
		if (collectedArr[i].day < new Date().getDate()) {
			collectedArr[i].open = false;
		}
		if (i > 28 && collectedArr[i].day < collectedArr[28].day) {
			collectedArr[i].open = true;
		}
	}

	return splitDaysToWeeks(collectedArr);
};
export const getFirstWeekDayOfMonth = (month) => {
	const date = new Date();
	date.setMonth(month);
	date.setDate(1);
	return date.getDay();
};
export const getLastWeekDayOfMonth = (month) => {
	const date = new Date();
	date.setMonth(month + 1);
	date.setDate(0);
	return date.getDay();
};
export const getLastDayOfMonth = (month) => {
	const date = new Date();
	date.setMonth(month + 1);
	date.setDate(0);
	return date.getDate();
};

export const initDays = () => {
	const firstDayOfWeek = getFirstWeekDayOfMonth(new Date().getMonth());
	const lastDayOfWeek = getLastWeekDayOfMonth(new Date().getMonth());
	const lastDayOfMonth = getLastDayOfMonth(new Date().getMonth());
	const lastDayOfPrevMonth = getLastDayOfMonth(new Date().getMonth() - 1);

	const days = [];

	for (let i = 1; i <= lastDayOfMonth; i++) {
		days.push({
			day: i,
			open: true,
			dayOfWeek: new Date(
				new Date().getFullYear(),
				new Date().getMonth(),
				i
			).getDay(),
		});
	}

	for (
		let i = lastDayOfPrevMonth;
		i > lastDayOfPrevMonth - (firstDayOfWeek - 1);
		i--
	) {
		days.unshift({
			day: i,
			open: false,
			dayOfWeek: new Date(
				new Date().getFullYear(),
				new Date().getMonth() - 1,
				i
			).getDay(),
		});
	}

	for (
		let i = lastDayOfMonth + 1;
		i <= lastDayOfMonth + lastDayOfWeek + 1;
		i++
	) {
		days.push({
			day: new Date(new Date().setDate(i)).getDate(),
			open: false,
			dayOfWeek: new Date(
				new Date().getFullYear(),
				new Date().getMonth(),
				i
			).getDay(),
		});
	}

	return days.map((day, index) => ({ ...day, id: index }));
};

export const taskTemplate = {
	text: "",
	remainingTime: null,
	totalTime: null,
	creationDate: new Date(),
	status: { isFinished: false, isCompleted: false },
	type: "actual",
	id: null,
};
export const alertTemplate = {
	text: `Time remaining to complete
	the project: 5h 1m 32s`,
	isOpen: false,
	isCooldown: false,
	position: { x: null, y: null },
	hoverdTaskId: null,
};
export const dateModalTemplate = {
	dateInput: "",
	timeInput: "",
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
	days: splitDaysToWeeks(initDays()),
};
export const statusModalTemplate = {
	isOpen: false,
	position: {
		x: null,
		y: null,
	},
};
export const notificationTemplate = {
	text: "",
	isOpen: false,
	position: {
		x: null,
		y: null,
	},
};
