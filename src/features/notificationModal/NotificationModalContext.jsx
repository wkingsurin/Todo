import { useState, createContext } from "react";
import { notificationTemplate } from "../../constants/stateTemplates";

export const NotificationModalContext = createContext(notificationTemplate);

export function ModalProvider({ children }) {
	const [notificationModal, setNotificationModal] =
		useState(notificationTemplate);

	const showModal = (position = { x: window.innerWidth / 2, y: 60 }) => {
		setNotificationModal((prev) => {
			return {
				...prev,
				isOpen: true,
				position: position,
			};
		});
	};

	const hideModal = () => {
		setNotificationModal((prev) => {
			return { ...prev, isOpen: false };
		});
	};

	return (
		<NotificationModalContext.Provider
			value={{ notificationModal, setNotificationModal, showModal, hideModal }}
		>
			{children}
		</NotificationModalContext.Provider>
	);
}
