import { Children } from "@/common/types/reactTypes";

export default function FrontendAuthUIWrapper({
  children
}: {
  children: Children;
}) {
  return (
    <section className="relative grid *:row-start-1 *:col-start-1 bg-ivory min-h-full min-w-full sm:min-w-[400px] sm:max-w-[400px] sm:min-h-[580px] sm:max-h-[580px] sm:rounded-3xl sm:overflow-hidden">
      {/* ===[ sections ]============================== */}
      <section className="*:px-4 z-50 text-charcoal grid grid-cols-1 grid-rows-[33dvh_10dvh_calc(57dvh_+_32px)] sm:grid-rows-[30dvh_10dvh_calc(57dvh_+_32px)]">
        {/* LOGO ----------------------------- */}
        <div className="z-10 flex flex-col items-center justify-center gap-y-6 p-10 sm:-translate-y-5">
          <div className="w-16 sm:w-12 z-20 brightness-110">
            <div>LOGO</div>
          </div>
        </div>

        {/* TITLE ------------------------------ */}
        <div className="z-20 grid place-items-center -translate-y-12 sm:-translate-y-[90px]">
          <div className="flex flex-wrap items-baseline justify-center tracking-wide font-bold text-[25px] sm:text-[22px] text-center gap-x-2 *:leading-none">
            <span className="text-charcoal"> India&apos;s</span>{" "}
            <span className="text-sienna">#1</span>{" "}
            <span className="text-charcoal"> Gifting Website</span>
          </div>
        </div>

        {/* IMP LOGIN HERE --------------------------- */}
        <div className="relative flex items-stretch justify-start gap-12 overflow-hidden -translate-y-8 sm:-translate-y-16 *:overflow-hidden sm:w-[calc(400px)]">
          {children}
        </div>
      </section>

      {/* ===[ top lighting ]========================== */}
      <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-sienna-2/30 to-transparent to-40% [mask-image:radial-gradient(150dvw_500px_at_top_center,white,transparent)]" />
    </section>
  );
}
