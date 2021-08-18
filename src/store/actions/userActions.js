import { ActionTypes } from "./actionTypes";

export const setUsers = (users) => {
	var count = 1;
	var countUsers = 0;
	users.forEach((u) => {
		u.uid = count++;
		countUsers += 1;
	});
	return {
		type: ActionTypes.SET_USERS,
		payload: { users, countUsers },
	};
};

export const selectedUser = (user) => {
	return {
		type: ActionTypes.SELECTED_USER,
		payload: user,
	};
};
