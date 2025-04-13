import { useModal } from "../../features/modal/useModal";

export default function Modal() {
	const { notification } = useModal();

	return (
		<div
			className="modal notification"
			style={{
				position: "absolute",
				left: `${notification.position.x}px`,
				top: `${notification.position.y}px`,
			}}
		>
			<div className="content">
				<p className="text">Task saved!</p>
			</div>
		</div>
	);
}
