// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "yds-estate-mern.firebaseapp.com",
  projectId: "yds-estate-mern",
  storageBucket: "yds-estate-mern.appspot.com",
  messagingSenderId: "955871620542",
  appId: "1:955871620542:web:2500fe02fe317a48feddef",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
