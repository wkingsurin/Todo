import { useModal } from "../../features/modal/useModal";
import { useEffect } from "react";

export default function Modal({ className, ref }) {
	const { notification, hideModal } = useModal();

	useEffect(() => {
		const timer = setTimeout(() => hideModal(), 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className={className}
			style={{
				position: "absolute",
				left: `${notification.position.x}px`,
				top: `${notification.position.y}px`,
			}}
			ref={ref}
		>
			<div className="content">
				<p className="text">Task saved!</p>
			</div>
		</div>
	);
}
