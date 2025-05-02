import "./AlertModal.scss";

import { useAlertModal } from "../../features/alertModal/useAlertModal";

export default function ModalAlert({ className, ref }) {
	const { alertModal } = useAlertModal();

	return (
		<div
			className={className}
			style={{
				position: "absolute",
				left: `${alertModal.position.x}px`,
				top: `${alertModal.position.y}px`,
				zIndex: 2,
			}}
			ref={ref}
		>
			<div className="content">
				<p className="text">{alertModal.text}</p>
			</div>
		</div>
	);
}
