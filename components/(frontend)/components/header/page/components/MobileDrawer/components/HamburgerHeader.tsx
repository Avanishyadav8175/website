// icons
import { ExternalLink } from "lucide-react";

// hooks
import { memo, useMemo } from "react";

// components
import { DrawerClose } from "@/components/ui/drawer";
import Link from "next/link";

// types
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { COMPANY_NAME } from "@/common/constants/companyDetails";

function HamburgerHeader({
  customerName,
  customer,
  close
}: {
  customerName: string | null;
  customer: CustomerDocument | null;
  close: () => void;
}) {
  // variables
  const username = useMemo(() => customerName || "Guest", [customerName]);
  const secondaryData = useMemo(
    () =>
      customer
        ? customer.mail || customer.mobileNumber || "Go to Dashboard"
        : ("Welcome to " + COMPANY_NAME),
    [customer]
  );

  return (
    <div className="pb-4 grid items-start justify-start grid-cols-[auto_1fr] grid-rows-[repeat(3,auto)]  gap-x-3.5">
      <div className="-translate-y-1.5 row-span-3 justify-self-center text-xl font-medium aspect-square rounded-full bg-gradient-to-r from-sienna-3/40 to-white border-[2px] border-sienna text-sienna flex items-center justify-center w-14">
        {username[0].toUpperCase()}
      </div>
      {/* <DrawerClose asChild> */}
      <Link
        href={FRONTEND_LINKS.DASHBOARD + FRONTEND_LINKS.DASHBOARD_PROFILE}
        prefetch={false}
        onClick={close}
        className="text-[22px] flex items-center gap-2 cursor-pointer"
      >
        <span>{username}</span>
        <ExternalLink
          strokeWidth={1.5}
          width={18}
          height={18}
        />
      </Link>
      {/* </DrawerClose> */}
      <div className="text-charcoal-3/70 text-sm">{secondaryData}</div>
    </div>
  );
}

export default memo(HamburgerHeader);
