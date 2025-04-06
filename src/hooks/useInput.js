import { useState } from "react";

export function useInput(initialValue) {
	const [value, setInput] = useState(initialValue);

	const onChange = (event) => {
		setInput(event.target.value);
	};
	const clear = () => setInput("");

	return {
		bind: { value, onChange },
		value,
		clear,
		setInput,
	};
}
