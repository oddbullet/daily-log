import { Button } from "antd";
import "./header.css";

interface HeaderProp {
  setIsNewEntry: (state: boolean) => void;
  setPage: (number: number) => void;
}

export default function Header({ setIsNewEntry, setPage }: HeaderProp) {
  return (
    <div className="header">
      <p className="title">Daily Logger</p>
      <a className="header-btn" onClick={() => setPage(0)}>
        Today
      </a>
      <a className="header-btn" onClick={() => setPage(1)}>
        Logs
      </a>
      <a className="header-btn" onClick={() => setPage(2)}>
        Dashboard
      </a>
      <Button
        type="primary"
        disabled={false}
        onClick={() => setIsNewEntry(true)}
      >
        New Entry
      </Button>
    </div>
  );
}
