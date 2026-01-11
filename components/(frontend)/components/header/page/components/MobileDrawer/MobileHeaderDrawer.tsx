// utils
import { memo, useState } from "react";

// components
import MobileHamburger from "./MobileHamburger";

// types
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";
import { Menu } from "lucide-react";

function MobileHeaderDrawer({
  isAuthenticated,
  customerName,
  customer,
  navLinks
}: {
  isAuthenticated: boolean;
  customerName: string | null;
  customer: CustomerDocument | null;
  navLinks: HeaderNavLinkDocument[];
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative lg:hidden cursor-pointer flex flex-col justify-center items-start gap-1.5">
      <Menu onClick={() => setOpen(true)} />

      <MobileHamburger
        open={open}
        onOpenChange={(val: boolean) => {
          setOpen((prev) => val);
        }}
        customer={customer}
        customerName={customerName}
        isAuthenticated={isAuthenticated}
        navLinks={navLinks}
      />
    </div>
  );

  /* return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          className="lg:hidden cursor-pointer flex flex-col justify-center items-start gap-1.5 scale-95 *:h-0.5 *:bg-charcoal-3/70 *:w-4 *:rounded-full"
        >
          <span />
          <span className="translate-x-1.5" />
          <span />
        </button>
      </DrawerTrigger>
      <DrawerContent
        className={`z-[996] px-3.5 outline-none border-none rounded-t-3xl max-h-[95dvh] ${BASE_HOME_BG_COLOR}`}
      >
        <section className="pt-8 *:px-1 max-h-[calc(95dvh_-_64px)] overflow-auto scrollbar-hide rounded-2xl">
          <HamburgerHeader
            customerName={customerName}
            customer={customer}
          />
          <HamburgerNav navLinks={navLinks} />
          <HamburgerDashboard isAuthenticated={isAuthenticated} />
          <HamburgerContact />
          <div className="bg-transparent h-6 w-full" />
        </section>
      </DrawerContent>
    </Drawer>
  ); */
}

export default memo(MobileHeaderDrawer);
