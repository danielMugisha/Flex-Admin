import { ActionTypes } from "./actionTypes";

export const setDrivers = (drivers) => {
  var count = 1;
  var countDrivers = 0;
  drivers.forEach((d) => {
    d.uid = count++;
    countDrivers += 1;
  });
  return {
    type: ActionTypes.SET_DRIVERS,
    payload: {drivers, countDrivers},
  };
};

export const selectedDriver = (driver) => {
  return {
    type: ActionTypes.SELECTED_DRIVER,
    payload: driver,
  };
};
