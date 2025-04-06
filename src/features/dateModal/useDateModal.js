import { useContext } from "react";
import { DateModalContext } from "./DateModalContext";

export function useDateModal() {
	return useContext(DateModalContext);
}
