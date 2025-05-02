import { useState, createContext } from "react";
import { alertTemplate } from "../../utils/utils";

export const AlertModalContext = createContext(alertTemplate);

export const AlertModalProvider = ({ children }) => {
	const [alertModal, setAlertModal] = useState(alertTemplate);

	const hideAlert = () => {
		setAlertModal((prev) => {
			return { ...prev, isOpen: false, hoveredTaskId: null, hovered: false };
		});
	};

	return (
		<AlertModalContext.Provider
			value={{ alertModal, setAlertModal, hideAlert }}
		>
			{children}
		</AlertModalContext.Provider>
	);
};
