import { ActionTypes } from "./actionTypes";

export const setRequests = (requests) => {
	var count = 1;
	//   var countDrivers = 0;
	requests.forEach((c) => {
		c.uid = count++;
		// countDrivers += 1;
	});
	return {
		type: ActionTypes.SET_REQUESTS,
		payload: { requests },
	};
};
