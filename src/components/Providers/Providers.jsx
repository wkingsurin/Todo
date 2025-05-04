import { NewTaskProvider } from "../../features/newTask/NewTaskContext";
import { AlertModalProvider } from "../../features/alertModal/AlertModalContext";
import { DateModalProvider } from "../../features/dateModal/DateModalContext";
import { ModalProvider } from "../../features/notificationModal/NotificationModalContext";

export default function Providers({ children }) {
	return (
		<>
			<DateModalProvider>
				<AlertModalProvider>
					<ModalProvider>
						<NewTaskProvider>{children}</NewTaskProvider>
					</ModalProvider>
				</AlertModalProvider>
			</DateModalProvider>
		</>
	);
}
