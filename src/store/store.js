import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebaseConfig from "../firebase";

const store = createStore(
	rootReducer,
	{},
	compose(
		applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
		reduxFirestore(firebaseConfig),
		reactReduxFirebase(firebaseConfig, {
			useFirestoreForProfile: true,
			userProfile: "users",
		}),
		window.devToolsExtension ? window.devToolsExtension() : (f) => f
	)
);

export default store;
