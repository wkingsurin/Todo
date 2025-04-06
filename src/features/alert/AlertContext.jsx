import { useState, createContext } from "react";
import { alertTemplate } from "../../utils/utils";

export const AlertContext = createContext(alertTemplate);

export const AlertProvider = ({ children }) => {
	const [alert, setAlert] = useState(alertTemplate);

	return (
		<AlertContext.Provider value={{ alert, setAlert }}>
			{children}
		</AlertContext.Provider>
	);
};
