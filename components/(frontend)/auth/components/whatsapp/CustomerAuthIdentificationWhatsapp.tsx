// "use client";

// // utils
// import { memo } from "react";

// // hooks
// import { useState } from "react";
// import { useToast } from "@/components/ui/use-toast";
// import { useCustomerAuth } from "@/hooks/auth/useCustomerAuth";

// // components
// import CountryCodes from "@/components/custom/inputs/countryCodes/CountryCodes";

// function CustomerAuthIdentificationWhatsapp() {
//   // hooks
//   const {
//     method: {
//       whatsapp: { onSendOTP }
//     }
//   } = useCustomerAuth();
//   const { toast } = useToast();

//   // states
//   const [showCountryCodes, setShowCountryCode] = useState<boolean>(false);
//   const [countryCode, setCountryCode] = useState<string>("+91");
//   const [whatsappNumber, setWhatsappNumber] = useState<string>("");

//   return (
//     <>
//       {/* <CountryCodes
//         isExpanded={showCountryCodes}
//         selected={countryCode}
//         onChangeIsExpanded={setShowCountryCode}
//         onSelect={setCountryCode}
//       /> */}
//       <div className="font-medium text-lg !px-0">+91 -</div>
//       <input
//         type="text"
//         name="Number"
//         placeholder="Enter Whatsapp N."
//         value={whatsappNumber}
//         onChange={(e) => {
//           setWhatsappNumber(e.target.value.replace(/\D/g, "").substring(0, 10));
//         }}
//         className="w-full sm:w-[calc(500px_-_88px)]  border-b  border-ash-3/70 text-charcoal-3 outline-none bg-transparent autofill:bg-transparent transition-all duration-300 placeholder:text-charcoal-3/60 !px-0 !rounded-none hover:border-ash-3/80 focus:border-sienna-1/50 font-medium text-lg"
//       />
//       <div
//         onClick={() => {
//           if (whatsappNumber.length === 10) {
//             onSendOTP({ whatsappNumber: `${countryCode}-${whatsappNumber}` });
//           } else {
//             toast({
//               title: "Invalid Whatsapp Number",
//               description: "Please enter a valid Whatsapp Number to continue",
//               variant: "warning"
//             });
//           }
//         }}
//         className={`col-span-2 bg-green-600 text-white flex items-center justify-center gap-x-2 cursor-pointer transition-all duration-300`}
//       >
//         <span>Send OTP</span>
//       </div>
//     </>
//   );
// }

// export default memo(CustomerAuthIdentificationWhatsapp);



"use client";

// utils
import { memo } from "react";

function CustomerAuthIdentificationWhatsapp() {
  // ❌ WhatsApp login पूरी तरह disable
  // UI + Inputs + Buttons + OTP triggers सब हटाए गए

  return <></>; // Component will render nothing
}

export default memo(CustomerAuthIdentificationWhatsapp);
