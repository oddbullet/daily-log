import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

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
      quillRef.current = null;
    };
  }, []);

  return <div ref={containerRef}></div>;
}
