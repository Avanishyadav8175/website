// utils
import { getInitialQAValue } from "./getInitialQAValue";

// types
import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";

export const getInitialQAsValue = () => [getInitialQAValue()] as QADocument[];
