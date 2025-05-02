import { setLinkedClassName } from "../../utils/utils";

import Button from "../Button";

export default function Tabs({ content, handleSwitch }) {
	return (
		<div className="tabs">
			<Button
				className={`${setLinkedClassName(content, "new")}`}
				name="new"
				onClick={handleSwitch}
			>
				New
			</Button>
			<Button
				className={`${setLinkedClassName(content, "wasted")}`}
				name="wasted"
				onClick={handleSwitch}
			>
				Wasted
			</Button>
			<Button
				className={`${setLinkedClassName(content, "completed")}`}
				name="completed"
				onClick={handleSwitch}
			>
				Completed
			</Button>
		</div>
	);
}
