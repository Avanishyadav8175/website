import { type Document as MongooseDocument } from "mongoose";
import { type DocumentKeyOption } from "@/common/types/utils";
import { type ReactNode } from "react";

export interface FilterOption<Document extends MongooseDocument> {
  label: string;
  value: DocumentKeyOption<Document>;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface AdvanceSelectOption {
  label: string;
  labelElement: ReactNode;
  value: string;
}

export interface SortOption<Document extends MongooseDocument> {
  label: string;
  value: DocumentKeyOption<Document>;
}
