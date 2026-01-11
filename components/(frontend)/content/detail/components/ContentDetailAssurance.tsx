// icons
import { BadgeIndianRupee, DoorOpen, Users } from "lucide-react";

export default function ContentDetailAssurance({ isMobile }: { isMobile?: true }) {
  return (
    <div className={`${isMobile ? "lg:hidden" : "max-lg:hidden mt-3"}`}>
      <div className={` grid grid-cols-3 grid-rows-[auto_auto] gap-2 gap-y-3 p-6 px-3 text-charcoal-3 items-start justify-center text-center text-sm my-4 *:cursor-default ${isMobile ? "bg-sienna-3/15" : "bg-green-400/15 rounded-xl"}`}>
        <div className="flex items-center justify-center">
          <BadgeIndianRupee
            strokeWidth="1.5"
            width={28}
            height={28}
          />
        </div>
        <div className="flex items-center justify-center">
          <Users
            strokeWidth="1.5"
            width={28}
            height={28}
          />
        </div>
        <div className="flex items-center justify-center">
          <DoorOpen
            strokeWidth="1.5"
            width={28}
            height={28}
          />
        </div>
        <span className="text-[13px] sm:text-sm">
          Fully Safe <br />Online Payments
        </span>
        <span className="text-[13px] sm:text-sm">Trusted By <br />2 Cr+ Users</span>
        <span className="text-[13px] sm:text-sm">
          Delivery At<br />Your Doorstep
        </span>
      </div>
    </div>
  );
}
