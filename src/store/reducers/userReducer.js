import { ActionTypes } from "../actions/actionTypes";

const initialState = {
	users: [],
	totalUsers: 0,
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_USERS:
			return {
				...state,
				users: payload.users,
				totalUsers: payload.countUsers,
			};
		default:
			return state;
	}
};
