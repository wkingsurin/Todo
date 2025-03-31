export default function TextInput({ value, typeText }) {
	return (
		<input
			type="text"
			placeholder="Enter the text..."
			value={value != null ? value : ""}
			onChange={(e) => typeText(e)}
		/>
	);
}
