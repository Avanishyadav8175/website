// icons
import { Mail, Smartphone } from "lucide-react";
import { WhatsappSVG } from "@/common/svgs/svg";

// types
import { type AuthMethodData } from "../types/types";

export const AUTH_METHODS_DATA: AuthMethodData[] = [
  {
    name: "mail",
    label: "Email",
    icon: (
      <Mail
        strokeWidth={2}
        width={16}
        height={16}
      />
    )
  },
  {
    name: "mobile",
    label: "Mobile",
    icon: (
      <Smartphone
        strokeWidth={2}
        width={16}
        height={16}
      />
    )
  },
  {
    name: "whatsapp",
    label: "Whatsapp",
    icon: (
      <WhatsappSVG
        strokeWidth={2}
        dimensions={22}
      />
    )
  },
  {
    name: "google",
    label: "Google",
    icon: <span className="text-xl font-semibold scale-90">G</span>
  }
];
