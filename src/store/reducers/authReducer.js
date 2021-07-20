import { ActionTypes } from "../actions/actionTypes";

const initState = {
	authError: null,
};
const authReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case ActionTypes.LOGIN_ERROR:
			console.log("login failed");
			return {
				...state,
				authError: "Login failed",
			};
		case ActionTypes.LOGIN_SUCCESS:
			console.log("login success");
			return {
				...state,
				authError: null,
			};
		case ActionTypes.LOGOUT_SUCCESS:
			console.log("logout success");
			return state;

		default:
			return state;
	}
};

export default authReducer;
