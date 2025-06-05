import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";

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
  databaseURL: "https://daily-logger-6bd3e-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

let userId: User | null = null;

interface AuthProp {
  onSignIn: () => void;
}

function signInFunc({ onSignIn }: AuthProp) {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      userId = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      onSignIn();
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

function signOutFunc() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

const db = getDatabase();

function addEntries(entry: string) {
  const today = new Date().toISOString().split("T")[0];
  if (!auth.currentUser) {
    console.log("User not Authenticated");
    return;
  }

  const entryData = {
    entry: entry,
  };

  console.log("userID" + auth.currentUser?.uid);
  push(ref(db, `users/${auth.currentUser.uid}/entries/${today}`), entryData);
}

export { app, auth, signOutFunc, signInFunc, addEntries };
