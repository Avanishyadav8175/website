// "use client";

// utils
import { memo } from "react";

// hooks
// import { useState } from "react";

// components
import MobileHeaderDrawer from "./MobileHeaderDrawer";

// types
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";

function HamburgerUI({ navLinks }: { navLinks: HeaderNavLinkDocument[] }) {
  // states
  // const [showDrawer, setShowDrawer] = useState<boolean>(false);

  return (
    <>
      {/* <span
        className="sm:hidden cursor-pointer flex flex-col justify-center items-start gap-1.5 scale-95 *:h-0.5 *:bg-charcoal-3/70 *:w-4 *:rounded-full"
        onClick={() => {
          setShowDrawer(true);
        }}
      >
        <span />
        <span className="translate-x-1.5" />
        <span />
      </span> */}
      {/* <MobileHeaderDrawer
        // showDrawer={showDrawer}
        navLinks={navLinks}
        // onChangeShowDrawer={setShowDrawer}
      /> */}
    </>
  );
}

export default memo(HamburgerUI);
