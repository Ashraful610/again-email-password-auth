// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAE4amiDYj9mchMVigsmOY0s3ZbfKqvPU",
  authDomain: "again-email-password-auth.firebaseapp.com",
  projectId: "again-email-password-auth",
  storageBucket: "again-email-password-auth.appspot.com",
  messagingSenderId: "620039476532",
  appId: "1:620039476532:web:a76f1a528c4adedaf10161"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app