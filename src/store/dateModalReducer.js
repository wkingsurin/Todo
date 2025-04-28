import {
	correctDate,
	dateMask,
	validationDate,
	timeMask,
	validationTime,
	updateDays,
	initDays,
	splitDaysToWeeks,
	checkDate,
	dateModalTemplate,
} from "../utils/utils";

export function dateModalReducer(state, action) {
	switch (action.type) {
		case "TYPE_DATE": {
			const maskedDate = dateMask(action.target.value);
			const validDate = validationDate(maskedDate);
			let result;

			const day = Number(validDate.slice(0, 2));
			const month = Number(validDate.slice(3, 5)) - 1;
			const year = Number(validDate.slice(6, 10));

			if (action.target.value.length < 8) {
				return {
					...state,
					dateInput: maskedDate,
					data: {
						...state.data,
						day: day > 0 ? day : null,
						month:
							month >= 0 && month < 12
								? month
								: month >= 12
								? month % 12
								: null,
						year: year === 4 ? year : null,
					},
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
						day,
						month,
						year,
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
			const validTime = validationTime(maskedTime, state.date);

			let hours = action.target.value.slice(0, 2);
			let minutes = action.target.value.slice(3, 5);

			let data = {
				...state.data,
				hours: hours.length > 0 ? Number(hours) : null,
				minutes: minutes.length > 0 ? Number(minutes) : null,
			};

			if (action.target.value.length < 4) {
				return {
					...state,
					timeInput: maskedTime,
					data,
				};
			}

			return {
				...state,
				timeInput: validTime ? validTime : maskedTime,
				data,
			};
		}

		case "SHOW_DATE_MODAL": {
			const svg = action.target.querySelector("svg");
			const coordinates = svg.getBoundingClientRect();

			const position = {
				x: coordinates.right - (330 - 54),
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
				days: splitDaysToWeeks(initDays(date.getFullYear(), date.getMonth())),
				timeInput: "",
			};

			return modal;
		}

		case "HIDE_DATE_MODAL":
			return { ...state, isOpen: false };

		case "SELECT_DAY": {
			if (!action.target.closest("td")) return state;

			const cell = action.target.closest("td");
			const date = state.date;
			let day;

			state.days.forEach((week) => {
				const find = week.find((day) => {
					return day.id === Number(cell.id);
				});

				if (find) {
					day = find.date;
				}
			});

			if (
				new Date(day.getFullYear(), day.getMonth(), day.getDate()) <
				new Date(
					new Date().getFullYear(),
					new Date().getMonth(),
					new Date().getDate()
				)
			) {
				console.log("Невозможно установить прошедшее число");
				return state;
			}

			date.setDate(day.getDate());

			return {
				...state,
				data: { ...state.data, day: day.getDate() },
				dateInput: correctDate(day),
				date,
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
				days: updateDays(
					splitDaysToWeeks(initDays(date.getFullYear(), date.getMonth()))
				),
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
				days: updateDays(
					splitDaysToWeeks(initDays(date.getFullYear(), date.getMonth()))
				),
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
				days: updateDays(
					splitDaysToWeeks(initDays(date.getFullYear(), date.getMonth()))
				),
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
				days: updateDays(
					splitDaysToWeeks(initDays(date.getFullYear(), date.getMonth()))
				),
			};
		}

		case "SAVE_DATE": {
			if (action.time.length < 5) {
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

			if (!checkDate(data)) {
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
			return {
				...state,
				days: updateDays(state.days),
			};
		}

		case "RESET": {
			return {
				...dateModalTemplate,
				days: splitDaysToWeeks(
					initDays(new Date().getFullYear(), new Date().getMonth())
				),
			};
		}

		default:
			return state;
	}
}
