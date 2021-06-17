import { ActionTypes } from "../actions/actionTypes";

const initialState = {
  riders: [],
  totalRequests: 0,
  totalRides: 0,
  totalRiders: 0,
};

export const riderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_RIDERS:
      return {
        ...state,
        riders: payload.riders,
        totalRequests: payload.requests,
        totalRides: payload.rides,
        totalRiders: payload.countRiders,
      };
    default:
      return state;
  }
};
