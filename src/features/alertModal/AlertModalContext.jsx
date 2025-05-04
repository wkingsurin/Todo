import { useState, createContext } from "react";
import { alertTemplate } from "../../constants/stateTemplates";

export const AlertModalContext = createContext(alertTemplate);

export const AlertModalProvider = ({ children }) => {
	const [alertModal, setAlertModal] = useState(alertTemplate);

	const hideAlertModal = () => {
		setAlertModal((prev) => {
			return { ...prev, isOpen: false, hoveredTaskId: null, hovered: false };
		});
	};

	return (
		<AlertModalContext.Provider
			value={{ alertModal, setAlertModal, hideAlertModal }}
		>
			{children}
		</AlertModalContext.Provider>
	);
};
