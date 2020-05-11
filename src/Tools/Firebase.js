import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBWlPq9AQupDA1ucHi5rp_1ZIkPsUCfePQ",
  authDomain: "hdp-3f94e.firebaseapp.com",
  databaseURL: "https://hdp-3f94e.firebaseio.com",
  projectId: "hdp-3f94e",
  storageBucket: "hdp-3f94e.appspot.com",
  messagingSenderId: "1087827094403",
  appId: "1:1087827094403:web:9e9e8bcff662c4df6264b6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;