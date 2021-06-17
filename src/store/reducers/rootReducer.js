import { driverReducer } from "./driverReducer";
import { combineReducers } from "redux";
import { riderReducer } from "./riderReducer";

const rootReducer = combineReducers({
  allDrivers: driverReducer,
  allRiders: riderReducer,
});

export default rootReducer;
