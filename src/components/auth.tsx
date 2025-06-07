import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./auth.css";
import { signInFunc } from "../lib/firebase";

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
        onClick={() => signInFunc({ onSignIn })}
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
