import { TaskProvider } from "../../features/newTask/TaskContext";
import { AlertProvider } from "../../features/alert/AlertContext";
import { DateModalProvider } from "../../features/dateModal/DateModalContext";
import { ModalProvider } from "../../features/modal/ModalContext";

export default function Providers({ children }) {
	return (
		<>
			<DateModalProvider>
				<AlertProvider>
					<ModalProvider>
						<TaskProvider>{children}</TaskProvider>
					</ModalProvider>
				</AlertProvider>
			</DateModalProvider>
		</>
	);
}
