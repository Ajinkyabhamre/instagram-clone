
import firebase from "firebase";

const  firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBVbWVF64TzmP7SNd-ZTrFLZFRyMxSGWhk",
    authDomain: "instagram-final-clone.firebaseapp.com",
    databaseURL: "https://instagram-final-clone-default-rtdb.firebaseio.com",
    projectId: "instagram-final-clone",
    storageBucket: "instagram-final-clone.appspot.com",
    messagingSenderId: "74756310966",
    appId: "1:74756310966:web:b3fa1536d6648a6c0e2317",
    measurementId: "G-Q941ZLWDBN"
});

const db = firebaseApp.firestore();
const auth =  firebase.auth();
const storage = firebase.storage();

export {db,  auth,  storage,firebase};