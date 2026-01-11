// utils
import { memo } from "react";

// components
import HamburgerContact from "./components/HamburgerContact";
import HamburgerDashboard from "./components/HamburgerDashboard";
import HamburgerHeader from "./components/HamburgerHeader";
import HamburgerNav from "./components/HamburgerNav";

// types
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";

function MobileHeaderDrawerContent({
  navLinks
}: {
  navLinks: HeaderNavLinkDocument[];
}) {
  return (
    <>
      {/* <HamburgerHeader /> */}
      <HamburgerNav
        close={() => {}}
        navLinks={navLinks}
      />
      {/* <HamburgerDashboard /> */}
      <HamburgerContact />
      <div className="bg-transparent h-6 w-full" />
    </>
  );
}

export default memo(MobileHeaderDrawerContent);
