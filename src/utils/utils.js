export function counter() {
	if (!hasValueInLocalStorage("count")) {
		saveCount(0);
		return getCount();
	}

	let newCount = getCount() + 1;
	saveCount(newCount);

	return getCount();
}

function getCount() {
	if (!hasValueInLocalStorage("count")) {
		return 0;
	}

	let result = null;

	try {
		result = Number(localStorage.getItem("count"));
	} catch (e) {
		console.log(e.message);
	}

	return result;
}

function saveCount(count) {
	try {
		localStorage.setItem("count", count);
	} catch (e) {
		console.log(e.message);
	}
}

function hasValueInLocalStorage(key) {
	return !localStorage.getItem(key) ? false : true;
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
	if (hasValueInLocalStorage(correctType)) {
		let result = [];

		try {
			result = jsonParse(localStorage.getItem(correctType));
		} catch (e) {
			console.log(e.message);
		}

		return result;
	}
	return [];
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

	try {
		localStorage.setItem(type + "Tasks", jsonStringify(newTasksList));
	} catch (e) {
		console.log(e.message);
	}
}

export function removeTask(task, type) {
	const tasksList = getTasks(type);
	const newTasksList = tasksList.filter(
		(currentTask) => currentTask.id != task.id
	);

	try {
		localStorage.setItem(type + "Tasks", jsonStringify(newTasksList));
	} catch (e) {
		console.log(e.message);
	}
}

export function saveTasks(tasks, type) {
	try {
		localStorage.setItem(`${type}Tasks`, jsonStringify(tasks));
	} catch (e) {
		console.log(e.message);
	}
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
	let [year, month, day] = string;

	if (year.length < 4) return value;

	if (month > 11) {
		year = Number(year) + Math.floor(month / 12);
		month = month % 12;
	}

	let date = new Date(year, month - 1, day);

	if (
		date.getDate() < new Date().getDate() &&
		date.getMonth() <= new Date().getMonth() &&
		date.getFullYear() <= new Date().getFullYear()
	) {
		return correctDate(new Date());
	}
	if (
		(date.getMonth() < new Date().getMonth() &&
			date.getFullYear() <= new Date().getFullYear()) ||
		date.getFullYear() < new Date().getFullYear()
	) {
		return correctDate(new Date());
	}

	return correctDate(date);
}

export function validationTime(value, date) {
	let string = value.split(":");
	let [hours, minutes] = string;
	let timeNow = new Date();

	if (hours && hours.length < 2) return value;
	if (minutes && minutes.length < 2) return value;

	let result = correctTime(Number(hours) + ":" + Number(minutes));

	if (date > new Date()) {
		return result;
	}

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

	result = correctTime(hours + ":" + minutes);

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

export function hoverOnAlert(target, alert, setAlert) {
	const iconTarget = target.querySelector("svg");

	let coordinates = iconTarget.getBoundingClientRect();

	if (!alert.isOpen) {
		showAlert(coordinates, setAlert);
	}
}

export function showAlert(position, setAlert) {
	setAlert((prev) => {
		return {
			...prev,
			position: { x: position.x - 30, y: position.y + 31 },
			isOpen: true,
			hovered: true,
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

export function checkDate(data) {
	if (
		!Number.isFinite(data.minutes) ||
		!Number.isFinite(data.hours) ||
		!Number.isFinite(data.day) ||
		!Number.isFinite(data.month) ||
		!Number.isFinite(data.year)
	) {
		return false;
	}
	return true;
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
		if (
			collectedArr[i].date < new Date() &&
			collectedArr[i].date.getDate() != new Date().getDate()
		) {
			collectedArr[i].open = false;
		}
		if (
			i > 28 &&
			collectedArr[i].date.getDate() < collectedArr[28].date.getDate()
		) {
			collectedArr[i].open = true;
		}
		if (
			collectedArr[i].date.getDate(
				collectedArr[i].date.getFullYear(),
				collectedArr[i].date.getMonth(),
				collectedArr[i].date.getDate()
			) ===
			new Date(
				new Date().getFullYear(),
				new Date().getMonth(),
				new Date().getDate()
			).getTime()
		) {
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

export const initDays = (year, month) => {
	const firstDayOfWeek = getFirstWeekDayOfMonth(month);
	const lastDayOfWeek = getLastWeekDayOfMonth(month);
	const lastDayOfMonth = getLastDayOfMonth(month);
	const lastDayOfPrevMonth = getLastDayOfMonth(month - 1);

	const days = [];

	let daysToAdd = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

	for (let i = lastDayOfPrevMonth; i > lastDayOfPrevMonth - daysToAdd; i--) {
		days.unshift({
			open: true,
			date: new Date(year, month - 1, i),
		});
	}

	for (let i = 1; i <= lastDayOfMonth; i++) {
		days.push({
			open: true,
			date: new Date(year, month, i),
		});
	}

	if (lastDayOfWeek === 0)
		return days.map((day, index) => ({ ...day, id: index }));

	for (
		let i = lastDayOfMonth + 1;
		i <= lastDayOfMonth + 6 - lastDayOfWeek + 1;
		i++
	) {
		days.push({
			open: true,
			date: new Date(year, month, i),
		});
	}

	return days.map((day, index) => ({ ...day, id: index }));
};

export const highlightInvalidField = (inputRef, parentElemClass) => {
	const target = inputRef.current;
	let parent = target.closest(parentElemClass);

	if (target.value.length < target.minLength) {
		if (parent) parent.classList.add("invalid-value");
		else inputRef.current.classList.add("invalid-value");

		let timer = setTimeout(() => {
			if (parent) parent.classList.remove("invalid-value");
			else inputRef.current.classList.remove("invalid-value");

			clearTimeout(timer);
		}, 1500);
	}
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
	position: { x: null, y: null },
	hoveredTaskId: null,
	hovered: false,
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
	days: splitDaysToWeeks(
		initDays(new Date().getFullYear(), new Date().getMonth())
	),
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
