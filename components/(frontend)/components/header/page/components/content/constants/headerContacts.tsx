// icons
import { CircleHelp, CircleUserRound, Phone, Store } from "lucide-react";

// constants
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

export const HEADER_CONTACTS = [
  {
    svg: (
      <CircleUserRound
        strokeWidth={1.5}
        width={17}
        height={17}
      />
    ),
    label: "About Us",
    link: `${FRONTEND_LINKS.DYNAMIC_PAGE}/about-us`
  },
  {
    svg: (
      <Phone
        strokeWidth={1.5}
        width={17}
        height={17}
      />
    ),
    label: "Contact Us",
    link: "/contact-us"
  },
  {
    svg: (
      <Store
        strokeWidth={1.5}
        width={17}
        height={17}
      />
    ),
    label: "Sell With Us",
    link: `vendor/registration`
  },
  {
    svg: (
      <CircleHelp
        strokeWidth={1.5}
        width={17}
        height={17}
      />
    ),
    label: "FAQs",
    link: `${FRONTEND_LINKS.DYNAMIC_PAGE}/faqs`
  }
];
