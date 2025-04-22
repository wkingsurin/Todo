export default function TextInput({ value, onChange, ref, minLength = 1 }) {
	return (
		<input
			type="text"
			placeholder="Enter the text..."
			value={value != null ? value : ""}
			onChange={(e) => onChange(e.target.value)}
			ref={ref}
			minLength={minLength}
		/>
	);
}
