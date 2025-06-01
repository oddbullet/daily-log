import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./textArea.css";
import { Button } from "antd";

function getContent(quillRef: Quill | null) {
  const textContent = quillRef?.getText();
  console.log("Text Content:", textContent);
}

export default function TextArea() {
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
    <>
      <div className="editor" ref={containerRef}></div>
      <Button
        type="primary"
        onClick={() => {
          getContent(quillRef.current);
        }}
      >
        Save
      </Button>
    </>
  );
}
