import Button from "antd/es/button";
import { signOutFunc } from "../lib/firebase";
import "./setting.css";

// style={{
//         display: "flex",
//         height: "100vh",
//         justifyContent: "center",
//         alignContent: "center",
//       }}

export default function Setting() {
  return (
    <div className="setting-page">
      <Button type="primary" onClick={() => signOutFunc()}>
        Sign Out
      </Button>
    </div>
  );
}
