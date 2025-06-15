import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./textArea.css";
import { Button } from "antd";
import { addEntries } from "../lib/firebase";

function saveContent(quillRef: Quill | null) {
  const textContent = quillRef?.getText();
  addEntries(textContent);
}

interface TextAreaProp {
  setIsNewEntry: (bool: boolean) => void;
}

export default function TextArea({ setIsNewEntry }: TextAreaProp) {
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
        }}
      >
        Close
      </Button>
      <Button
        className="edt-btn"
        type="primary"
        onClick={() => {
          saveContent(quillRef.current);
          setIsNewEntry(false);
        }}
      >
        Save
      </Button>
    </div>
  );
}
