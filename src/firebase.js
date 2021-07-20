import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDi-ds1_EGpTpqyUlz4mmfA0EZxNzwRgxs",
	authDomain: "flex-admin0110.firebaseapp.com",
	projectId: "flex-admin0110",
	storageBucket: "flex-admin0110.appspot.com",
	messagingSenderId: "717745676581",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
