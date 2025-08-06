// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuAQPBMrCjdk0FCreAsbv87wOPINKGQNU",
  authDomain: "studybuddy-9899.firebaseapp.com",
  projectId: "studybuddy-9899",
  storageBucket: "studybuddy-9899.firebasestorage.app",
  messagingSenderId: "1033208225303",
  appId: "1:1033208225303:web:50b7014e62304347884652"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);