import { Zap } from "lucide-react";

const targetDate = (() => {
  const now = new Date();
  const futureDate = new Date(now);

  futureDate.setHours(futureDate.getHours() + 6);
  futureDate.setMinutes(futureDate.getMinutes() + 48);
  futureDate.setSeconds(futureDate.getSeconds() + 21);

  return futureDate;
})();

export default function FrontendProductEarliestDeliveryBy({
  type,
  timer
}: {
  type?: "gold" | "plain" | "sticky-desktop";
  timer: string;
}) {
  if (timer === "") return <></>;

  return (
    <div className="bg-gradient-to-r from-sienna-3/30 to-transparent text-sienna text-sm bg-sienna-3/10 flex items-center justify-start py-3 px-3 rounded-xl  gap-x-1">
      <div className="font-medium flex items-center justify-center gap-x-1.5 pr-1">
        <Zap
          width={16}
          height={16}
          className="fill-sienna"
        />
        <span>Get Today!</span>
      </div>
      <span className="text-charcoal-3/75">Order within</span>
      <span className="font-semibold text-charcoal-3/75">{timer}</span>
    </div>
  );

  /* if (type === "plain")
    return (
      <div className="col-span-2 text-xs sm:hidden my-0.5 flex items-center justify-center gap-2">
        <TruckIcon
          strokeWidth={1.5}
          width={15}
          height={15}
        />
        <span>
          Earliest Delivery: <span className="font-semibold">Today</span> (order
          in <span className="font-semibold">{timer}</span>)
        </span>
      </div>
    );
  else if (type === "sticky-desktop")
    return (
      <div className="text-sm sticky bottom-0 max-sm:hidden bg-charcoal-3 text-sienna flex items-center justify-start gap-x-1 rounded-t-xl w-fit px-4 pt-2 pb-1.5">
        <Timer
          strokeWidth={1.5}
          width={20}
        />
        Get <span className="font-semibold">Today!</span> Order within:{" "}
        <span className="font-medium text-ivory-1">{timer}</span>
      </div>
    );
  else
    return (
      <div className="text-xs w-fit flex items-center justify-start gap-2 px-3 py-1.5 rounded-lg  bg-gradient-to-br from-sienna-1/70 via-sienna-3/20 to-sienna-1/70">
        <TruckIcon
          strokeWidth={1.5}
          width={15}
          height={15}
        />
        <span>
          Earliest Delivery: <span className="font-semibold">Today</span> (order
          in <span className="font-semibold">{timer}</span>)
        </span>
      </div>
    ); */
}
