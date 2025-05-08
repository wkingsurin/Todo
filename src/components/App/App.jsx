import "./App.scss";
import { useEffect, useState, useRef } from "react";

import { Transition } from "react-transition-group";

import Providers from "../Providers";

import AppContainer from "../AppContainer";
import TasksContainer from "../TasksContainer";
import Loader from "../Loader";

export default function App() {
	const [content, setContent] = useState(() => ({
		activeTab: "active",
	}));
	const [loading, setLoading] = useState(true);

	const loaderRef = useRef(null);
	const appContainerRef = useRef(null);

	useEffect(() => {
		if (
			document.readyState === "complete" ||
			document.readyState === "interactive"
		) {
			setLoading(false);
		} else {
			const handleReady = () => {
				setLoading(false);
			};

			document.addEventListener("DOMContentLoaded", handleReady);

			return () => {
				document.removeEventListener("DOMContentLoaded", handleReady);
			};
		}
	}, []);

	return (
		<Providers>
			<div className="app">
				<Transition
					in={loading}
					timeout={500}
					mountOnEnter
					unmountOnExit
					nodeRef={loaderRef}
				>
					{(state) => (
						<Loader className={`loader-body ${state}`} ref={loaderRef}></Loader>
					)}
				</Transition>
				<Transition
					in={!loading}
					timeout={500}
					mountOnEnter
					unmountOnExit
					nodeRef={appContainerRef}
				>
					{(state) => {
						return (
							<AppContainer
								content={content}
								setContent={setContent}
								className={`app-container ${state}`}
								ref={appContainerRef}
							>
								<TasksContainer
									content={content}
									setContent={setContent}
								></TasksContainer>
							</AppContainer>
						);
					}}
				</Transition>
			</div>
		</Providers>
	);
}
