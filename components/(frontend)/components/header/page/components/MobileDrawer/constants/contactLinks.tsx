// icons
import { Mail, Phone, Store } from "lucide-react";
import { WhatsappSVG } from "@/common/svgs/svg";

// utils
import { whatsappContact } from "@/common/utils/_contactDetails";

// types
import { type ReactNode } from "react";
import { COMPANY_EMAIL, COMPANY_NUMBER } from "@/common/constants/companyDetails";

export type ContactLinks = {
  svg: ReactNode;
  label: string;
  link: string;
  rightSide?: { label: string; color: string };
};

export const CONTACT_LINKS: ContactLinks[] = [
  {
    label: "Call us",
    svg: (
      <Phone
        width={20}
        height={20}
        strokeWidth={1.5}
      />
    ),
    link: `tel:${COMPANY_NUMBER}`,
    rightSide: {
      color: "text-blue-500",
      label: "10AM - 6PM"
    }
  },
  {
    label: "Whatsapp us",
    svg: (
      <WhatsappSVG
        dimensions={24}
        className="scale-110 -translate-x-px"
      />
    ),
    link: whatsappContact(),
    rightSide: {
      color: "text-green-500",
      label: "10AM - 6PM"
    }
  },
  {
    label: "Email us",
    svg: (
      <Mail
        width={20}
        height={20}
        strokeWidth={1.5}
      />
    ),
    link: `email:${COMPANY_EMAIL}`,
    rightSide: {
      color: "text-green-500",
      label: "10AM - 6PM"
    }
  },
  /* {
    label: "Register as Vendor",
    svg: (
      <Store
        width={20}
        height={20}
        strokeWidth={1.5}
      />
    ),
    link: `/vendor/registration`,
    rightSide: {
      color: "text-amber-800",
      label: "Join Now"
    }
  } */
];
