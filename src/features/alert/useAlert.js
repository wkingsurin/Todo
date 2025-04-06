import { useContext } from "react";
import { AlertContext } from "./AlertContext";

export function useAlert() {
	return useContext(AlertContext);
}
