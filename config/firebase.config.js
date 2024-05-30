
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct import

const firebaseConfig = {
  apiKey: "AIzaSyBlmDJMYGF-JXkOE1UuCdb6GX4m3Lnj9DQ",
  authDomain: "nbsc-bsit-chat-app.firebaseapp.com",
  projectId: "nbsc-bsit-chat-app",
  storageBucket: "nbsc-bsit-chat-app.appspot.com",
  messagingSenderId: "400821180400",
  appId: "1:400821180400:web:2a719ffc2f91cb74f6af35"
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with React Native persistence
const firebaseAuth = getAuth(app);


// Initialize Firestore
const firestoreDB = getFirestore(app);

export { app, firebaseAuth, firestoreDB };