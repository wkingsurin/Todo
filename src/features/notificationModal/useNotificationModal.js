import { useContext } from "react";
import { NotificationModalContext } from "./NotificationModalContext";

export function useNotificationModal() {
	return useContext(NotificationModalContext);
}
