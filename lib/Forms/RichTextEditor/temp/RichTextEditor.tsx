// utils
import { escapeHtml, unescapeHtml } from "../utils/html";

// hooks
import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import { useScreenInfo } from "@/hooks/useScreenInfo";

// component
import LabelWrapper from "../../_utils/LabelWrapper";

// styles
import "quill/dist/quill.snow.css";

export default function RichTextEditor(
  props: {
    width?: number | string;
    height?: number | string;
    name: string;
    label?: string;
    placeholder?: string;
    labelStyle?: string | undefined;
    layoutStyle?: string | undefined;
  } & (
    | {
        isRequired?: undefined;
      }
    | {
        isRequired?: boolean;
        label: string;
      }
  ) &
    (
      | {
          content?: undefined;
          defaultValue?: string;
        }
      | {
          content?: string;
          defaultValue?: string | undefined;
          onChangeContent: (newContent: string) => void;
        }
    )
) {
  // props
  const {
    width,
    height,
    name,
    label,
    placeholder,
    isRequired,
    content,
    defaultValue,
    labelStyle,
    layoutStyle
  } = props;

  // hooks
  const { width: screenWidth, height: screenHeight } = useScreenInfo();

  // states
  const [initialized, setInitialized] = useState<boolean>(false);
  const [richTextContent, setRichTextContent] = useState<string>(
    defaultValue ? unescapeHtml(defaultValue) : ""
  );
  const [freeze, setFreeze] = useState<boolean>(false);

  // quill (rich text editor library)
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

  // effects
  useEffect(() => {
    if (quill) {
      // set initial state
      if (defaultValue && !freeze) {
        quill.clipboard.dangerouslyPasteHTML(unescapeHtml(defaultValue));
        setTimeout(() => {
          const length = quill.getLength();
          quill.setSelection(length, length);
        }, 0);
        setFreeze((prev) => true);
      }

      // get state
      if (!initialized) {
        quill.on("text-change", () => {
          if (quill.getText()) {
            if (quill.getText() === "\n") {
              setRichTextContent("");
            } else {
              setRichTextContent(escapeHtml(quill.root.innerHTML));
            }
          }
        });

        // set flag
        setInitialized(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill, defaultValue]);

  useEffect(() => {
    if (content !== undefined) {
      props.onChangeContent(richTextContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [richTextContent]);

  return (
    <LabelWrapper
      label={label}
      isRequired={isRequired}
      layoutStyle={`flex-col ${layoutStyle || ""}`}
      labelStyle={labelStyle}
    >
      <div
        className="mt-2 mb-[45px]"
        style={{
          width: width
            ? typeof width === "number"
              ? Math.floor((screenWidth * width) / 100)
              : width
            : 460,
          height: height
            ? typeof height === "number"
              ? Math.floor((screenHeight * height) / 100)
              : height
            : 200
        }}
      >
        <div
          ref={quillRef}
          className={`border border-ash/70 overflow-auto scrollbar-hide`}
        />
      </div>
      <input
        className="hidden"
        type="text"
        name={name}
        value={richTextContent}
        onChange={() => {}}
      />
    </LabelWrapper>
  );
}
