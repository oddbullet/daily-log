import { Calendar } from "antd";
import { LoadEntryView } from "./entryView";
import { useState } from "react";
import "./log.css";
import { getLocalDate } from "../lib/timeStuff";

export default function Log() {
  const [date, setDate] = useState(getLocalDate());

  return (
    <div className="log-page">
      <div className="log-calendar">
        <Calendar
          fullscreen={false}
          onSelect={(date, { source }) => {
            if (source === "date") {
              setDate(date.format("MM-DD-YYYY"));
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
