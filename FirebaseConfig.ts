// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI0tcRvBRn3kHsE5hPdYvDuvVZVcPQWic",
  authDomain: "clasi-app.firebaseapp.com",
  projectId: "clasi-app",
  storageBucket: "clasi-app.appspot.com",
  messagingSenderId: "594373278428",
  appId: "1:594373278428:web:1ba338143fc3f751ddd219",
  measurementId: "G-XX7EZRND9M",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// const analytics = getAnalytics(app);
