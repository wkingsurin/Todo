import { useAlert } from "../../features/alert/useAlert";
import { useDateModal } from "../../features/dateModal/useDateModal";
import { useModal } from "../../features/modal/useModal";

import ModalAlert from "../ModalAlert";
import ModalSettings from "../ModalSettings";
import Modal from "../Modal";

export default function AppContainer({ content, setContent, children }) {
	const { dateModal, handlers } = useDateModal();
	const { alert } = useAlert();
	const { notification } = useModal();

	const switchTab = (e) => {
		setContent((prev) => {
			return {
				...prev,
				isActiveTab: e.target.name,
			};
		});
		handlers.hideDateModal();
	};

	return (
		<div className="app-container">
			<div className="tabs">
				<button
					className={`btn ${content.isActiveTab == "new" ? "active" : ""}`}
					name="new"
					onClick={(e) => switchTab(e)}
				>
					New
				</button>
				<button
					className={`btn ${content.isActiveTab == "wasted" ? "active" : ""}`}
					name="wasted"
					onClick={(e) => switchTab(e)}
				>
					Wasted
				</button>
				<button
					className={`btn ${
						content.isActiveTab == "completed" ? "active" : ""
					}`}
					name="completed"
					onClick={(e) => switchTab(e)}
				>
					Completed
				</button>
			</div>
			{children}
			{dateModal.isOpen && <ModalSettings></ModalSettings>}
			{alert.isOpen && <ModalAlert></ModalAlert>}
			{notification.isOpen && <Modal></Modal>}
		</div>
	);
}
