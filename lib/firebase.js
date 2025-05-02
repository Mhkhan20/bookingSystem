import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2S1ZFmD8638uvJLx7dpsm7vV_c35hMfw",
  authDomain: "haircut-ac56f.firebaseapp.com",
  projectId: "haircut-ac56f",
  storageBucket: "haircut-ac56f.appspot.com",
  messagingSenderId: "799521528469",
  appId: "1:799521528469:web:bf4f425670589a2596199c",
  measurementId: "G-P0DX4NHLGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ These must be exported properly
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
