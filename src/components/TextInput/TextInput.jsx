export default function TextInput({
	value,
	onFocus,
	onBlur,
	onChange,
	ref,
	minLength = 1,
}) {
	return (
		<input
			type="text"
			placeholder="Enter the text..."
			value={value != null ? value : ""}
			onFocus={onFocus}
			onBlur={onBlur}
			onChange={(e) => onChange(e.target.value)}
			ref={ref}
			minLength={minLength}
		/>
	);
}
