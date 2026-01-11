// libraries
import { decode } from "he";

export const getDecodedHTML = (content: string) => decode(content);
