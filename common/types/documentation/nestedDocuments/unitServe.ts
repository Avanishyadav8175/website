// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface UnitServeDocument extends Document {
  value: number;
  minPerson: number;
  maxPerson: number;
}
