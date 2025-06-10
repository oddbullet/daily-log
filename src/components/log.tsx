import { Calendar } from "antd";
import { LoadEntryView } from "./entryView";
import { useState } from "react";
import "./log.css";

export default function Log() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <div className="log-page">
      <div className="log-calendar">
        <Calendar
          fullscreen={false}
          onSelect={(date, { source }) => {
            if (source === "date") {
              setDate(date.toISOString().split("T")[0]);
            }
          }}
        />
      </div>
      <div className="log-view">
        <LoadEntryView getDate={date}></LoadEntryView>
      </div>
    </div>
  );
}
