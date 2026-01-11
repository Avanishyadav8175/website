import { Children } from "@/common/types/reactTypes";

export default function ProfileSideUI({
  children,
  name,
  dateOfJoin,
  lowerDetail
}: {
  children: Children;
  name: string;
  dateOfJoin: string;
  lowerDetail?: string;
}) {
  return (
    <section className="p-3 pt-5 sm:p-8">
      <div className="grid grid-cols-1 auto-rows-min">
        <div className="rounded-t-2xl bg-sienna-2/30 h-20 relative overflow-hidden">
          <div className="aspect-square absolute bottom-0 right-0 translate-x-[calc(50%_-_6px)] translate-y-[calc(50%_-_6px)] w-36 grid place-items-center *:row-start-1 *:col-start-1">
            <div className="aspect-square rounded-full relative w-1/6 z-50 bg-sienna/90" />
            <div className="aspect-square rounded-full relative w-2/6 z-40 bg-ash-2" />
            <div className="aspect-square rounded-full relative w-[45%] z-30 bg-sienna/90" />
            <div className="aspect-square rounded-full relative w-2/3 z-20 bg-ash-2" />
            <div className="aspect-square rounded-full relative w-[78%] z-10 bg-sienna/90" />
          </div>
        </div>

        <div className="relative rounded-b-2xl px-6 pb-7 pt-12 border border-t-0 border-charcoal-3/20">
          <div className="text-2xl capitalize select-none font-medium text-amber-950 bg-ash-1 aspect-square border-[3px] border-ivory-1 rounded-full w-[72px] text-center flex items-center justify-center absolute top-0 -translate-y-1/2 left-5">
            {name[0]}
          </div>

          <div className="flex max-sm:flex-col sm:items-center sm:justify-between pb-10">
            <div className="flex flex-col justify-start gap-1">
              <div className="text-3xl text-charcoal-3/90">{name}</div>
              {lowerDetail && (
                <div className="text-sm text-charcoal-3/60 max-sm:hidden">
                  {lowerDetail}
                </div>
              )}
            </div>

            <div className="sm:self-end text-sm max-sm:pt-1 text-charcoal-3/60 sm:text-charcoal-3/85">
              Registered on: {dateOfJoin}
            </div>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}
