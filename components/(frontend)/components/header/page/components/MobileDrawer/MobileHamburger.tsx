import { X } from "lucide-react";
import HamburgerContact from "./components/HamburgerContact";
import HamburgerDashboard from "./components/HamburgerDashboard";
import HamburgerHeader from "./components/HamburgerHeader";
import HamburgerNav from "./components/HamburgerNav";
import { CustomerDocument } from "@/common/types/documentation/users/customer";
import { HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";

export default function MobileHamburger({
  isAuthenticated,
  customerName,
  customer,
  navLinks,
  open,
  onOpenChange
}: {
  isAuthenticated: boolean;
  customerName: string | null;
  customer: CustomerDocument | null;
  navLinks: HeaderNavLinkDocument[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <div
      onKeyDown={({ key }) =>
        key === "Escape" ? onOpenChange(false) : () => {}
      }
      className={`absolute -top-5 -left-4 w-device sm:w-[500px] h-[100vh] z-[999] bg-[#fbfbfb] sm:border-r border-black/15 shadow-md  transition-all duration-300 ${open ? "-translate-x-0 sm:-translate-x-3" : "-translate-x-[calc(100dvw_+_100px)]"} px-3`}
    >
      <div className="z-50 sticky top-0 flex items-center justify-end py-2 bg-transparent">
        <X
          width={36}
          height={36}
          className="aspect-square rounded-full hover:bg-black/10 p-1.5 transition-colors duration-300 cursor-pointer"
          onClick={() => onOpenChange(false)}
        />
      </div>

      <section className="pt-3 max-h-[calc(100dvh_-_34px)] -translate-y-5 overflow-auto scrollbar-hide">
        <HamburgerHeader
          customerName={customerName}
          customer={customer}
          close={() => onOpenChange(false)}
        />
        <HamburgerDashboard
          isAuthenticated={isAuthenticated}
          onClose={() => {
            onOpenChange(false);
          }}
        />
        <HamburgerNav
          navLinks={navLinks}
          close={() => onOpenChange(false)}
        />
        <div className="h-px w-full bg-black/15 mt-6" />
        <HamburgerContact />
        <div className="bg-transparent h-6 w-full" />
      </section>
    </div>
  );
}
