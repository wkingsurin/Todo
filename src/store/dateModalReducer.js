import {
	correctDate,
	dateMask,
	validationDate,
	timeMask,
	validationTime,
	updateDays,
} from "../utils/utils";

export function dateModalReducer(state, action) {
	switch (action.type) {
		case "TYPE_DATE": {
			const maskedDate = dateMask(action.target.value);
			const validDate = validationDate(maskedDate);
			let result;

			if (action.target.value.length < 8) {
				return {
					...state,
					dateInput: maskedDate,
				};
			}

			if (validDate.length === 10) {
				result = {
					...state,
					dateInput: validDate,
					date: new Date(
						validDate.slice(6, 10),
						validDate.slice(3, 5) - 1,
						validDate.slice(0, 2)
					),
					data: {
						...state.data,
						day: Number(validDate.slice(0, 2)),
						month: Number(validDate.slice(3, 5)) - 1,
						year: Number(validDate.slice(6, 10)),
					},
				};
			} else {
				result = {
					...state,
					dateInput: maskedDate,
				};
			}

			return result;
		}

		case "TYPE_TIME": {
			const maskedTime = timeMask(action.target.value);
			const validTime = validationTime(maskedTime);

			if (action.target.value.length < 4) {
				return { ...state, timeInput: maskedTime };
			}

			return {
				...state,
				timeInput: validTime ? validTime : maskedTime,
				data: {
					...state.data,
					hours: Number(action.target.value.slice(0, 2)),
					minutes: Number(action.target.value.slice(3, 5)),
				},
			};
		}

		case "SHOW_DATE_MODAL": {
			const svg = action.target.querySelector("svg");
			const coordinates = svg.getBoundingClientRect();

			const position = {
				x: coordinates.right - 254,
				y: coordinates.bottom + 30,
			};

			const date = new Date();
			const data = {
				...state.data,
				year: date.getFullYear(),
				month: date.getMonth(),
				day: date.getDate(),
			};

			if (state.isOpen) {
				return dateModalReducer(state, { ...action, type: "HIDE_DATE_MODAL" });
			}

			const modal = {
				...state,
				date,
				data,
				isOpen: true,
				position,
				dateInput: correctDate(new Date()),
			};
			// action.setDate(correctDate(date));

			return modal;
		}

		case "HIDE_DATE_MODAL":
			return { ...state, isOpen: false };

		case "SELECT_DAY": {
			if (!action.target.closest("td")) return state;

			const date = state.date || new Date();
			const day = Number(action.target.closest("td").textContent);

			if (
				day < new Date().getDate() &&
				date.getMonth() <= new Date().getMonth() &&
				date.getFullYear() <= new Date().getFullYear()
			) {
				console.log("Невозможно установить прошедшее число");
				return state;
			}

			date.setDate(day);

			return {
				...state,
				data: { ...state.data, day },
				dateInput: correctDate(date),
			};
		}

		case "PREV_MONTH": {
			const date = new Date(state.date);
			const now = new Date();

			if (
				date.getMonth() <= now.getMonth() &&
				date.getFullYear() === now.getFullYear()
			) {
				console.log(`Невозможно установить прошедшую дату`);
				return { ...state, date, dateInput: correctDate(date) };
			}

			date.setMonth(date.getMonth() - 1);

			if (
				date.getMonth() === now.getMonth() &&
				date.getDate() < now.getDate()
			) {
				date.setDate(now.getDate());
			}

			return {
				...state,
				date,
				data: {
					...state.data,
					month: date.getMonth(),
					year: date.getFullYear(),
				},
				dateInput: correctDate(date),
			};
		}

		case "NEXT_MONTH": {
			const date = new Date(state.date);

			date.setMonth(date.getMonth() + 1);

			return {
				...state,
				date,
				data: {
					...state.data,
					month: date.getMonth(),
					year: date.getFullYear(),
				},
				dateInput: correctDate(date),
			};
		}

		case "PREV_YEAR": {
			const date = new Date(state.date);
			const dateNow = new Date();
			const yearNow = dateNow.getFullYear();
			const monthNow = dateNow.getMonth();

			date.setFullYear(date.getFullYear() - 1);

			if (date.getFullYear() < yearNow) {
				console.log(`Невозможно выбрать предыдущую дату`);
				return state;
			}

			if (date.getMonth() < monthNow && date.getFullYear() === yearNow) {
				date.setMonth(monthNow);
			}

			if (date.getDate() < dateNow.getDate()) {
				date.setDate(dateNow.getDate());
			}

			return {
				...state,
				date,
				data: {
					...state.date,
					year: date.getFullYear(),
					month: date.getMonth(),
				},
				dateInput: correctDate(date),
			};
		}

		case "NEXT_YEAR": {
			const date = new Date(state.date);

			const nextYear = date.getFullYear() + 1;

			date.setFullYear(nextYear);

			return {
				...state,
				date,
				data: {
					...state.data,
					year: date.getFullYear(),
				},
				dateInput: correctDate(date),
			};
		}

		case "SAVE_DATE": {
			if (action.time.length < 5) {
				console.log(`Выбрано некорректное время`);
				return state;
			}

			const data = {
				...state.data,
				hours: Number(action.time.slice(0, 2)) || 0,
				minutes: Number(action.time.slice(3)) || 0,
			};
			const date = new Date(
				data.year,
				data.month,
				data.day,
				data.hours,
				data.minutes
			);

			if (
				!Number.isFinite(data.minutes) ||
				!Number.isFinite(data.hours) ||
				!Number.isFinite(data.day) ||
				!Number.isFinite(data.month) ||
				!Number.isFinite(data.year)
			) {
				console.log(`Невозможно сохранить, вы указали не все данные!`);
				return state;
			}

			return {
				...state,
				isOpen: false,
				data,
				date,
			};
		}

		case "UPDATE_DAYS": {
			return { ...state, days: updateDays(state.days) };
		}

		default:
			return state;
	}
}
