import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage';
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD7tTPTNkY4B3qmrDg8owvLQk67xeNLSlw",
  authDomain: "trouble-tickets-007.firebaseapp.com",
  databaseURL: "https://trouble-tickets-007.firebaseio.com",
  projectId: "trouble-tickets-007",
  storageBucket: "trouble-tickets-007.appspot.com",
  messagingSenderId: "430323187832",
  appId: "1:430323187832:web:0bffffabf96392b95bed8d",
  measurementId: "G-Q42QSZ2EQ2"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
