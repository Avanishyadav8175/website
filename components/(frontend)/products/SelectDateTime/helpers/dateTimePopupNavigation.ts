import { SetStateType } from "@/common/types/reactTypes";
import { LocalProductDateTimeType } from "@/components/pages/(frontend)/Content/components/Details/ContentDetailsUI";
// import { LocalProductDateTimeType } from "@/components/pages/(frontend)/Content/components/Details/ContentDetails";

export const dateTimePopupNavigation = {
  next: ({
    currSliderIndex,
    selectedDate,
    selectedDeliveryType,
    selectedTime,
    timeString,
    setParent,
    setShowDialog,
    setCurrSliderIndex
  }: {
    currSliderIndex: 0 | 1;
    selectedDate: Date | undefined;
    selectedDeliveryType: string | undefined;
    selectedTime: string | undefined;
    timeString: string;
    setParent: SetStateType<LocalProductDateTimeType>;
    setShowDialog: SetStateType<boolean>;
    setCurrSliderIndex: SetStateType<0 | 1>;
  }) => {
    if (currSliderIndex === 1) {
      if (
        selectedDate &&
        selectedDeliveryType &&
        selectedDeliveryType.length &&
        selectedTime
      ) {
        setParent((prev) => ({
          date: selectedDate,
          deliveryType: selectedDeliveryType,
          deliveryTime: selectedTime,
          timeLabel: timeString
        }));
        setShowDialog((prev) => false);
      } else {
        // add custom status here of error
      }
    }

    if (currSliderIndex === 0 && !selectedDate) return;
    else setCurrSliderIndex((prev) => 1);
  },

  back: ({
    currSliderIndex,
    setCurrSliderIndex
  }: {
    currSliderIndex: 0 | 1;
    setCurrSliderIndex: SetStateType<0 | 1>;
  }) => {
    if (currSliderIndex === 0) {
      alert("reached start of slides");
      return;
    }

    setCurrSliderIndex((prev) => 0);
  }
};
