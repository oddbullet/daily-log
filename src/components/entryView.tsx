import "./entryView.css";
import { getDateEntires } from "../lib/firebase";
import { useEffect, useState } from "react";

function LoadEntryView({
  getDate,
  setEdit,
}: {
  getDate: string;
  setEdit: (content: any) => void;
}) {
  const [entires, setEntries] = useState<Array<JSON> | null>(null);

  useEffect(() => {
    getDateEntires(getDate, (data: any) => {
      setEntries(data);
    });
  }, [getDate]);

  // console.log("Entries", entires);

  function editEntry(content: any) {
    setEdit(content);
  }

  if (entires && entires.length != 0) {
    const listItems = entires.map((entry: any) => (
      <li
        className="entryView-li"
        key={entry.id}
        onClick={() => editEntry(entry)}
      >
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
