import { useEffect, useRef } from "react";
import Quill, { Delta } from "quill";
import "quill/dist/quill.snow.css";
import "./textArea.css";
import { Button } from "antd";
import { addEntries, updateEntries } from "../lib/firebase";

function saveContent(quillRef: Quill | null, editContent: any) {
  const textContent = quillRef?.getText();

  if (editContent == null) {
    addEntries(textContent);
  } else {
    updateEntries(textContent, editContent.id, editContent.time);
  }
}

interface TextAreaProp {
  setIsNewEntry: (bool: boolean) => void;
  editContent: any;
  setEdit: (content: any) => void;
}

export default function TextArea({
  setIsNewEntry,
  editContent,
  setEdit,
}: TextAreaProp) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (!isMounted.current) {
      quillRef.current = new Quill(containerRef.current!, {
        theme: "snow",
      });
      isMounted.current = true;
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }

      //   if (quillRef.current) {
      //     quillRef.current = null;
      //   }
    };
  }, []);

  useEffect(() => {
    if (editContent) {
      const delta = new Delta().insert(editContent.entry);
      quillRef.current?.setContents(delta);
    }
  }, []);

  return (
    <div className="editor-container">
      <div className="editor" ref={containerRef}></div>
      <Button color="danger" variant="solid" className="edt-btn delete-btn">
        Delete
      </Button>
      <Button
        className="edt-btn close-btn"
        onClick={() => {
          setIsNewEntry(false);
          setEdit(null);
        }}
      >
        Close
      </Button>
      <Button
        className="edt-btn"
        type="primary"
        onClick={() => {
          saveContent(quillRef.current, editContent);
          setIsNewEntry(false);
          setEdit(null);
        }}
      >
        Save
      </Button>
    </div>
  );
}
