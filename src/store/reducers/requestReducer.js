import { ActionTypes } from "../actions/actionTypes";

const initialState = {
	requests: [],
};

export const requestReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_REQUESTS:
			return {
				...state,
				requests: payload.requests,
			};
		default:
			return state;
	}
};
