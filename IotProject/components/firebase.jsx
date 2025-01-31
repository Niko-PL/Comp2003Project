// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const isNative = Platform.OS === "ios" || Platform.OS === "android";

const firebaseConfig = isNative
  ? {
    apiKey: "AIzaSyDHtE6FBvX1_dvwfgY9nXTO-kgWlOEIXv0",
    authDomain: "farfield-iot-management-system.firebaseapp.com",
    databaseURL: "https://farfield-iot-management-system-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "farfield-iot-management-system",
    storageBucket: "farfield-iot-management-system.firebasestorage.app",
    messagingSenderId: "1062325770420",
    appId: "1:1062325770420:web:f2f49f63c3b738c60b9fe1",
    measurementId: "G-2XJE2DN16Z"
    }
  : {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
    };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
