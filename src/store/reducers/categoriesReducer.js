import { ActionTypes } from "../actions/actionTypes";

const initialState = {
	categories: [],
};

export const categoriesReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_CAR_CATEGORIES:
			return {
				...state,
				categories: payload.categories,
			};
		default:
			return state;
	}
};
