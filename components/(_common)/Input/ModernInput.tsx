"use client";
import { CityDocument } from "@/common/types/documentation/presets/city";
import { ClassNameType, SetStateType } from "@/common/types/reactTypes";
import { LocalPincodeDocument } from "@/components/(frontend)/global/SelectCity/static/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useLocation } from "@/hooks/useLocation/useLocation";
import { useEffect, useState } from "react";

type FormInputType = "text" | "password" | "number";

export const ModernInput = ({
  type,
  name,
  placeholder,
  parent,
  setParent,
  textId,
  borderId,
  className
}: {
  type: FormInputType;
  name: string;
  placeholder: string | JSX.Element;
  parent?: string;
  setParent?: SetStateType<string>;
  textId?: string;
  borderId?: string;
  className?: string;
}) => {
  const [textInput, setTextInput] = useState<string>(parent || "");

  useEffect(() => {
    if (setParent) setParent((prev) => textInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textInput]);

  useEffect(() => setTextInput((prev) => parent || prev), [parent]);

  return (
    <div className="relative group grid *:row-start-1 *:col-start-1">
      <input
        type={type}
        autoComplete="off"
        name={name}
        onChange={(e) => setTextInput((prev) => e.target.value)}
        value={textInput}
        className={`peer z-20 autofill:bg-[#0000] autofill:text-charcoal text-lg bg-transparent py-2 transition-all duration-300 outline-none focus:outline-none ${className || ""}`}
      />
      <span className="grid *:row-start-1 *:col-start-1">
        <span className="z-10 absolute bottom-[1px] left-0 h-[1px] w-full bg-gradient-to-r from-charcoal-3/45 to-90% to-transparent sm:bg-charcoal-3/40 transition-all duration-300" />
        <span
          id={borderId || "__6aj2x__"}
          className="z-20 absolute bottom-[1px] left-0 h-[1px] w-full bg-transparent transition-all duration-300"
        />
      </span>

      <span
        id={textId || "__1ka0i__"}
        className={`h-full flex items-center justify-start transition-all duration-200 ${!(textInput.length === 0) ? "-translate-y-[26px] text-sm" : "text-xl"}`}
      >
        {placeholder}
      </span>
    </div>
  );
};

/******************************************************************************
 ******** DROPDOWN ************************************************************
 *****************************************************************************/

type LocalDropdownDocument = { _id: string; label: string; value: string };

// export const ModernDropdown = ({
//   name,
//   placeholder,
//   textId,
//   borderId,
//   className,
//   popoverClassName,
//   distinctStyle,
//   isDisabled,
//   selectedPincode,
//   onSelectPincode,
//   onSearchPincode,
//   enteredText
// }: {
//   name: string;
//   placeholder: string;
//   textId?: string;
//   borderId?: string;
//   className?: ClassNameType;
//   popoverClassName?: ClassNameType;
//   distinctStyle?: ClassNameType;
//   isDisabled?: boolean;
//   selectedPincode: PincodeDocument | null;
//   onSelectPincode: (pincode: PincodeDocument) => void;
//   onSearchPincode: (keyword: string) => PincodeDocument[];
//   enteredText?: (str: string) => void;
// }) => {
//   // hooks
//   // const { selectedPincode, onSelectPincode, onSearch: onSearchPincode } = useLocation();

//   // states
//   const [textInput, setTextInput] = useState<string>(
//     selectedPincode
//       ? `${selectedPincode.code}, ${(selectedPincode.city as CityDocument).name}`
//       : ""
//   );
//   const [filteredPincodes, setFilterPincodes] = useState<PincodeDocument[]>([]);
//   const [showDropdown, setShowDropdown] = useState<boolean>(false);

//   // event handlers
//   const handleSelectPincode = (pincode: PincodeDocument) => {
//     onSelectPincode(pincode);
//     setShowDropdown(false);
//     setTextInput((prev) =>
//       pincode ? `${pincode.code}, ${(pincode.city as CityDocument).name}` : ""
//     );
//   };

//   // side effects
//   useEffect(() => {
//     if (textInput && textInput.length && showDropdown === false) {
//       setShowDropdown(true);
//     }

//     if ((textInput && textInput.length === 0) || !textInput) {
//       setShowDropdown(false);
//     }

//     setFilterPincodes(onSearchPincode(textInput));

//     if (enteredText) enteredText(textInput);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [textInput]);

//   return (
//     <>
//       {/* ====[ POPOVER ] ============================================= */}
//       <Popover
//         open={showDropdown}
//         onOpenChange={setShowDropdown}
//       >
//         <PopoverTrigger
//           className="outline-none focus:outline-none border-none bg-ivory-2 p-0"
//           asChild
//         >
//           <input
//             type={"text"}
//             autoComplete="off"
//             name={name}
//             onChange={(e) => {
//               setTextInput(e.target.value);
//             }}
//             value={textInput}
//             placeholder={placeholder}
//             id={borderId}
//             disabled={isDisabled || false}
//             className={
//               distinctStyle ||
//               ` w-full px-3 sm:px-3.5 py-2.5 rounded-xl outline-none border border-transparent transition-all duration-300 placeholder:text-charcoal-3/45 hover:brightness-95 focus:brightness-95 focus:outline-1 focus:outline-ash focus:outline-offset-2 ${className || ""}`
//             }
//           />
//         </PopoverTrigger>
//         {Boolean(filteredPincodes && filteredPincodes.length) ? (
//           <PopoverContent
//             side="bottom"
//             avoidCollisions={false}
//             onOpenAutoFocus={(e) => e.preventDefault()}
//             className={`${textInput && textInput.length >= 2 ? "" : "scale-0 min-h-0 max-h-0 h-0"} overflow-y-scroll scrollbar-hide max-h-[270px] flex flex-col justify-start p-2 py-2.5 max-w-[250px] transition-all duration-300 ${popoverClassName || ""}`}
//           >
//             {filteredPincodes.map((pincode, index) => (
//               <div
//                 className="cursor-pointer transition-colors duration-300 py-2 px-2 hover:bg-sienna-1/25 rounded-lg"
//                 key={index}
//                 onClick={() => {
//                   handleSelectPincode(pincode);
//                 }}
//               >
//                 {`${pincode.code}, ${(pincode.city as CityDocument).name}`}
//               </div>
//             ))}
//           </PopoverContent>
//         ) : (
//           <></>
//         )}
//       </Popover>
//     </>
//   );
// };
