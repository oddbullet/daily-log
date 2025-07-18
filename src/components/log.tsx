import { Calendar } from "antd";
import { LoadEntryView } from "./entryView";
import { useState } from "react";
import "./log.css";
import { getLocalDate } from "../lib/timeStuff";
import TextArea from "./textArea";

export default function Log() {
  const [date, setDate] = useState(getLocalDate());
  const [editContent, setEdit] = useState<any>(null);
  const [, setEntry] = useState(true); // Dummy

  console.log(editContent);

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
        {editContent ? (
          <TextArea
            setIsNewEntry={setEntry}
            editContent={editContent}
            setEdit={setEdit}
            date={date}
          ></TextArea>
        ) : (
          <LoadEntryView getDate={date} setEdit={setEdit}></LoadEntryView>
        )}
      </div>
    </div>
  );
}
