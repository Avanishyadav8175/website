import he from "he";

import design from "./scss/design.module.scss";

export default function CustomTypedContent({ content }: { content: string }) {
  return (
    <div
      className={design.parent}
      dangerouslySetInnerHTML={{ __html: he.decode(content) }}
    />
  );
}
