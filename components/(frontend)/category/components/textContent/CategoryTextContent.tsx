// libraries
import he from "he";

// utils
import { memo, useMemo } from "react";

// styles
import design from "./styles/categoryTextContent.module.scss";

function CategoryTextContent({ text }: { text: string }) {
  const html = useMemo(() => he.decode(text), [text]);

  return (
    <div
      className={design.parent}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default memo(CategoryTextContent);
