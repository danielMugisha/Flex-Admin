import { ActionTypes } from "./actionTypes";

export const signIn = (credentials) => {
	console.log(credentials);
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				console.log("success");
				dispatch({ type: ActionTypes.LOGIN_SUCCESS });
			})
			.catch((err) => {
				console.log("failure");
				dispatch({ type: ActionTypes.LOGIN_ERROR, err });
			});
	};
};

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: ActionTypes.LOGOUT_SUCCESS });
			});
	};
};
