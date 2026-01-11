// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface QADocument extends Document {
  question: string;
  answer: string;
}
