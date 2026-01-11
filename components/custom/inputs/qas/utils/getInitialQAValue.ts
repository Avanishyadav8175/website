// libraries
import { v4 as uuid } from "uuid";

// types
import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";

export const getInitialQAValue = () =>
  ({
    _id: uuid(),
    question: "",
    answer: ""
  }) as QADocument;
