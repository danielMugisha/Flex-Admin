import { ActionTypes } from "./actionTypes";

export const setCars = (cars) => {
	var count = 1;
	//   var countDrivers = 0;
	cars.forEach((c) => {
		c.uid = count++;
		// countDrivers += 1;
	});
	return {
		type: ActionTypes.SET_CARS,
		payload: { cars },
	};
};
