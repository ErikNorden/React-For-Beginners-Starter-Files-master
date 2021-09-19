import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCCL-klE6wvtXdHxZ_Gq8RcU9x5-UKc1Bs",
  authDomain: "catch-of-the-day-a815d.firebaseapp.com",
  projectId: "catch-of-the-day-a815d",
  storageBucket: "catch-of-the-day-a815d.appspot.com",
  messagingSenderId: "455022725918",
  appId: "1:455022725918:web:961c41c3e0c404198e570f",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

//this is a named export
export { firebaseApp };

//this is the default export
export default base;
