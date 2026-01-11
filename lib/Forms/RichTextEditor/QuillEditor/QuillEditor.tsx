"use client";
import { escapeHtml, unescapeHtml } from "../utils/html";
import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

type QuillEditorType = {
  name: string;
  defaultValue?: string;
  customValue?: {
    value: string;
    setValue: (newStr: string) => void;
  };
  onChange?: (newVal: string) => void;
  placeholder?: string;
};

export default function QuillEditor(props: QuillEditorType) {
  const { name, customValue, defaultValue, onChange, placeholder } = props;

  const [editorText, setEditorText] = useState<string>();
  const [init, setInit] = useState<boolean>(false);

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link"]
      ]
    },
    placeholder
  });

  useEffect(() => {
    if (quill) {
      const performOperations = (str: string) => {
        // set initial state
        if (str) {
          quill.clipboard.dangerouslyPasteHTML(unescapeHtml(str));
        }

        if (!init) {
          quill.on("text-change", () => {
            if (quill.getText()) {
              if (quill.getText() === "\n") {
                setEditorText("");
              } else {
                setEditorText(escapeHtml(quill.root.innerHTML));
              }
            }
          });
          setInit((prev) => true);
        }
      };

      if (editorText) performOperations(editorText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill, editorText]);

  useEffect(() => {
    if (editorText !== undefined) {
      if (onChange) onChange(editorText);
      if (customValue && customValue.setValue) customValue.setValue(editorText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorText]);

  useEffect(() => {
    if (customValue) setEditorText((prev) => customValue.value);
  }, [customValue, customValue?.value]);

  return (
    <div className="mt-2 mb-[45px] min-h-[200px] max-h-[200px] w-full overflow-hidden">
      <div
        ref={quillRef}
        className={`border border-ash/70 overflow-auto scrollbar-hide h-full w-full`}
      />
    </div>
  );
}
