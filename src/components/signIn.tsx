import { GoogleOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import { signInFunc } from "../lib/firebase";
import { Divider, Input } from "antd";

interface AuthProp {
  onSignIn: () => void;
  setSignIn: (state: boolean) => void;
}

function SignInPage({ onSignIn, setSignIn }: AuthProp) {
  return (
    <div className="auth-container">
      <h1>Welcome Back</h1>
      <Input placeholder="Email" />
      <Input.Password placeholder="Password" />
      <Button type="primary">Sign In</Button>
      <Divider>or</Divider>
      <Button
        icon={<GoogleOutlined />}
        size={"large"}
        onClick={() => signInFunc({ onSignIn })}
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
