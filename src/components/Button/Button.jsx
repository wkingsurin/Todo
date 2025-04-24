import "./Button.scss";

export default function Button(props) {
	const { name, className, children, disabled, onClick } = props;

	return (
		<button
			className={`btn ${className}`}
			name={name}
			onClick={onClick ? (e) => onClick(e) : null}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
