import { GoogleOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import { signInEmail, signInGoogle } from "../lib/firebase";
import { Divider, Input } from "antd";
import { useState } from "react";

interface AuthProp {
  onSignIn: () => void;
  setSignIn: (state: boolean) => void;
}

function signInFunc(
  email: string,
  password: string,
  { onSignIn }: { onSignIn: () => void }
) {
  signInEmail(email, password, { onSignIn });
}

function SignInPage({ onSignIn, setSignIn }: AuthProp) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="auth-container">
      <h1>Welcome Back</h1>
      <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <Input.Password
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="primary"
        onClick={() => signInFunc(email, password, { onSignIn })}
      >
        Sign In
      </Button>
      <Divider>or</Divider>
      <Button
        icon={<GoogleOutlined />}
        size={"large"}
        onClick={() => signInGoogle({ onSignIn })}
      >
        Sign In with Google
      </Button>
      <p className="bottom-text">
        Don't have an account?
        <a className="alternative-text" onClick={() => setSignIn(false)}>
          Sign Up
        </a>
      </p>
    </div>
  );
}

export { SignInPage };
