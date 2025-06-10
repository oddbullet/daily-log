import "./body.css";
import TextArea from "./textArea";
import { LoadEntryView } from "./entryView";

// Date, Day, Hours, and Minutes
function TodayDate() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const monthName: string = months[date.getMonth()];
  const dateNumber: number = date.getDate();

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  // const time = new Intl.DateTimeFormat(["en-US"], {
  //   hour: "numeric",
  //   minute: "numeric",
  // }).format(date);

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
  const today: string = new Date().toISOString().split("T")[0];

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
