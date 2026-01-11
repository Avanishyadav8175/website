// utils
import { getInitialCustomVariantValue } from "./getInitialCustomVariantValue";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";

export const getInitialCustomVariantsValue = ({
  content
}: {
  content?: ContentDocument;
}) => [
  getInitialCustomVariantValue({ content }),
  getInitialCustomVariantValue({ image: content?.media?.primary })
];
