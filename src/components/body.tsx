import "./body.css";
import TextArea from "./textArea";
import { LoadEntryView } from "./entryView";
import { date, getLocalDate, getLocalTime, getMonth } from "../lib/timeStuff";

// Date, Day, Hours, and Minutes
function TodayDate() {
  const monthName: string = getMonth();
  const dateNumber: number = date.getDate();
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

  return (
    <>
      <div className="main">
        <TodayDate></TodayDate>
        {isNewEntry ? (
          <TextArea setIsNewEntry={setIsNewEntry}></TextArea>
        ) : (
          <LoadEntryView getDate={today}></LoadEntryView>
        )}
      </div>
    </>
  );
}
