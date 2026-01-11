// libraries
import { v4 as uuid } from "uuid";

// types
import { type RedirectListItem } from "../types/type";

export const getRedirectListItemValue = ({ url }: { url: string }) =>
  ({
    _id: uuid(),
    url
  }) as RedirectListItem;
