import { TaskProvider } from "../../features/newTask/TaskContext";
import { AlertProvider } from "../../features/alert/AlertContext";
import { DateModalProvider } from "../../features/dateModal/DateModalContext";

export default function Providers({ children }) {
	return (
		<>
			<DateModalProvider>
				<AlertProvider>
					<TaskProvider>
            {children}
          </TaskProvider>
				</AlertProvider>
			</DateModalProvider>
		</>
	);
}
