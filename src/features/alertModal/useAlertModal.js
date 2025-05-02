import { useContext } from "react";
import { AlertModalContext } from "./AlertModalContext";

export function useAlertModal() {
	return useContext(AlertModalContext);
}
