import { useState } from "react";
import "./auth.css";
import { SignInPage } from "./signIn";
import { SignUpPage } from "./signUp";

interface AuthProp {
  onSignIn: () => void;
}

export default function Auth({ onSignIn }: AuthProp) {
  const [isSignIn, setSignIn] = useState(true);

  return (
    <div className="auth-page">
      {isSignIn ? (
        <SignInPage onSignIn={onSignIn} setSignIn={setSignIn}></SignInPage>
      ) : (
        <SignUpPage onSignIn={onSignIn} setSignIn={setSignIn}></SignUpPage>
      )}
    </div>
  );
}
