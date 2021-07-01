import { ActionTypes } from "./actionTypes";

export const setCategories = (categories) => {
	var count = 1;
	//   var countDrivers = 0;
	categories.forEach((c) => {
		c.uid = count++;
		// countDrivers += 1;
	});
	return {
		type: ActionTypes.SET_CAR_CATEGORIES,
		payload: { categories },
	};
};

// export const selectedDriver = (driver) => {
// 	return {
// 		type: ActionTypes.SELECTED_DRIVER,
// 		payload: driver,
// 	};
// };
