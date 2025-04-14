import { useState, createContext } from "react";
import { notificationTemplate } from "../../utils/utils";

export const ModalContext = createContext(notificationTemplate);

export function ModalProvider({ children }) {
	const [notification, setNotification] = useState(notificationTemplate);

	const showModal = () => {
		setNotification((prev) => {
			return {
				...prev,
				isOpen: true,
				position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
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
