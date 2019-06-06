import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB55FfHsHgvT01KTrM_g6aFsUKZlClKG_Y",
  authDomain: "catch-of-the-day-bsod.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-bsod.firebaseio.com",
  projectId: "catch-of-the-day-bsod"
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;