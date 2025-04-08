import { createContext, useContext, useReducer } from "react";
import { dateModalTemplate } from "../../utils/utils";
import { dateModalReducer } from "../../store/dateModalReducer";

export const DateModalContext = createContext(dateModalTemplate);

export const DateModalProvider = ({ children }) => {
	const [dateModal, dateModalDispatch] = useReducer(
		dateModalReducer,
		dateModalTemplate
	);

	const typeDate = (target) => {
		dateModalDispatch({ type: "TYPE_DATE", target });
	};
	const typeTime = (target) => {
		dateModalDispatch({ type: "TYPE_TIME", target });
	};

	const showDateModal = (target, setDate) =>
		dateModalDispatch({ type: "SHOW_DATE_MODAL", target, setDate });
	const hideDateModal = (target) =>
		dateModalDispatch({ type: "HIDE_DATE_MODAL", target });

	const selectDay = (target, setDate) =>
		dateModalDispatch({ type: "SELECT_DAY", target, setDate });

	const prevMonth = (target, setDate) =>
		dateModalDispatch({ type: "PREV_MONTH", target, setDate });
	const nextMonth = (target, setDate) =>
		dateModalDispatch({ type: "NEXT_MONTH", target, setDate });

	const prevYear = (target, setDate) =>
		dateModalDispatch({ type: "PREV_YEAR", target, setDate });
	const nextYear = (target, setDate) =>
		dateModalDispatch({ type: "NEXT_YEAR", target, setDate });

	const saveDate = (target, time, setTime) =>
		dateModalDispatch({ type: "SAVE_DATE", target, time, setTime });

	return (
		<DateModalContext.Provider
			value={{
				dateModal,
				dateModalDispatch,
				handlers: {
					showDateModal,
					hideDateModal,
					selectDay,
					prevMonth,
					nextMonth,
					prevYear,
					nextYear,
					saveDate,
				},
				typeDate,
				typeTime,
			}}
		>
			{children}
		</DateModalContext.Provider>
	);
};
