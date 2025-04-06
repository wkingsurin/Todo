import { correctDate } from "../utils/utils";

export function taskReducer(state, action) {
	switch (action.type) {
		case "TYPE_TEXT":
			return { ...state, text: action.text };

		case "CLEAR_TEXT":
			return { ...state, text: "" };

		// case "SHOW_DATE_MODAL": {
		// 	const svg = action.target.querySelector("svg");
		// 	const coordinates = svg.getBoundingClientRect();

		// 	const position = {
		// 		x: coordinates.right - 254,
		// 		y: coordinates.bottom + 30,
		// 	};

		// 	const date = new Date();
		// 	const data = {
		// 		...state.dateModal.data,
		// 		year: date.getFullYear(),
		// 		month: date.getMonth(),
		// 		day: date.getDate(),
		// 	};

		// 	if (state.dateModal.isOpen) {
		// 		return taskReducer(state, { ...action, type: "HIDE_DATE_MODAL" });
		// 	}

		// 	const task = {
		// 		...state,
		// 		dateModal: {
		// 			...state.dateModal,
		// 			date,
		// 			data,
		// 			isOpen: true,
		// 			position,
		// 		},
		// 	};
		// 	// action.setDate(correctDate(date));

		// 	return task;
		// }

		// case "HIDE_DATE_MODAL":
		// 	return { ...state, dateModal: { ...state.dateModal, isOpen: false } };

		// case "SELECT_DAY": {
		// 	if (!action.target.closest('td')) return state

		// 	const day = Number(action.target.closest("td").textContent);

		// 	const date = state.dateModal.date || new Date();
		// 	date.setDate(day);

		// 	const dateToInput = correctDate(date);
		// 	action.setDate(dateToInput);

		// 	return {
		// 		...state,
		// 		dateModal: {
		// 			...state.dateModal,
		// 			data: { ...state.dateModal.data, day },
		// 		},
		// 	};
		// }

		// case "PREV_MONTH": {
		// 	const date = new Date(state.dateModal.date);
		// 	const now = Date.now();

		// 	if (date < now) {
		// 		console.log(`Невозможно установить прошедшую дату`);
		// 		return state;
		// 	}

		// 	date.setMonth(date.getMonth() - 1);
		// 	action.setDate(correctDate(date));

		// 	return {
		// 		...state,
		// 		dateModal: {
		// 			...state.dateModal,
		// 			date,
		// 			data: {
		// 				...state.dateModal.data,
		// 				month: date.getMonth(),
		// 				year: date.getFullYear(),
		// 			},
		// 		},
		// 	};
		// }

		// case "NEXT_MONTH": {
		// 	const date = new Date(state.dateModal.date);

		// 	date.setMonth(date.getMonth() + 1);
		// 	action.setDate(correctDate(date));

		// 	return {
		// 		...state,
		// 		dateModal: {
		// 			...state.dateModal,
		// 			date,
		// 			data: {
		// 				...state.dateModal.data,
		// 				month: date.getMonth(),
		// 				year: date.getFullYear(),
		// 			},
		// 		},
		// 	};
		// }

		// case "PREV_YEAR": {
		// 	const date = new Date(state.dateModal.date);
		// 	const dateNow = new Date();
		// 	const yearNow = dateNow.getFullYear();
		// 	const monthNow = dateNow.getMonth();

		// 	date.setFullYear(date.getFullYear() - 1);

		// 	if (date.getFullYear() < yearNow) {
		// 		console.log(`Невозможно выбрать предыдущую дату`);
		// 		return state;
		// 	}

		// 	if (date.getMonth() < monthNow) {
		// 		date.setMonth(monthNow);
		// 	}

		// 	action.setDate(correctDate(date));

		// 	return {
		// 		...state,
		// 		dateModal: {
		// 			...state.dateModal,
		// 			date,
		// 			data: {
		// 				...state.dateModal.date,
		// 				year: date.getFullYear(),
		// 				month: date.getMonth(),
		// 			},
		// 		},
		// 	};
		// }

		// case "NEXT_YEAR": {
		// 	const date = new Date(state.dateModal.date);

		// 	const nextYear = date.getFullYear() + 1;
		// 	console.log(`nextYear`, nextYear);

		// 	date.setFullYear(nextYear);
		// 	action.setDate(correctDate(date));

		// 	return {
		// 		...state,
		// 		dateModal: {
		// 			...state.dateModal,
		// 			date,
		// 			data: {
		// 				...state.dateModal.data,
		// 				year: date.getFullYear(),
		// 			},
		// 		},
		// 	};
		// }

		// case "SAVE_DATE": {
		// 	let timeToSet = "";

		// 	if (action.time.length < 5) {
		// 		console.log(`Выбрано некорректное время`);
		// 		return state;
		// 	}

		// 	action.setTime(timeToSet);

		// 	const data = {
		// 		...state.dateModal.data,
		// 		hours: Number(timeToSet.slice(0, 2)) || 0,
		// 		minutes: Number(timeToSet.slice(3)) || 0,
		// 	};

		// 	console.log(`data`, data)

		// 	if (
		// 		!Number.isFinite(data.minutes) ||
		// 		!Number.isFinite(data.hours) ||
		// 		!Number.isFinite(data.day) ||
		// 		!Number.isFinite(data.month) ||
		// 		!Number.isFinite(data.year)
		// 	) {
		// 		console.log(`Невозможно сохранить, вы указали не все данные!`);
		// 		return state;
		// 	}

		// 	let time = state.dateModal.date - new Date();

		// 	return {
		// 		...state,
		// 		totalTime: time,
		// 		remainingTime: time,
		// 		dateModal: { ...state.dateModal, isOpen: false, data },
		// 	};
		// }

		default:
			return state;
	}
}
