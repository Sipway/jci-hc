// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQaZLc_P0Ii1tspcieXYDXOgfSKdp3tmY",
  authDomain: "jci-hc.firebaseapp.com",
  projectId: "jci-hc",
  storageBucket: "jci-hc.appspot.com",
  messagingSenderId: "225097408261",
  appId: "1:225097408261:web:d7a422d696017dde66216c",
  measurementId: "G-615547C9V6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);