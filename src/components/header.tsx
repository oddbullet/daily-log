import { Button } from "antd";
import "./header.css";
import { useState } from "react";

interface HeaderProp {
  setIsNewEntry: (state: boolean) => void;
  setPage: (number: number) => void;
}

export default function Header({ setIsNewEntry, setPage }: HeaderProp) {
  const [entBtnState, setBtnState] = useState(false);

  return (
    <div className="header">
      <p className="title">Daily Logger</p>
      <a
        className="header-btn"
        onClick={() => {
          setPage(0);
          setBtnState(false);
        }}
      >
        Today
      </a>
      <a
        className="header-btn"
        onClick={() => {
          setPage(1);
          setBtnState(true);
        }}
      >
        Logs
      </a>
      <a
        className="header-btn"
        onClick={() => {
          setPage(2);
          setBtnState(true);
        }}
      >
        Setting
      </a>
      <Button
        type="primary"
        disabled={entBtnState}
        onClick={() => setIsNewEntry(true)}
      >
        New Entry
      </Button>
    </div>
  );
}
