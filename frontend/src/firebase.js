// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIXcbbtUoBWqK4P9mxYHyyiqbQVLlJlFc",
  authDomain: "quora-14911.firebaseapp.com",
  projectId: "quora-14911",
  storageBucket: "quora-14911.appspot.com",
  messagingSenderId: "847268832982",
  appId: "1:847268832982:web:c07cfadebeae3168e3cb77",
  measurementId: "G-ZPM89B7BVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
