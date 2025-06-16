import { GoogleOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import { signInFunc } from "../lib/firebase";
import { Divider, Input } from "antd";

interface AuthProp {
  onSignIn: () => void;
  setSignIn: (state: boolean) => void;
}

function SignUpPage({ onSignIn, setSignIn }: AuthProp) {
  return (
    <div className="auth-container">
      <h1>Get Started</h1>
      <Input placeholder="Email" />
      <Input.Password placeholder="Password" />
      <Input.Password placeholder="Confirm Password" />
      <Button type="primary">Sign Up</Button>
      <Divider>or</Divider>
      <Button
        icon={<GoogleOutlined />}
        size={"large"}
        onClick={() => signInFunc({ onSignIn })}
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
