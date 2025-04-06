import "./Button.scss";

export default function Button(props) {
	const { name, children, disabled, onClick } = props;

	return (
		<button
			className="btn"
			name={name}
			onClick={onClick ? (e) => onClick(e) : null}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
