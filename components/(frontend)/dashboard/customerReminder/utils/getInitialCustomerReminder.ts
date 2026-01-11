// constants
import { v4 as uuid } from "uuid";

// types
import { type CustomerReminderDocument } from "@/common/types/documentation/nestedDocuments/customerReminder";

export const getInitialCustomerReminder = (): CustomerReminderDocument =>
  ({
    _id: uuid(),
    recipientName: "",
    date: "",
    occasion: "",
    relation: "",
    note: ""
  }) as CustomerReminderDocument;
