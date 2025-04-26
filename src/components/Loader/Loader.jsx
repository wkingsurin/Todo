import "./Loader.scss";

export default function Loader({ className, ref }) {
	return (
		<div className={className} ref={ref}>
			<div className="loader"></div>
		</div>
	);
}
