import { TaskProvider } from "../../features/newTask/TaskContext";
import { AlertModalProvider } from "../../features/alertModal/AlertModalContext";
import { DateModalProvider } from "../../features/dateModal/DateModalContext";
import { ModalProvider } from "../../features/notificationModal/NotificationModalContext";

export default function Providers({ children }) {
	return (
		<>
			<DateModalProvider>
				<AlertModalProvider>
					<ModalProvider>
						<TaskProvider>{children}</TaskProvider>
					</ModalProvider>
				</AlertModalProvider>
			</DateModalProvider>
		</>
	);
}
