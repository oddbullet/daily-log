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

interface AuthProp {
  onSignIn: () => void;
}

export default function Auth({ onSignIn }: AuthProp) {
  const [isSignIn, setSignIn] = useState(false);

  return (
    <div className="auth-container">
      <Button
        icon={<GoogleOutlined />}
        size={"large"}
        onClick={() => SignUpFunction(onSignIn)}
      >
        {isSignIn ? "Sign In with Google" : "Sign Up with Google"}
      </Button>
      <p className="alternative-text">
        Already have an account?{" "}
        <a onClick={() => setSignIn(!isSignIn)}>
          {isSignIn ? "Sign Up" : "Sign In"}
        </a>
      </p>
    </div>
  );
}
