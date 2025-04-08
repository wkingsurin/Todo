import { useDateModal } from "../../features/dateModal/useDateModal";
import ModalSettings from "../ModalSettings";
import { useAlert } from "../../features/alert/useAlert";
import ModalAlert from "../ModalAlert";

export default function AppContainer({ children }) {
	const {
		dateModal,
		handlers: dateModalHandlers,
		typeDate,
		typeTime,
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
					typeDate={typeDate}
					typeTime={typeTime}
					prevYear={dateModalHandlers.prevYear}
					nextYear={dateModalHandlers.nextYear}
					saveDate={dateModalHandlers.saveDate}
				></ModalSettings>
			)}
			{alert.isOpen && <ModalAlert></ModalAlert>}
		</div>
	);
}
