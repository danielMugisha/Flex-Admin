import { ActionTypes } from "../actions/actionTypes";

const initialState = {
	cars: [],
};

export const carReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_CARS:
			return {
				...state,
				cars: payload.cars,
			};
		default:
			return state;
	}
};
