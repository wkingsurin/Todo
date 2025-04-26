import { useAlert } from "../../features/alert/useAlert";
import { useDateModal } from "../../features/dateModal/useDateModal";
import { useModal } from "../../features/modal/useModal";

import { Transition } from "react-transition-group";

import ModalAlert from "../ModalAlert";
import ModalSettings from "../ModalSettings";
import Modal from "../Modal";
import { useRef } from "react";

export default function AppContainer({ content, setContent, children }) {
	const { dateModal, handlers } = useDateModal();
	const { alert } = useAlert();
	const { notification } = useModal();

	const notificationRef = useRef(null);
	const alertRef = useRef(null);
	const dateModalRef = useRef(null);

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
			<Transition
				in={dateModal.isOpen}
				timeout={500}
				mountOnEnter
				unmountOnExit
				nodeRef={dateModalRef}
			>
				{(state) => (
					<ModalSettings
						className={`modal settings extended-modal ${state}`}
						ref={dateModalRef}
					></ModalSettings>
				)}
			</Transition>
			<Transition
				in={alert.isOpen}
				timeout={500}
				mountOnEnter
				unmountOnExit
				nodeRef={alertRef}
			>
				{(state) => (
					<ModalAlert
						className={`modal notification ${state}`}
						ref={alertRef}
					></ModalAlert>
				)}
			</Transition>
			<Transition
				in={notification.isOpen}
				timeout={500}
				mountOnEnter
				unmountOnExit
				nodeRef={notificationRef}
			>
				{(state) => (
					<Modal
						className={`modal notification ${state}`}
						ref={notificationRef}
						position={{ x: window.innerWidth / 2 - 180 / 2, y: 60 }}
					></Modal>
				)}
			</Transition>
		</div>
	);
}
