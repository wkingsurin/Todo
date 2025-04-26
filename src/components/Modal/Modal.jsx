import { useModal } from "../../features/modal/useModal";
import { useEffect } from "react";

export default function Modal({ className, ref, position }) {
	const { hideModal } = useModal();

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
