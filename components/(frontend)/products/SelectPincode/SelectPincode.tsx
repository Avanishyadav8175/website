// "use client";

// import InputWithResponseField, {
//   InputResponseType
// } from "@/components/(_common)/Input/InputWithResponseField";
// import { ModernDropdown } from "@/components/(_common)/Input/ModernInput";
// import { CheckIcon, TriangleAlertIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useLocation } from "@/hooks/useLocation/useLocation";
// import { CityDocument } from "@/common/types/documentation/presets/city";

// export default function SelectPincode({
//   textId,
//   borderId,
//   responseId
// }: {
//   borderId?: string;
//   textId?: string;
//   responseId?: string;
// }) {
//   // hooks
//   const { selectedPincode } = useLocation();

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
//     if (!selectedPincode && textInput && textInput.length) {
//       setInputMsgType((prev) => "error");
//       setResponseMsg((prev) => (
//         <div className="flex items-center justify-start gap-1.5">
//           <TriangleAlertIcon
//             strokeWidth={1.5}
//             height={20}
//             width={20}
//           />
//           <span>Error, enter valid pincode</span>
//         </div>
//       ));
//     } else if (
//       selectedPincode &&
//       textInput &&
//       textInput.length &&
//       textInput ===
//         `${selectedPincode.code}, ${(selectedPincode.city as CityDocument).name}`
//     ) {
//       setInputMsgType((prev) => "valid");
//       setResponseMsg((prev) => (
//         <div className="flex items-center justify-start gap-1.5">
//           <CheckIcon
//             strokeWidth={1.5}
//             height={20}
//             width={20}
//           />
//           <span>Pincode available</span>
//         </div>
//       ));
//     }

//     if (selectedPincode)
//       setTextInput(
//         (prev) =>
//           `${selectedPincode.code}, ${(selectedPincode.city as CityDocument).name}`
//       );
//   }, [selectedPincode, textInput]);

//   useEffect(() => {
//     if (selectedPincode) {
//       setTextInput(
//         (prev) => `${selectedPincode.code}, ${selectedPincode.city}`
//       );
//     } else {
//       setTextInput((prev) => "");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedPincode]);

//   return (
//     <InputWithResponseField
//       showResponse
//       responseType={inputMsgType}
//       responseMsg={responseMsg}
//       className="sm:w-fit"
//       id={responseId}
//     >
//       <ModernDropdown
//         name=""
//         placeholder={"Enter Pincode"}
//         className="sm:max-w-[220px]"
//         borderId={borderId}
//         textId={textId}
//       />
//     </InputWithResponseField>
//   );
// }
