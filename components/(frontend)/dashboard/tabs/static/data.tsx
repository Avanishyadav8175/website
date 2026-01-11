import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import {
  Bell,
  Box,
  LayoutDashboard,
  LockKeyhole,
  Pin,
  UserRound
} from "lucide-react";

export const CUSTOMER_DASHBOARD_TABS = [
  {
    label: "Dashboard",
    svg: (
      <LayoutDashboard
        strokeWidth={1.5}
        width={20}
        height={20}
      />
    ),
    link: FRONTEND_LINKS.DASHBOARD
  },
  {
    label: "My Profile",
    svg: (
      <UserRound
        strokeWidth={1.5}
        width={20}
        height={20}
      />
    ),
    link: FRONTEND_LINKS.DASHBOARD_PROFILE
  },
  {
    label: "My Orders",
    svg: (
      <Box
        strokeWidth={1.5}
        width={20}
        height={20}
      />
    ),
    link: FRONTEND_LINKS.DASHBOARD_ORDERS
  },
  {
    label: "Saved Addresses",
    svg: (
      <Pin
        strokeWidth={1.5}
        width={20}
        height={20}
      />
    ),
    link: FRONTEND_LINKS.DASHBOARD_ADDRESS
  },
  // {
  //   label: "My Reminders",
  //   svg: (
  //     <Bell
  //       strokeWidth={1.5}
  //       width={20}
  //       height={20}
  //     />
  //   ),
  //   link: "/my-reminders"
  // },
  /* {
    label: "Change Password",
    svg: (
      <LockKeyhole
        strokeWidth={1.5}
        width={20}
        height={20}
      />
    ),
    link: FRONTEND_LINKS.DASHBOARD_PASSWORD
  } */
];
