import { Calendar } from "antd";
import { LoadEntryView } from "./entryView";
import { useState } from "react";

export default function Log() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <>
      <div style={{ width: "300px" }}>
        <Calendar
          fullscreen={false}
          onSelect={(date, { source }) => {
            if (source === "date") {
              setDate(date.toISOString().split("T")[0]);
            }
          }}
        />
      </div>
      <LoadEntryView getDate={date}></LoadEntryView>
    </>
  );
}
