export function dateModalReducer(state, action) {
	switch (action.type) {
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
			};
			// action.setDate(correctDate(date));

			return modal;
		}

		case "HIDE_DATE_MODAL":
			return { ...state, isOpen: false };

		case "SELECT_DAY": {
			if (!action.target.closest("td")) return state;

			const day = Number(action.target.closest("td").textContent);

			const date = state.date || new Date();
			date.setDate(day);

			return {
				...state,
				data: { ...state.data, day },
			};
		}

		case "PREV_MONTH": {
			const date = new Date(state.date);
			const now = Date.now();

			if (date < now) {
				console.log(`Невозможно установить прошедшую дату`);
				return state;
			}

			date.setMonth(date.getMonth() - 1);

			return {
				...state,
				date,
				data: {
					...state.data,
					month: date.getMonth(),
					year: date.getFullYear(),
				},
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

			if (date.getMonth() < monthNow) {
				date.setMonth(monthNow);
			}

			return {
				...state,
				date,
				data: {
					...state.date,
					year: date.getFullYear(),
					month: date.getMonth(),
				},
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
				state.data.year,
				state.data.month,
				state.data.day,
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

		default:
			return state;
	}
}
