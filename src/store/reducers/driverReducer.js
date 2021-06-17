import { ActionTypes } from "../actions/actionTypes";

const initialState = {
  drivers: [],
  totalDrivers: 0,
};

export const driverReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_DRIVERS:
      return {
        ...state,
        drivers: payload.drivers,
        totalDrivers: payload.countDrivers,
      };
    default:
      return state;
  }
};
