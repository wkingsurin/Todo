import { useDateModal } from "../../features/dateModal/useDateModal";
import ModalSettings from "../ModalSettings";
import { useTask } from "../../features/newTask/TaskContext";
import { useAlert } from "../../features/alert/useAlert";
import ModalAlert from "../ModalAlert";

export default function AppContainer({ children }) {
	const { dateInput, timeInput } = useTask();
	const {
		dateModal,
		handlers: dateModalHandlers,
		dateModalDispatch,
	} = useDateModal();
	const { alert } = useAlert();
	// console.log(`[AppContainer] useDateModal()`, useDateModal())
	// console.log(`[AppContainer] dateModal`, dateModal)

	return (
		<div className="app-container">
			{children}
			{dateModal.isOpen && (
				<ModalSettings
					modal={dateModal}
					closeDateModal={dateModalHandlers.hideDateModal}
					selectDay={dateModalHandlers.selectDay}
					prevMonth={dateModalHandlers.prevMonth}
					nextMonth={dateModalHandlers.nextMonth}
					dateInput={dateInput}
					timeInput={timeInput}
					prevYear={dateModalHandlers.prevYear}
					nextYear={dateModalHandlers.nextYear}
					saveDate={dateModalHandlers.saveDate}
				></ModalSettings>
			)}
			{alert.isOpen && <ModalAlert></ModalAlert>}
		</div>
	);
}
