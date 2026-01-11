"use client";
import { formattedDate } from "@/common/utils/formattedDate";
import { InputResponseType } from "@/components/(_common)/Input/InputWithResponseField";
import {
  CalendarIcon,
  CheckCheck,
  CheckIcon,
  CircleAlert,
  CircleCheck,
  TriangleAlertIcon
} from "lucide-react";
import { useEffect, useId, useState } from "react";
import { slideDateTimePanel } from "./helpers/slideAnimations";
// import { LocalProductDateTimeType } from "@/components/pages/(frontend)/Content/components/Details/ContentDetails";
import { SetStateType } from "@/common/types/reactTypes";
import { dateTimePopupNavigation } from "./helpers/dateTimePopupNavigation";
import { useMediaQuery, useWindowSize } from "usehooks-ts";
import { IS_MOBILE } from "@/common/constants/mediaQueries";
import { ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";
import { isToday, isTomorrow } from "@/common/helpers/dateCheck";
import SelectDateTimePopup from "./SelectDateTimePopup";
import { LocalProductDateTimeType } from "@/components/pages/(frontend)/Content/components/Details/ContentDetailsUI";

export default function SelectDateTimeModern({
  parent,
  setParent,
  textId,
  borderId,
  responseId,
  details
}: {
  parent: LocalProductDateTimeType;
  setParent: SetStateType<LocalProductDateTimeType>;
  borderId?: string;
  textId?: string;
  responseId?: string;
  details: ContentDeliveryDocument | undefined;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedDeliveryType, setSelectedDeliveryType] = useState<
    string | undefined
  >();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [timeString, setTimeString] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [currSliderIndex, setCurrSliderIndex] = useState<0 | 1>(0);
  const [dateTimeStringToShow, setDateTimeStringToShow] = useState<
    string | undefined
  >();
  const [responseMsg, setResponseMsg] = useState<string | JSX.Element>("");
  const [responseMsgType, setResponseMsgType] =
    useState<InputResponseType>("neutral");
  const [startTime, setStartTime] = useState<number>(0);
  const [todayDelivery, setTodayDelivery] = useState<boolean>(true);
  const [isTodayTommorow, setIsTodayTommorow] = useState<{
    isToday: boolean;
    isTommorow: boolean;
  }>({ isToday: false, isTommorow: false });

  const dateTimeSlideContainerId = useId();

  const isMobile = useMediaQuery(IS_MOBILE);
  const { width = 0 } = useWindowSize();

  // NAVIGATION ==================================
  const navigation = {
    next: () => {
      dateTimePopupNavigation.next({
        currSliderIndex,
        selectedDate,
        selectedDeliveryType,
        selectedTime,
        timeString,
        setCurrSliderIndex,
        setParent,
        setShowDialog
      });
    },
    back: () => {
      dateTimePopupNavigation.back({ currSliderIndex, setCurrSliderIndex });
    }
  };

  useEffect(() => {
    slideDateTimePanel({
      dateTimeSlideContainerId,
      currSliderIndex,
      isMobile,
      width
    });
  }, [currSliderIndex, dateTimeSlideContainerId, isMobile, width]);

  useEffect(() => {
    if (!showDialog) {
      setCurrSliderIndex((prev) => 0);
      setSelectedDate((prev) => parent.date);
      setSelectedTime((prev) => parent.deliveryTime);
      setSelectedDeliveryType((prev) => parent.deliveryType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDialog]);

  useEffect(() => {
    if (
      parent &&
      parent.date !== undefined &&
      parent.deliveryType &&
      parent.deliveryType.length &&
      parent.deliveryTime
    ) {
      setDateTimeStringToShow(
        (prev) =>
          `${formattedDate(parent && parent.date ? parent.date : new Date(), "MINI")}, ${parent && parent.deliveryTime ? parent.timeLabel : ""}`
      );
    }
  }, [parent]);

  useEffect(() => {
    if (!showDialog) {
      if (selectedDate && selectedDeliveryType && selectedTime) {
        setResponseMsgType((prev) => "valid");
        setResponseMsg((prev) => (
          <div className="flex items-center justify-start gap-1.5 font-medium">
            <CheckCheck
              strokeWidth={1.5}
              height={19}
              width={19}
              className="text-green-600"
            />
            <span>Date and Time Available</span>
          </div>
        ));
      } else if (
        selectedDate === undefined &&
        selectedDeliveryType === "" &&
        selectedTime === undefined
      ) {
        setResponseMsgType((prev) => "neutral");
        setResponseMsg((prev) => "");
      } else {
        setResponseMsgType((prev) => "error");
        setResponseMsg((prev) => (
          <div className="flex items-center justify-start gap-1.5 font-medium">
            <CircleAlert
              strokeWidth={1.5}
              height={19}
              width={19}
              className="fill-red-400 text-white stroke-white"
            />
            <span>Error, select proper date and time</span>
          </div>
        ));
      }
    }
  }, [selectedDate, selectedDeliveryType, selectedTime, showDialog]);

  useEffect(() => {
    if (selectedDate) {
      if (isToday(selectedDate))
        setIsTodayTommorow((prev) => ({ isToday: true, isTommorow: false }));
      else if (isTomorrow(selectedDate))
        setIsTodayTommorow((prev) => ({ isToday: false, isTommorow: true }));
    }
  }, [selectedDate]);

  useEffect(() => {
    const updateStartTime = () => {
      const hrs = new Date().getHours() + 1;
      let readyTime =
        hrs + ((details?.processingTime as ProcessingTimeDocument)?.hours || 0);

      if (readyTime >= 24) {
        readyTime %= 24;
        setTodayDelivery((prev) => false);
      } else setTodayDelivery((prev) => true);

      setStartTime((prev) => readyTime);
    };

    const interval = setInterval(updateStartTime, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="grid grid-cols-[110px_1fr] gap-x-1.5 text-charcoal-3/95 sm:grid-cols-1 sm:grid-rows-[repeat(3,auto)]">
        <span className="flex items-center justify-start gap-1.5 text-sm sm:mb-1.5">
          <CalendarIcon
            strokeWidth={1}
            width={18}
            height={18}
          />
          <span>Date & Time</span>
        </span>

        <input
          type="text"
          placeholder="Select Date & Time"
          readOnly
          id={borderId}
          value={dateTimeStringToShow || ""}
          onClick={() => setShowDialog((prev) => true)}
          className="bg-ivory-2 cursor-pointer border border-transparent w-full px-3 sm:px-3.5 py-2.5 rounded-xl outline-none border-none transition-all duration-300 placeholder:text-charcoal-3/45 hover:brightness-95 focus:outline-2 focus:outline-offset-4"
        />

        <span
          className={`transition-all duration-300 ${responseMsg ? "scale-y-100" : "scale-y-0"}`}
        ></span>
        <span className="grid *:row-start-1 *:col-start-1">
          <span
            className={`text-xs pt-1 px-1 ${responseMsg ? `scale-y-100 ${responseMsgType === "error" ? "text-red-400" : responseMsgType === "valid" ? "text-green-600" : ""}` : "scale-y-0"} transition-all duration-300 overflow-hidden`}
          >
            {responseMsg}
          </span>
          <span
            id={responseId || ""}
            className={`text-xs pt-1 px-1 transition-all text-red-500 duration-300 overflow-hidden`}
          ></span>
        </span>
      </div>

      {/* DATE TIME POPUP ========================================================================================== */}
      <SelectDateTimePopup
        currSliderIndex={currSliderIndex}
        dateTimeSlideContainerId={dateTimeSlideContainerId}
        details={details?.slots || []}
        isTodayTommorow={isTodayTommorow}
        onClick={{ next: navigation.next, prev: navigation.back }}
        selectedDate={selectedDate}
        selectedDeliveryType={selectedDeliveryType}
        selectedTime={selectedTime}
        setSelectedDate={setSelectedDate}
        setSelectedDeliveryType={setSelectedDeliveryType}
        setSelectedTime={setSelectedTime}
        setShowDialog={setShowDialog}
        setTimeString={setTimeString}
        showDialog={showDialog}
        startTime={startTime}
        todayDelivery={todayDelivery}
      />
    </>
  );
}
