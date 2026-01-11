// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type ObjectId } from "mongoose";

// document
export interface BlogLayoutImageDocument extends Document {
  shape?:
    | "default"
    | "square"
    | "sticker"
    | "start-thumbnail"
    | "end-thumbnail";
  style:
    | ""
    | "duo-default"
    | "duo-h"
    | "duo-v"
    | "trio-default"
    | "trio-h"
    | "trio-v"
    | "trio-l-collage"
    | "trio-r-collage"
    | "trio-t-collage"
    | "trio-b-collage"
    | "quad-default"
    | "quad-h"
    | "quad-v"
    | "quad-l-collage"
    | "quad-r-collage"
    | "quad-t-collage"
    | "quad-b-collage";
  images?: string[] | ObjectId[] | ImageDocument[];
}
