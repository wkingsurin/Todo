export default function TextInput({ value, onChange }) {
	return (
		<input
			type="text"
			placeholder="Enter the text..."
			value={value != null ? value : ""}
			onChange={(e) => onChange(e.target.value)}
		/>
	);
}
