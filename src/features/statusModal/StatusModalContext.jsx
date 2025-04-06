import { createContext, useState } from "react";
import { statusModalTemplate } from "../../utils/utils";

export const StatusModalContext = createContext(statusModalTemplate);

export const StatusModalProvider = ({ children }) => {
	const [status, setStatus] = useState(statusModalTemplate);

	return (
		<StatusModalContext.Provider value={{ status, setStatus }}>
			{children}
		</StatusModalContext.Provider>
	);
};
