// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCANNcVhkJ5rQxrA-m-GfZp69-uJ7BpJlA",
  authDomain: "socialmediaapp-aac2e.firebaseapp.com",
  projectId: "socialmediaapp-aac2e",
  storageBucket: "socialmediaapp-aac2e.appspot.com",
  messagingSenderId: "776601413114",
  appId: "1:776601413114:web:188d6cce1ea339a6a47043"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();