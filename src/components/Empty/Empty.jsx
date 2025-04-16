import "./Empty.scss";

export default function Empty({ className, ref, children }) {
	return (
		<p className={className} ref={ref}>
			{children}
		</p>
	);
}
