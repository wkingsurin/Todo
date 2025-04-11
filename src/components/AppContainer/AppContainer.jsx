import { useAlert } from "../../features/alert/useAlert";
import { useDateModal } from "../../features/dateModal/useDateModal";

import ModalAlert from "../ModalAlert";
import ModalSettings from "../ModalSettings";

export default function AppContainer({ children }) {
	const { dateModal } = useDateModal();
	const { alert } = useAlert();

	return (
		<div className="app-container">
			{children}
			{dateModal.isOpen && <ModalSettings></ModalSettings>}
			{alert.isOpen && <ModalAlert></ModalAlert>}
		</div>
	);
}
