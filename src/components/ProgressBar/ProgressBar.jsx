import "./ProgressBar.scss";

import { useState, useRef, useEffect } from "react";
import { colors, interpolateColor } from "../../utils/utils";

export default function ProgressBar({ task, width }) {
	const [color, setColor] = useState("rgb(79, 230, 129)");
	const startRef = useRef();
	const frameRef = useRef();

	useEffect(() => {
		startRef.current =
			performance.now() - (task.totalTime - task.remainingTime);

		const animate = (time) => {
			const elapsed = time - startRef.current;
			const progressRatio = Math.min(elapsed / task.totalTime, 1);

			let newColor;

			if (progressRatio < 0.25) {
				newColor = interpolateColor(colors[0], colors[1], progressRatio / 0.25);
			} else if (progressRatio < 0.5) {
				newColor = interpolateColor(
					colors[1],
					colors[2],
					(progressRatio - 0.25) / 0.25
				);
			} else if (progressRatio < 0.75) {
				newColor = interpolateColor(
					colors[2],
					colors[3],
					(progressRatio - 0.5) / 0.25
				);
			} else {
				newColor = interpolateColor(
					colors[3],
					colors[4],
					(progressRatio - 0.75) / 0.25
				);
			}
			setColor(newColor);

			if (progressRatio < 1) {
				frameRef.current = requestAnimationFrame(animate);
			}
		};

		frameRef.current = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(frameRef.current);
	}, [task.remainingTime]);

	return (
		<div
			className="progress-bar"
			style={{
				width: width + "%",
				backgroundColor:
					task.type === "wasted"
						? "#E64F4F"
						: task.type === "completed"
						? "#4FE681"
						: color,
				transition: `1s linear`,
			}}
		></div>
	);
}
