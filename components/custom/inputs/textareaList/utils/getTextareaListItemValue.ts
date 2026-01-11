// libraries
import { v4 as uuid } from "uuid";

// types
import { type TextareaListItem } from "../types/type";

export const getTextareaListItemValue = ({ content }: { content: string }) =>
  ({
    _id: uuid(),
    content
  }) as TextareaListItem;
