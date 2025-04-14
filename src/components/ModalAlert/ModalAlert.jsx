import "./ModalAlert.scss";

import { useAlert } from "../../features/alert/useAlert";

export default function ModalAlert({ className, ref }) {
	const { alert } = useAlert();

	return (
		<div
			className={className}
			style={{
				position: "absolute",
				left: `${alert.position.x}px`,
				top: `${alert.position.y}px`,
				zIndex: 2,
			}}
			ref={ref}
		>
			<div className="content">
				<p className="text">{alert.text}</p>
			</div>
		</div>
	);
}
