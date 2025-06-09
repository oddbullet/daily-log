import { Button } from "antd";
import "./header.css";

interface HeaderProp {
  setIsNewEntry: (state: boolean) => void;
}

export default function Header({ setIsNewEntry }: HeaderProp) {
  return (
    <div className="header">
      <p className="title">Daily Logger</p>
      <a className="header-btn">Logs</a>
      <a className="header-btn">Dashboard</a>
      <Button type="primary" onClick={() => setIsNewEntry(true)}>
        New Entry
      </Button>
    </div>
  );
}
