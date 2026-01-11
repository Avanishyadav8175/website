// "use client";

// // icons
// import { ChevronDown, MapPin } from "lucide-react";

// // hooks
// import { useAppStatus } from "@/hooks/useAppStatus";

// // components
// import SelectPincode from "./SelectPincode";

// // types
// import { type SelectCityVariantsType } from "./static/types";

// export default function SelectCityDeprecated({
//   variant
// }: {
//   variant: SelectCityVariantsType;
// }) {
//   // hooks
//   const { isLoaded } = useAppStatus();

//   // if (isLoaded) {
//   //   return <SelectPincode variant={variant} />;
//   // }

//   return (
//     <div className="relative text-charcoal-3/90 flex items-center justify-start text-sm cursor-pointer">
//       <div
//         className={
//           variant === "header"
//             ? `hidden sm:grid grid-cols-[17px_auto] grid-rows-2 items-center justify-start min-w-fit border-l-[1.5px] border-l-charcoal/20 pl-3.5 pr-4 *:leading-tight text-charcoal/95 cursor-pointer sm:ml-2`
//             : "flex items-center justify-start max-sm:gap-2.5"
//         }
//       >
//         {variant === "header" ? (
//           <span
//             className={`flex items-center gap-0.5 text-xs text-charcoal-3/70 font-medium col-span-2`}
//           >
//             Deliver to
//           </span>
//         ) : (
//           <></>
//         )}
//         <>
//           {variant === "header-2nd-row" && (
//             <MapPin
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
//         {variant === "header-2nd-row" && (
//           <span className="absolute -right-2 -bottom-0.5 text-charcoal-3/80">
//             <ChevronDown
//               strokeWidth={1.5}
//               width={20}
//               height={20}
//             />
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }
