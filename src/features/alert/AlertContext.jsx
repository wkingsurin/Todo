import { useState, createContext } from "react";
import { alertTemplate } from "../../utils/utils";

export const AlertContext = createContext(alertTemplate);

export const AlertProvider = ({ children }) => {
	const [alert, setAlert] = useState(alertTemplate);

	const hideAlert = () => {
		setAlert((prev) => {
			return { ...prev, isOpen: false, hoveredTaskId: null, hovered: false };
		});
	};

	return (
		<AlertContext.Provider value={{ alert, setAlert, hideAlert }}>
			{children}
		</AlertContext.Provider>
	);
};
