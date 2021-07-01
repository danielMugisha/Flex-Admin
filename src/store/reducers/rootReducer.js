import { driverReducer } from "./driverReducer";
import { combineReducers } from "redux";
import { riderReducer } from "./riderReducer";
import { categoriesReducer } from "./categoriesReducer";
import { carReducer } from "./carReducer";

const rootReducer = combineReducers({
	allDrivers: driverReducer,
	allRiders: riderReducer,
	allCategories: categoriesReducer,
	allCars: carReducer,
});

export default rootReducer;
