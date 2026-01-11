// "use client";
// import { InputResponseType } from "@/components/(_common)/Input/InputWithResponseField";
// import { ModernDropdown } from "@/components/(_common)/Input/ModernInput";
// import {
//   CheckIcon,
//   CircleAlert,
//   CircleCheck,
//   MapPin,
//   TriangleAlertIcon
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useLocation } from "@/hooks/useLocation/useLocation";
// import { CityDocument } from "@/common/types/documentation/presets/city";
// import { LocalPincodeDocument } from "../../global/SelectCity/static/types";
// import { ContentAvailabilityDocument } from "@/common/types/documentation/nestedDocuments/contentAvailability";
// import { PincodeDocument } from "@/common/types/documentation/presets/pincode";

// export default function SelectPincodeModern({
//   textId,
//   borderId,
//   responseId,
//   notCart,
//   contentAvailability,
//   selectedCity,
//   selectedPincode,
//   onSelectPincodeContext,
//   onSearchPincode,
//   onSelectPincode,
//   disableBuyButtons
// }: {
//   textId?: string;
//   borderId?: string;
//   responseId?: string;
//   notCart?: boolean;
//   contentAvailability: ContentAvailabilityDocument;
//   selectedPincode: PincodeDocument | null;
//   selectedCity: CityDocument | null;
//   onSelectPincodeContext: (pincode: PincodeDocument) => void;
//   onSearchPincode: (keyword: string) => PincodeDocument[];
//   onSelectPincode: (pincode: LocalPincodeDocument | undefined) => void;
//   disableBuyButtons: (makeItDisabled: boolean) => void;
// }) {
//   // hooks
//   // const { selectedPincode, selectedCity } = useLocation();

//   // states
//   const [textInput, setTextInput] = useState<string>(
//     selectedPincode
//       ? `${selectedPincode.code}, ${(selectedPincode.city as CityDocument).name}`
//       : ""
//   );
//   const [inputMsgType, setInputMsgType] =
//     useState<InputResponseType>("neutral");
//   const [responseMsg, setResponseMsg] = useState<string | JSX.Element>("");

//   // side effects
//   useEffect(() => {
//     if (
//       contentAvailability.availableAt === "pincodes" && selectedPincode
//         ? (contentAvailability.pincodes as string[]).includes(
//             selectedPincode._id as string
//           )
//         : contentAvailability.availableAt === "cities"
//           ? contentAvailability.limitAvailability &&
//             contentAvailability.cities?.length &&
//             selectedCity
//             ? (contentAvailability.cities as string[]).includes(
//                 selectedCity._id as string
//               )
//             : true
//           : contentAvailability.availableAt === "all-india" && selectedPincode
//     ) {
//       setInputMsgType("valid");
//       disableBuyButtons(false);
//       setResponseMsg(
//         <div className="flex items-center justify-start gap-1.5">
//           <CircleCheck
//             strokeWidth={1.5}
//             height={19}
//             width={19}
//             className="fill-green-600 text-white stroke-white"
//           />
//           <span>Pincode Available</span>
//         </div>
//       );
//     } else if (textInput.length === 0) {
//       setInputMsgType((prev) => "neutral");
//       setResponseMsg((prev) => <></>);
//       disableBuyButtons(false);
//     } else {
//       setInputMsgType((prev) => "error");
//       disableBuyButtons(true);
//       setResponseMsg((prev) => (
//         <div className="flex items-center justify-start gap-1.5 font-medium">
//           <CircleAlert
//             strokeWidth={1.5}
//             height={19}
//             width={19}
//             className="fill-red-400 text-white stroke-white"
//           />
//           <span>Not Deliverable Here</span>
//         </div>
//       ));
//     }

//     if (selectedPincode)
//       setTextInput(
//         `${selectedPincode.code}, ${(selectedPincode.city as CityDocument).name}`
//       );
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedPincode]);

//   useEffect(() => {
//     if (selectedPincode) {
//       setTextInput(
//         `${selectedPincode.code}, ${(selectedPincode.city as CityDocument).name}`
//       );
//     } else {
//       setTextInput("");
//     }

//     // push up to parent
//     onSelectPincode(
//       selectedPincode === null
//         ? undefined
//         : {
//             _id: selectedPincode._id as string,
//             city: (selectedPincode.city as CityDocument).name,
//             pincode: selectedPincode.code as number
//           }
//     );
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedPincode, selectedCity]);

//   useEffect(() => {
//     if (textInput.length === 0) {
//       setInputMsgType((prev) => "neutral");
//       setResponseMsg((prev) => <></>);
//     }
//   }, [textInput]);

//   return (
//     <div className="grid grid-cols-[110px_1fr] sm:grid-cols-1 sm:grid-rows-[repeat(3,auto)] gap-x-1.5 text-charcoal-3/95">
//       <span
//         className={
//           notCart
//             ? "text-left font-semibold pb-1.5 text-charcoal"
//             : "text-left flex items-center justify-start gap-1.5 text-sm sm:mb-1.5"
//         }
//       >
//         {!notCart && (
//           <MapPin
//             strokeWidth={1}
//             width={18}
//             height={18}
//           />
//         )}
//         <span>Pincode</span>
//       </span>

//       <ModernDropdown
//         name=""
//         placeholder={notCart ? "" : "Enter Pincode"}
//         borderId={borderId}
//         textId={textId}
//         distinctStyle={
//           notCart
//             ? "outline-none bg-transparent border-0 border-b-[1px] border-charcoal-3/40 transition-all duration-300 hover:border-charcoal-3/80 focus:border-sienna w-full py-2"
//             : ""
//         }
//         selectedPincode={selectedPincode}
//         onSelectPincode={onSelectPincodeContext}
//         onSearchPincode={onSearchPincode}
//         enteredText={(str: string) => setTextInput((prev) => str)}
//       />

//       <span
//         className={`transition-all duration-300 ${responseMsg ? "scale-y-100" : "scale-y-0"}`}
//       ></span>
//       {!notCart && (
//         <div className="grid *:row-start-1 *:col-start-1">
//           <span
//             className={`text-xs pt-1 px-1 ${responseMsg ? `scale-y-100 ${inputMsgType === "error" ? "text-red-500" : inputMsgType === "valid" ? "text-[#388e3c]" : ""}` : "scale-y-0"} transition-all duration-300 overflow-hidden`}
//           >
//             {responseMsg}
//           </span>
//           {/* <div
//             id={responseId || ""}
//             className={`text-xs pt-1 px-1 text-red-500 transition-all duration-300`}
//           ></div> */}
//         </div>
//       )}
//     </div>
//   );
// }
