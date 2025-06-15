import "./body.css";
import TextArea from "./textArea";
import { LoadEntryView } from "./entryView";
import { getLocalDate, getLocalTime, getMonth } from "../lib/timeStuff";
import { useState } from "react";

// Date, Day, Hours, and Minutes
function TodayDate() {
  const monthName: string = getMonth();
  const dateNumber: number = new Date().getDate();
  const time = getLocalTime();

  return (
    <div className="date">
      Today, {monthName} {dateNumber} at {time}
    </div>
  );
}

interface BodyProp {
  isNewEntry: boolean;
  setIsNewEntry: (bool: boolean) => void;
}

export default function Body({ isNewEntry, setIsNewEntry }: BodyProp) {
  const today: string = getLocalDate();
  const [editContent, setEdit] = useState<any>(null);

  return (
    <>
      <div className="main">
        <TodayDate></TodayDate>
        {isNewEntry || editContent ? (
          <TextArea
            setIsNewEntry={setIsNewEntry}
            editContent={editContent}
            setEdit={setEdit}
          ></TextArea>
        ) : (
          <LoadEntryView getDate={today} setEdit={setEdit}></LoadEntryView>
        )}
      </div>
    </>
  );
}
