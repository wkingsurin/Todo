import { useState, createContext } from "react";
import { notificationTemplate } from "../../utils/utils";

export const ModalContext = createContext(notificationTemplate);

export function ModalProvider({ children }) {
	const [notification, setNotification] = useState(notificationTemplate);

	const showModal = (position = { x: window.innerWidth / 2, y: 60 }) => {
		setNotification((prev) => {
			return {
				...prev,
				isOpen: true,
				position: position,
			};
		});
	};

	const hideModal = () => {
		setNotification((prev) => {
			return { ...prev, isOpen: false };
		});
	};

	return (
		<ModalContext.Provider
			value={{ notification, setNotification, showModal, hideModal }}
		>
			{children}
		</ModalContext.Provider>
	);
}
