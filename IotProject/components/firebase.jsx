import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env"; // Ensure @env is correctly configured

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 Function to Log in a User
export const autoLoginUser = async ()=> {//email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, "joseph.troughton@gmail.com", "123456");//auth, email, password);
    console.log("✅ User Logged In:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    return null;
  }
};

// 🔹 Function to Listen for Authentication State (User Persistence)
export const listenForAuthChanges = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export { auth };
export default app;
