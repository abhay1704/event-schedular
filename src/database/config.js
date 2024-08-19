// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { json } from "react-router-dom";

// Initialize Firebase
const firebaseConfig = process.env.REACT_APP_FIREBASE_CONFIG;
const parsedConfig = JSON.parse(firebaseConfig);

const app = initializeApp(parsedConfig);
// const analytics = getAnalytics(app);

export default app;
