import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

const AuthIsLoaded = ({ children }) => {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth)) return <div>Loading...</div>;
	return children;
};

ReactDOM.render(
	<Provider store={store}>
		<AuthIsLoaded>
			<App />
		</AuthIsLoaded>
	</Provider>,
	document.getElementById("root")
);
