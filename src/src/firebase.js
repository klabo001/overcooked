import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
	apiKey: "AIzaSyDPEO-IXqIbxN_Wb3pc-k6pExOyFxhfRBA",
	authDomain: "overcooked-41af4.firebaseapp.com",
	databaseURL: "https://overcooked-41af4.firebaseio.com",
	projectId: "overcooked-41af4",
	storageBucket: "overcooked-41af4.appspot.com",
	messagingSenderId: "821446523284",
	appId: "1:821446523284:web:e31fc4bbbf62f42d"
};

firebase.initializeApp(firebaseConfig);
export default firebase;