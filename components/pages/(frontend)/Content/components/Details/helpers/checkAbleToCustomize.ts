import { LocalPincodeDocument } from "@/components/(frontend)/global/SelectCity/static/types";
import { LocalProductDateTimeType } from "../ContentDetailsUI";
// import { LocalProductDateTimeType } from "../ContentDetails";

export const isAbleToCustomize = (
  currPincode: LocalPincodeDocument | undefined,
  dateTime: LocalProductDateTimeType
): boolean => {
  console.log({ currPincode, dateTime });
  if (
    currPincode &&
    currPincode._id &&
    currPincode.city &&
    currPincode.pincode &&
    dateTime.date &&
    dateTime.deliveryTime &&
    dateTime.deliveryType &&
    dateTime.timeLabel &&
    dateTime.timeLabel.length
  )
    return true;
  return false;
};
