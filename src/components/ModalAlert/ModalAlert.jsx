import "./ModalAlert.scss";

import { useAlert } from "../../features/alert/useAlert";

export default function ModalAlert() {
	const { alert } = useAlert();

	return (
		<div
			className="modal notification"
			style={{
				position: "absolute",
				left: `${alert.position.x}px`,
				top: `${alert.position.y}px`,
				zIndex: 2,
			}}
		>
			<div className="content">
				<p className="text">{alert.text}</p>
			</div>
		</div>
	);
}
