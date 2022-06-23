import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const config = {
  apiKey: "AIzaSyDXrs4A1Ea5qkHQiVAX9S18zN_n5Jq7NNA",
  authDomain: "kibiaccessories-e5b41.firebaseapp.com",
  projectId: "kibiaccessories-e5b41",
  storageBucket: "kibiaccessories-e5b41.appspot.com",
  messagingSenderId: "875061899031",
  appId: "1:875061899031:web:6fcd361370ff15f0b89152",
  measurementId: "G-L6JRSTJFT0",
};

const firebase = initializeApp(config);
export default firebase;
