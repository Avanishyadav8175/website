// "use client";
// import { formattedDate } from "@/common/utils/formattedDate";
// import InputWithResponseField, {
//   InputResponseType
// } from "@/components/(_common)/Input/InputWithResponseField";
// import { ModernInput } from "@/components/(_common)/Input/ModernInput";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import {
//   ArrowLeft,
//   ArrowRight,
//   CalendarIcon,
//   CheckIcon,
//   TriangleAlertIcon
// } from "lucide-react";
// import { useEffect, useId, useState } from "react";
// import { slideDateTimePanel } from "./helpers/slideAnimations";
// import SelectDate from "./components/SelectDate";
// import SelectDeliveryTime from "./components/SelectDeliveryTime";
// import { LocalProductDateTimeType } from "@/components/pages/(frontend)/Content/components/Details/ContentDetails";
// import { SetStateType } from "@/common/types/reactTypes";
// import { dummyDeliverySlots } from "./static/data";
// import { dateTimePopupNavigation } from "./helpers/dateTimePopupNavigation";
// import { useMediaQuery, useWindowSize } from "usehooks-ts";
// import { IS_MOBILE_MEDIA_QUERY_STRING } from "@/common/constants/mediaQueries";

// export default function SelectDateTime({
//   parent,
//   setParent,
//   textId,
//   borderId,
//   responseId
// }: {
//   parent: LocalProductDateTimeType;
//   setParent: SetStateType<LocalProductDateTimeType>;
//   borderId?: string;
//   textId?: string;
//   responseId?: string;
// }) {
//   const [selectedDate, setSelectedDate] = useState<Date>();
//   const [selectedDeliveryType, setSelectedDeliveryType] = useState<string>("");
//   const [selectedTime, setSelectedTime] = useState<string | undefined>();
//   const [showDialog, setShowDialog] = useState<boolean>(false);
//   const [currSliderIndex, setCurrSliderIndex] = useState<0 | 1>(0);
//   const [dateTimeStringToShow, setDateTimeStringToShow] = useState<
//     string | undefined
//   >();
//   const [responseMsg, setResponseMsg] = useState<string | JSX.Element>("");
//   const [responseMsgType, setResponseMsgType] =
//     useState<InputResponseType>("neutral");

//   const dateTimeSlideContainerId = useId();

//   const isMobile = useMediaQuery(IS_MOBILE_MEDIA_QUERY_STRING);
//   const { width = 0 } = useWindowSize();

//   // NAVIGATION ==================================
//   const navigation = {
//     next: () => {
//       dateTimePopupNavigation.next({
//         currSliderIndex,
//         selectedDate,
//         selectedDeliveryType,
//         selectedTime,
//         timeString: "",
//         setCurrSliderIndex,
//         setParent,
//         setShowDialog
//       });
//     },
//     back: () => {
//       dateTimePopupNavigation.back({ currSliderIndex, setCurrSliderIndex });
//     }
//   };

//   useEffect(() => {
//     slideDateTimePanel({
//       dateTimeSlideContainerId,
//       currSliderIndex,
//       isMobile,
//       width
//     });
//   }, [currSliderIndex, dateTimeSlideContainerId, isMobile, width]);

//   useEffect(() => {
//     if (!showDialog) {
//       setCurrSliderIndex((prev) => 0);
//       setSelectedDate((prev) => parent.date);
//       setSelectedTime((prev) => parent.deliveryTime);
//       setSelectedDeliveryType((prev) => parent.deliveryType || "");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [showDialog]);

//   useEffect(() => {
//     if (
//       parent &&
//       parent.date !== undefined &&
//       parent.deliveryType &&
//       parent.deliveryType.length &&
//       parent.deliveryTime
//     ) {
//       setDateTimeStringToShow(
//         (prev) =>
//           `${formattedDate(parent && parent.date ? parent.date : new Date(), "MINI")}, ${parent && parent.deliveryTime ? parent.deliveryTime.label : ""}`
//       );
//     }
//   }, [parent]);

//   useEffect(() => {
//     if (!showDialog) {
//       if (selectedDate && selectedDeliveryType && selectedTime) {
//         setResponseMsgType((prev) => "valid");
//         setResponseMsg((prev) => (
//           <div className="flex items-center justify-start gap-1.5">
//             <CheckIcon
//               strokeWidth={1.5}
//               height={20}
//               width={20}
//             />
//             <span>Date and Time available</span>
//           </div>
//         ));
//       } else if (
//         selectedDate === undefined &&
//         selectedDeliveryType === "" &&
//         selectedTime === undefined
//       ) {
//         setResponseMsgType((prev) => "neutral");
//         setResponseMsg((prev) => "");
//       } else {
//         setResponseMsgType((prev) => "error");
//         setResponseMsg((prev) => (
//           <div className="flex items-center justify-start gap-1.5">
//             <TriangleAlertIcon
//               strokeWidth={1.5}
//               height={20}
//               width={20}
//             />
//             <span>Error, select proper date and time</span>
//           </div>
//         ));
//       }
//     }
//   }, [selectedDate, selectedDeliveryType, selectedTime, showDialog]);

//   return (
//     <>
//       <InputWithResponseField
//         responseMsg={responseMsg}
//         responseType={responseMsgType}
//         showResponse
//         className="w-fit "
//         id={responseId}
//       >
//         <div className="grid *:row-start-1 *:col-start-1">
//           <ModernInput
//             name=""
//             placeholder={
//               <div className="flex items-center justify-start gap-2">
//                 <CalendarIcon
//                   strokeWidth={1}
//                   width={18}
//                   height={18}
//                 />
//                 <span className="text-charcoal-3">Date and Time</span>
//               </div>
//             }
//             type="text"
//             parent={dateTimeStringToShow || undefined}
//             className="z-10 sm:w-[235px]"
//             textId={textId}
//             borderId={borderId}
//           />

//           <div
//             className="cursor-pointer z-20 h-[calc(100%_+_24px)] -translate-y-6"
//             onClick={() => setShowDialog((prev) => true)}
//           />
//         </div>
//       </InputWithResponseField>

//       {/* DATE TIME POPUP ========================================================================================== */}
//       <Dialog
//         open={showDialog}
//         onOpenChange={setShowDialog}
//       >
//         <DialogContent
//           aria-describedby="date-time-selector"
//           className="p-0 outline-none border-none z-[600] bg-transparent w-[calc(100dvw_-_28px)] sm:min-w-[360px] sm:max-w-[360px] sm:h-[420px] scrollbar-hide"
//         >
//           <div className="relative bg-ivory-1 overflow-x-hidden flex items-stretch justify-stretch max-sm:px-3.5 p-5 rounded-2xl sm:py-6 max-sm:pb-16 text-base min-h-fit sm:min-w-[360px] sm:max-w-[360px]">
//             <div
//               id={dateTimeSlideContainerId}
//               className={`relative flex items-start justify-start *:w-[calc(100dvw_-_56px)] *:sm:w-[320px] space-x-5 transition-all duration-300`}
//             >
//               <SelectDate
//                 selectedDate={selectedDate}
//                 setSelectedDate={setSelectedDate}
//               />
//               <SelectDeliveryTime
//                 slots={dummyDeliverySlots}
//                 selectedTime={selectedTime}
//                 selectedDeliveryType={selectedDeliveryType}
//                 setSelectedTime={setSelectedTime}
//                 setSelectedDeliveryType={setSelectedDeliveryType}
//               />
//             </div>
//           </div>
//           <div className="absolute bottom-0 grid grid-cols-2 gap-3 sm:gap-4 w-[calc(100dvw_-62px)] sm:w-[320px] ml-5 mb-5">
//             {currSliderIndex === 0 ? (
//               <span />
//             ) : (
//               <div
//                 className="w-fit flex items-center justify-center -translate-y-0.5 capitalize py-1.5 gap-2.5 cursor-pointer text-charcoal-3 rounded-lg transition-all duration-200 hover:underline hover:underline-offset-2 hover:gap-2 hover:text-charcoal"
//                 onClick={navigation.back}
//               >
//                 <ArrowLeft
//                   strokeWidth={1.5}
//                   height={17}
//                   width={17}
//                 />{" "}
//                 <span className="">Back</span>
//               </div>
//             )}
//             <div
//               // @ts-ignore
//               className={`group flex items-center justify-center capitalize py-1.5 gap-0 border-[1px] ${
//                 (currSliderIndex === 0 && !selectedDate) ||
//                 (currSliderIndex === 1 &&
//                   (!selectedDeliveryType || !selectedTime))
//                   ? "bg-charcoal-3/60 text-ivory-3/60 border-transparent"
//                   : "cursor-pointer bg-charcoal text-ivory-1 border-transparent"
//               } rounded-lg transition-all duration-200 hover:gap-1`}
//               onClick={navigation.next}
//             >
//               <span className="font-light">
//                 {currSliderIndex === 1 &&
//                 selectedDate &&
//                 selectedDeliveryType &&
//                 selectedDeliveryType.length &&
//                 selectedTime
//                   ? "Confirm"
//                   : "Next"}
//               </span>
//               <ArrowRight
//                 strokeWidth={1.5}
//                 height={16}
//                 width={16}
//                 className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200"
//               />
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
