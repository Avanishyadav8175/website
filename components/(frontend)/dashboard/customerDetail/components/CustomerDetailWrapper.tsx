// libraries
import moment from "moment";

// hooks
import { useAppStates } from "@/hooks/useAppState/useAppState";

// types
import { type ReactNode } from "react";

export default function CustomerDetailWrapper({
  children
}: {
  children: ReactNode;
}) {
  // hooks
  const {
    profile: {
      data: { detail }
    }
  } = useAppStates();

  return (
    <section className="grid grid-cols-1 auto-rows-min p-3 pt-5 lg:p-8">
      <div className="rounded-t-2xl bg-sienna-1/20 h-20 relative overflow-hidden">
        {/* <div className="aspect-square absolute bottom-0 right-0 translate-x-[calc(50%_-_6px)] translate-y-[calc(50%_-_6px)] w-36 grid place-items-center *:row-start-1 *:col-start-1">
          <div className="aspect-square rounded-full relative w-1/6 z-50 bg-sienna/90" />
          <div className="aspect-square rounded-full relative w-2/6 z-40 bg-[#f1e6c7]" />
          <div className="aspect-square rounded-full relative w-[45%] z-30 bg-sienna/90" />
          <div className="aspect-square rounded-full relative w-2/3 z-20 bg-[#f1e6c7]" />
          <div className="aspect-square rounded-full relative w-[78%] z-10 bg-sienna/90" />
        </div> */}
      </div>

      <div className="relative rounded-b-2xl px-6 pb-7 pt-12 border border-t-0 border-charcoal-3/10 bg-ivory-1">
        <div className="text-2xl capitalize select-none font-medium text-amber-950 bg-ivory-2 aspect-square border-[3px] border-ivory-1 rounded-full w-[72px] text-center flex items-center justify-center absolute top-0 -translate-y-1/2 left-5">
          {detail ? detail.name[0].toUpperCase() : "U"}
        </div>

        <div className="flex max-lg:flex-col lg:items-center lg:justify-between pb-10">
          <div className="flex flex-col justify-start gap-1">
            <div className="text-3xl text-charcoal-3/90">
              {detail ? detail.name : "User"}
            </div>
            {detail && (detail?.mobileNumber || detail?.mail) && (
              <div className="text-sm text-charcoal-3/60 max-lg:hidden">
                {detail?.mobileNumber || detail?.mail}
              </div>
            )}
          </div>
          {/* {detail && (
            <div className="lg:self-end text-sm max-lg:pt-1 text-charcoal-3/60 lg:text-charcoal-3/85">
              {`Member for past ${moment(detail.registeredAt).toNow(true)}`}
            </div>
          )} */}
        </div>

        {children}
      </div>
    </section>
  );
}
