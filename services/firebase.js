import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBetMODv8YgYo5IO_g1eNa99D3NfvtGJ5Y",
  authDomain: "computer-shop-27552.firebaseapp.com",
  projectId: "computer-shop-27552",
  storageBucket: "computer-shop-27552.appspot.com",
  messagingSenderId: "580723051644",
  appId: "1:580723051644:web:c55327dd97cb7d5fb50df9",
  measurementId: "G-ZFEGD3XKT4"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)

}
const firestore = firebase.firestore();
const fireStorage = firebase.storage();
const fireAuth = firebase.auth();

export {
  firestore,
  fireStorage,
  fireAuth,


}