// hooks
import { useScreenInfo } from "@/hooks/useScreenInfo";

// components
import AdminSidebarDesktop from "./components/AdminSidebarDesktop";
import AdminSidebarMobile from "./components/AdminSidebarMobile";

export default function AdminSidebar() {
  const { isMobile } = useScreenInfo();

  if (isMobile) {
    return <AdminSidebarMobile />;
  }

  return <AdminSidebarDesktop />;
}
