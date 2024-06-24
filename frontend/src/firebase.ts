// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3pltFhqFGsBgck79y0SCMKP9VSFRyE_I",
  authDomain: "bedflow-71f11.firebaseapp.com",
  projectId: "bedflow-71f11",
  storageBucket: "bedflow-71f11.appspot.com",
  messagingSenderId: "406017836138",
  appId: "1:406017836138:web:2b38ad7cc738d4c76e7613",
  measurementId: "G-YHZT31BCDY",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
