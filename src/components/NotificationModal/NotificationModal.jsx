import { useNotificationModal } from "../../features/notificationModal/useNotificationModal";
import { useEffect } from "react";

export default function NotificationModal({ className, ref, position }) {
	const { hideModal } = useNotificationModal();

	useEffect(() => {
		const timer = setTimeout(() => hideModal(), 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className={className}
			style={{
				position: "absolute",
				left: `${position.x}px`,
				top: `${position.y}px`,
			}}
			ref={ref}
		>
			<div className="content">
				<p className="text">Task saved!</p>
			</div>
		</div>
	);
}
