import { useAlertModal } from "../../features/alertModal/useAlertModal";
import { useDateModal } from "../../features/dateModal/useDateModal";
import { useNotificationModal } from "../../features/notificationModal/useNotificationModal";

import { useRef } from "react";

import { Transition } from "react-transition-group";

import Tabs from "../Tabs";
import AlertModal from "../AlertModal";
import DateModal from "../DateModal";
import NotificationModal from "../NotificationModal";

export default function AppContainer({
	content,
	setContent,
	children,
	ref,
	className,
}) {
	const { dateModal, handlers: dateModalHandlers } = useDateModal();
	const { alertModal } = useAlertModal();
	const { notificationModal } = useNotificationModal();

	const notificationModalRef = useRef(null);
	const alertModalRef = useRef(null);
	const dateModalRef = useRef(null);

	const handleSwitchTab = (e) => {
		setContent((prev) => {
			return {
				...prev,
				activeTab: e.target.name,
			};
		});
		dateModalHandlers.hideDateModal();
	};

	return (
		<div className={className} ref={ref}>
			<Tabs content={content} handleSwitch={handleSwitchTab}></Tabs>
			{children}

			<Transition
				in={dateModal.isOpen}
				timeout={500}
				mountOnEnter
				unmountOnExit
				nodeRef={dateModalRef}
			>
				{(state) => (
					<DateModal
						className={`modal settings extended-modal ${state}`}
						ref={dateModalRef}
					></DateModal>
				)}
			</Transition>

			<Transition
				in={alertModal.isOpen}
				timeout={500}
				mountOnEnter
				unmountOnExit
				nodeRef={alertModalRef}
			>
				{(state) => (
					<AlertModal
						className={`modal notification ${state}`}
						ref={alertModalRef}
					></AlertModal>
				)}
			</Transition>

			<Transition
				in={notificationModal.isOpen}
				timeout={500}
				mountOnEnter
				unmountOnExit
				nodeRef={notificationModalRef}
			>
				{(state) => (
					<NotificationModal
						className={`modal notification ${state}`}
						ref={notificationModalRef}
						position={{ x: window.innerWidth / 2 - 180 / 2, y: 60 }}
					></NotificationModal>
				)}
			</Transition>
		</div>
	);
}
