import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import logo from "../src/assets/img/logo1.png";

const AuthIsLoaded = ({ children }) => {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth))
		return (
			<div
				style={{
					width: "100%",
					height: "100vh",
					backgroundColor: "#0289b2",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div>
					<img className="logoBrand" src={logo} alt="logo" />
					<Box sx={{ width: "100%" }}>
						<LinearProgress />
					</Box>
				</div>
			</div>
		);
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
