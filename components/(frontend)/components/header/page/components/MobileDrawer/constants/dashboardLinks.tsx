// icons
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { Bell, Box, LockKeyhole, MapPin, Truck, UserRound } from "lucide-react";

// types
import { type ReactNode } from "react";

export type DashboardLink = {
  svg: ReactNode;
  label: string;
  link: string;
};

export const DASHBOARD_LINKS: DashboardLink[] = [
  // {
  //   label: "My Profile",
  //   svg: (
  //     <UserRound
  //       width={20}
  //       height={20}
  //       strokeWidth={1.5}
  //     />
  //   ),
  //   link: FRONTEND_LINKS.DASHBOARD + FRONTEND_LINKS.DASHBOARD_PROFILE
  // },
  {
    label: "My Orders",
    svg: (
      <Truck
        width={22}
        height={22}
        strokeWidth={1.5}
      />
    ),
    link: FRONTEND_LINKS.DASHBOARD + FRONTEND_LINKS.DASHBOARD_ORDERS
  },
  {
    label: "Saved Addresses",
    svg: (
      <MapPin
        width={22}
        height={22}
        strokeWidth={1.5}
      />
    ),
    link: FRONTEND_LINKS.DASHBOARD + FRONTEND_LINKS.DASHBOARD_ADDRESS
  },
  // {
  //   label: "My Reminders",
  //   svg: (
  //     <Bell
  //       width={20}
  //       height={20}
  //       strokeWidth={1.5}
  //     />
  //   ),
  //   link: "/account/my-reminders"
  // },
  // {
  //   label: "Change Password",
  //   svg: (
  //     <LockKeyhole
  //       width={20}
  //       height={20}
  //       strokeWidth={1.5}
  //     />
  //   ),
  //   link: FRONTEND_LINKS.DASHBOARD + FRONTEND_LINKS.DASHBOARD_PASSWORD
  // }
];
