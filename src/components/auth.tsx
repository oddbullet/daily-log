import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./auth.css";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  type Auth,
} from "firebase/auth";
import { auth } from "../lib/firebase";

function SignUpFunction(onSignIn: () => void) {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
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

function SignOutFunction() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

function NotNew() {}

function SignIn({ onSignIn, Toggle }: AuthProp) {
  return (
    <>
      <Button
        icon={<GoogleOutlined />}
        size={"large"}
        onClick={() => SignUpFunction(onSignIn)}
      >
        Sign In with Google
      </Button>
      <p className="alternative-text">
        Don't have an account? <a onClick={Toggle}>Sign Up</a>
      </p>
    </>
  );
}

function SignUp({ onSignIn, Toggle }: AuthProp) {
  return (
    <>
      <Button
        icon={<GoogleOutlined />}
        size={"large"}
        onClick={() => SignUpFunction(onSignIn)}
      >
        Sign Up with Google
      </Button>
      <p className="alternative-text">
        Already have an account? <a onClick={Toggle}>Sign In</a>
      </p>
    </>
  );
}

interface AuthProp {
  onSignIn: () => void;
  Toggle: () => void;
}

export default function Auth({ onSignIn }: AuthProp) {
  const [isNew, setIsNew] = useState(true);

  const Toggle = () => {
    setIsNew(!isNew);
  };

  if (isNew) {
    return (
      <div className="auth-container">
        <SignUp onSignIn={onSignIn} Toggle={Toggle}></SignUp>
      </div>
    );
  }
  return (
    <div className="auth-container">
      <SignIn onSignIn={onSignIn} Toggle={Toggle}></SignIn>
    </div>
  );
}
