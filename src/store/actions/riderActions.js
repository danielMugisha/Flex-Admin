import { ActionTypes } from "./actionTypes";

export const setRiders = (riders) => {
  var count = 1;
  riders.forEach((r) => {
    r.uid = count++;
  });
  var requests = 0;
  var rides = 0;
  var countRiders = 0;

  riders.forEach((r) => {
    requests += r.Requests;
    rides += r.Rides;
    countRiders += 1;
  });
  return {
    type: ActionTypes.SET_RIDERS,
    payload: { riders, requests, rides, countRiders },
  };
};

export const selectedrider = (rider) => {
  return {
    type: ActionTypes.SELECTED_RIDER,
    payload: rider,
  };
};
