import "./entryView.css";
import { getTodayEntires } from "../lib/firebase";
import { useEffect, useState } from "react";

function LoadEntryView() {
  const [entires, setEntries] = useState<any>(null);

  useEffect(() => {
    getTodayEntires((data: any) => {
      setEntries(data);
    });
  }, []);

  console.log("Entries", entires);

  if (entires) {
    const listItems = entires.map((entry: any) => (
      <li key={entry.id}>
        <EntryView date={entry.time} content={entry.entry}></EntryView>
      </li>
    ));

    return <ul>{listItems}</ul>;
  }

  return <p>No Entries</p>;
}

function EntryView({ date, content }: { date: string; content: string }) {
  return (
    <>
      <div className="container">
        <div className="card-date">
          <p>{date}</p>
        </div>
        <div className="card-content">
          <p>{content}</p>
        </div>
      </div>
    </>
  );
}

export { LoadEntryView };
