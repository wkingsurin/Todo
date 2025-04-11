import "./App.scss";
import { useState } from "react";

import Providers from "../Providers";

import { taskTemplate } from "../../utils/utils";

import AppContainer from "../AppContainer";
import TasksContainer from "../TasksContainer/TasksContainer";

export default function App() {
	const [content, setContent] = useState(() => ({
		isActiveTab: "new",
		newTask: taskTemplate,
		notification: { text: "Task saved!" },
	}));

	return (
		<Providers>
			<div className="app">
				<AppContainer content={content} setContent={setContent}>
					<TasksContainer
						content={content}
						setContent={setContent}
					></TasksContainer>
				</AppContainer>
			</div>
		</Providers>
	);
}
