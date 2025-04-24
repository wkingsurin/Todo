export function taskReducer(state, action) {
	switch (action.type) {
		case "TYPE_TEXT":
			return { ...state, text: action.text };

		case "CLEAR_TEXT":
			return { ...state, text: "" };

		case "FOCUS": {
			action.inputRef.current.querySelector("input").focus();
			return { ...state, isFocused: true };
		}
		case "BLUR": {
			if (!action.open) {
				return { ...state, isFocused: false };
			} else return state;
		}

		default:
			return state;
	}
}
