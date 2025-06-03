import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo11oBZRsffUQ9nbWIqE_w-F5Z_TAdUxg",
  authDomain: "daily-logger-6bd3e.firebaseapp.com",
  projectId: "daily-logger-6bd3e",
  storageBucket: "daily-logger-6bd3e.firebasestorage.app",
  messagingSenderId: "758273574981",
  appId: "1:758273574981:web:e72684eaf53b290cc2bb2c",
  measurementId: "G-Y167RPR4S5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export { app, auth };
