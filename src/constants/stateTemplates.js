import { splitDaysToWeeks, initDays } from "../utils/utils";

export const taskTemplate = {
	text: "",
	remainingTime: null,
	totalTime: null,
	creationDate: new Date(),
	type: "active",
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
export const notificationTemplate = {
	text: "",
	isOpen: false,
	position: {
		x: null,
		y: null,
	},
};
