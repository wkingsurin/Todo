export function taskReducer(state, action) {
	switch (action.type) {
		case "TYPE_TEXT":
			return { ...state, text: action.text };

		case "CLEAR_TEXT":
			return { ...state, text: "" };

		case "FOCUS": {
			action.inputRef.focus();
			return state;
		}

		default:
			return state;
	}
}
