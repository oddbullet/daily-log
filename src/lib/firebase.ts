import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { getLocalDate, getLocalTime } from "./timeStuff";

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
const db = getDatabase();

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
      console.log("Failed to Sign Out");
    });
}

function addEntries(entry: string | undefined) {
  const today = getLocalDate();

  if (!auth.currentUser) {
    console.log("User not Authenticated");
    return;
  }

  const entryData = {
    entry: entry,
    time: getLocalTime(),
  };

  push(ref(db, `users/${auth.currentUser.uid}/entries/${today}`), entryData);
}

function updateEntries(
  entry: string | undefined,
  id: string | null,
  time: string | null
) {
  const today = getLocalDate();

  console.log(id);

  if (!auth.currentUser) {
    console.log("User not Authenticated");
    return;
  }

  if (!id) {
    console.log("id is empty");
    return;
  }

  const entryData = {
    entry: entry,
    time: time,
  };

  set(
    ref(db, `users/${auth.currentUser.uid}/entries/${today}/${id}`),
    entryData
  );
}

function getDateEntires(getDate: string, callback: (data: any) => void) {
  const entriesRef = ref(db, "users/" + auth.currentUser?.uid + "/entries");

  onValue(entriesRef, (snapshot) => {
    const data = snapshot.val();

    if (!data || !data[getDate]) {
      callback([]);
      return;
    }

    const objectData = Object.entries(data[getDate])
      .map(([id, value]) => ({
        id,
        ...value!,
      }))
      .reverse();

    // console.log("objectData ", objectData);
    callback(objectData);
  });
}

function currentUser() {
  console.log(auth.currentUser);
  return auth.currentUser;
}

export {
  app,
  auth,
  signOutFunc,
  signInFunc,
  addEntries,
  updateEntries,
  currentUser,
  getDateEntires,
};
