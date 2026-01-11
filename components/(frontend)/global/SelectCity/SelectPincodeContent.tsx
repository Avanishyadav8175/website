// "use client";

// // icons
// import { MapPinIcon } from "lucide-react";

// // utils
// import { memo } from "react";

// // hooks
// import { useAppStates } from "@/hooks/useAppState/useAppState";

// // types
// import { type CityDocument } from "@/common/types/documentation/presets/city";
// import { type PincodeDocument } from "@/common/types/documentation/presets/pincode";
// import { type SelectCityVariantsType } from "./static/types";

// function SelectPincodeContent({
//   variant,
//   selectedPincode
// }: {
//   variant: SelectCityVariantsType;
//   selectedPincode: PincodeDocument | null;
// }) {
//   return (
//     <>
//       {variant === "header" && (
//         <span
//           className={`flex items-center gap-0.5 ${selectedPincode ? "text-[14px] translate-y-[1px]" : "text-xs"} text-charcoal-3/70 font-medium col-span-2`}
//         >
//           Deliver to
//         </span>
//       )}
//       {selectedPincode ? (
//         <>
//           <MapPinIcon
//             width={15}
//             height={15}
//             fill="#b76e79"
//             stroke={variant === "header-2nd-row" ? "#fafafa" : "#fff"}
//             className={variant === "header" ? "scale-125" : "scale-[1.6]"}
//           />
//           <span
//             className={`${variant === "only-city-name" ? "text-[14px]" : "text-[14px]"} w-full text-center ${variant === "header-2nd-row" ? "!text-sm text-charcoal-3/70" : " sm:translate-y-0.5 text-charcoal-3/80 truncate max-w-[120px] sm:max-w-[170px]"} font-medium `}
//           >
//             {variant === "header-2nd-row" ? "Delivery at: " : ""} &nbsp;
//             {`${selectedPincode.code.toString()} • ${(selectedPincode.city as CityDocument).name}`}
//           </span>
//         </>
//       ) : (
//         <>
//           {variant === "header-2nd-row" && (
//             <MapPinIcon
//               width={15}
//               height={15}
//               fill="#b76e79"
//               stroke="#fafafa"
//               className={"scale-[1.6]"}
//             />
//           )}
//           <span
//             className={`${variant === "header-2nd-row" ? "text-charcoal-3/80" : "bg-gradient-to-br from-sienna/90 via-sienna-2/50 to-sienna/90 text-white font-light rounded-sm p-0.5 text-sm col-span-2 w-full max-sm:px-2 text-center animate-pulse"} `}
//           >
//             <span className="max-sm:hidden">Select</span>
//             <span className="sm:hidden">Select Pincode</span>
//           </span>
//         </>
//       )}
//     </>
//   );
// }

// export default memo(SelectPincodeContent);
