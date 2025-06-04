import { useState } from "react";
import "./body.css";
import TextArea from "./textArea";
import EntryView from "./entryView";

function hour12(hour: number) {
  let hours = hour % 12;
  if (hours == 0) {
    return 12;
  } else {
    return hours;
  }
}

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
  const hour: number = date.getHours();
  const minute: number = date.getMinutes();

  const formattedMinute = minute.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const time =
    hour12(hour) + ":" + formattedMinute + " " + (hour < 12 ? "AM" : "PM");

  return (
    <div className="date">
      Today, {monthName} {dateNumber} at {time}
    </div>
  );
}

interface BodyProp {
  isNewEntry: boolean;
}

export default function Body({ isNewEntry }: BodyProp) {
  return (
    <>
      <div className="main">
        <TodayDate></TodayDate>
        {isNewEntry ? <TextArea></TextArea> : <EntryView></EntryView>}
      </div>
    </>
  );
}
