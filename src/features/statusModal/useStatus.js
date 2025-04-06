import { useContext } from "react";
import { StatusModalContext } from "./StatusModalContext";

export default function useStatus() {
	return useContext(StatusModalContext)
}
