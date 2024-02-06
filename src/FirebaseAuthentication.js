// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvir0JNlO4tjkOF5-DyoxVuOanbaoqABY",
  authDomain: "blog-website-9e9c0.firebaseapp.com",
  projectId: "blog-website-9e9c0",
  storageBucket: "blog-website-9e9c0.appspot.com",
  messagingSenderId: "609376178488",
  appId: "1:609376178488:web:083f75d9c669ba5c9031cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export  const  auth  = getAuth(app); 
export  const provider  = new GoogleAuthProvider(); 