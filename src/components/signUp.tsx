import { GoogleOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import { signInGoogle, signUpEmail } from "../lib/firebase";
import { Divider, Input } from "antd";
import { useState } from "react";

interface AuthProp {
  onSignIn: () => void;
  setSignIn: (state: boolean) => void;
}

function signUpFunc(
  email: string,
  password: string,
  confirmPassword: string,
  { onSignIn }: { onSignIn: () => void }
) {
  if (password != confirmPassword) {
    console.log("Password don't match");
    return;
  }
  signUpEmail(email, password, { onSignIn });
}

function SignUpPage({ onSignIn, setSignIn }: AuthProp) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setconfirmPassword] = useState<string>("");

  return (
    <div className="auth-container">
      <h1>Get Started</h1>
      <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <Input.Password
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input.Password
        placeholder="Confirm Password"
        onChange={(e) => setconfirmPassword(e.target.value)}
      />
      <Button
        type="primary"
        onClick={() =>
          signUpFunc(email, password, confirmPassword, { onSignIn })
        }
      >
        Sign Up
      </Button>
      <Divider>or</Divider>
      <Button
        icon={<GoogleOutlined />}
        size={"large"}
        onClick={() => signInGoogle({ onSignIn })}
      >
        Sign Up with Google
      </Button>
      <p className="bottom-text">
        Already have an account?{" "}
        <a className="alternative-text" onClick={() => setSignIn(true)}>
          Sign In
        </a>
      </p>
    </div>
  );
}

export { SignUpPage };
