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

	const switchTab = (e) => {
		setContent((prev) => {
			return {
				...prev,
				isActiveTab: e.target.name,
			};
		});
	};

	return (
		<Providers>
			<div className="app">
				<AppContainer>
					<div className="tabs">
						<button
							className={`btn ${content.isActiveTab == "new" ? "active" : ""}`}
							name="new"
							onClick={(e) => switchTab(e)}
						>
							New
						</button>
						<button
							className={`btn ${
								content.isActiveTab == "actual" ? "active" : ""
							}`}
							name="actual"
							onClick={(e) => switchTab(e)}
						>
							Actual
						</button>
						<button
							className={`btn ${
								content.isActiveTab == "wasted" ? "active" : ""
							}`}
							name="wasted"
							onClick={(e) => switchTab(e)}
						>
							Wasted
						</button>
						<button
							className={`btn ${
								content.isActiveTab == "completed" ? "active" : ""
							}`}
							name="completed"
							onClick={(e) => switchTab(e)}
						>
							Completed
						</button>
					</div>
					<TasksContainer
						content={content}
						setContent={setContent}
					></TasksContainer>
				</AppContainer>
			</div>
		</Providers>
	);
}
