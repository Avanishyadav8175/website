// libraries
import { v4 as uuid } from "uuid";

// types
import { type UnitServeDocument } from "@/common/types/documentation/nestedDocuments/unitServe";

export const getInitialUnitServeValue = () =>
  ({
    _id: uuid(),
    value: 0,
    minPerson: 0,
    maxPerson: 0
  }) as UnitServeDocument;
