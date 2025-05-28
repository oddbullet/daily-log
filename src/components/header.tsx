import { Button } from "antd";
import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <p>Daily Logger</p>
      <Button type="primary">New Entry</Button>
    </div>
  );
}
