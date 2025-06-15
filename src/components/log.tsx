import { Calendar } from "antd";
import { LoadEntryView } from "./entryView";
import { useState } from "react";
import "./log.css";
import { getLocalDate } from "../lib/timeStuff";
// TODO Editing on Log Page
export default function Log() {
  const [date, setDate] = useState(getLocalDate());
  const [editContent, setEdit] = useState<any>(null);

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
        <LoadEntryView getDate={date} setEdit={setEdit}></LoadEntryView>
      </div>
    </div>
  );
}
