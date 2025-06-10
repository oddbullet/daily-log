import "./entryView.css";
import { getDateEntires } from "../lib/firebase";
import { useEffect, useState } from "react";

function LoadEntryView({ getDate }: { getDate: string }) {
  const [entires, setEntries] = useState<Array<JSON> | null>(null);

  useEffect(() => {
    getDateEntires(getDate, (data: any) => {
      setEntries(data);
    });
  }, [getDate]);

  // console.log("Entries", entires);

  if (entires && entires.length != 0) {
    const listItems = entires.map((entry: any) => (
      <li className="entryView-li" key={entry.id}>
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
