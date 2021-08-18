import { driverReducer } from "./driverReducer";
import { combineReducers } from "redux";
import { riderReducer } from "./riderReducer";
import { categoriesReducer } from "./categoriesReducer";
import { carReducer } from "./carReducer";
import { userReducer } from "./userReducer";
import { requestReducer } from "./requestReducer";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
	allDrivers: driverReducer,
	allRiders: riderReducer,
	allCategories: categoriesReducer,
	allCars: carReducer,
	allRequests: requestReducer,
	allUsers: userReducer,
	auth: authReducer,
	firebase: firebaseReducer,
});

export default rootReducer;
