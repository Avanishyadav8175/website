import { OPTIMIZE_IMAGE } from "@/config/image";
import Image from "next/image";
import { useEffect, useId } from "react";

export default function ReviewCarousel({
  reviews,
  autoScroll
}: {
  reviews: { name: string; desc: string; image: string; shortDetail: string }[];
  autoScroll: boolean;
}) {
  const carouselId = useId();

  useEffect(() => {
    const carousel = document.getElementById(carouselId) as HTMLElement;
    if (autoScroll && carousel) {
      const reviews = carousel.querySelectorAll(".reviewBox");
      const moveCarousel = (review: Element) =>
        review.animate(
          { transform: "translateX(-700dvw)" },
          {
            duration: innerWidth < 640 ? 7 * 12 * 1000 : 7 * 30 * 1000,
            fill: "forwards"
          }
        );

      const pauseCarousel = () =>
        reviews.forEach((rvw) =>
          rvw.animate(
            { transform: "translateX(0)" },
            { duration: 7 * 200 * 1000, fill: "forwards" }
          )
        );

      reviews.forEach((review) => {
        /* review.addEventListener("mouseenter", pauseCarousel);
        review.addEventListener("mouseleave", () =>
          review.removeEventListener("mouseenter", pauseCarousel)
        ); */
        moveCarousel(review);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoScroll]);

  return (
    <div className="flex flex-col justify-start gap-7">
      <span className="text-2xl text-center font-medium pb-2">
        Our Success Stories
      </span>
      <div
        id={carouselId}
        className="relative mb-5 flex items-center justify-start gap-9 max-w-device md:max-w-1200 overflow-x-scroll  scrollbar-hide "
      >
        <div className="z-30 text-transparent sticky self-stretch min-w-10 bg-gradient-to-r from-white to-transparent left-0">
          s
        </div>

        {[
          ...reviews,
          ...reviews,
          ...reviews,
          ...reviews,
          ...reviews,
          ...reviews,
          ...reviews
        ].map(({ image, name, desc, shortDetail }, index) => (
          <div
            key={index}
            className="reviewBox *:cursor-default rounded-3xl bg-slate-100 p-5 px-6 grid grid-cols-[auto_1fr] auto-rows-min justify-start gap-3.5 h-[28dvh] aspect-[16/9]"
          >
            <div className="rounded-full aspect-square bg-charcoal-3/40 w-12 overflow-hidden">
              <Image
                src={image}
                alt="Review Image"
                draggable={false}
                decoding="async"
                unoptimized={!OPTIMIZE_IMAGE}
                width={100}
                height={100}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <span className="text-xl h-8 self-center flex items-center justify-between">
              <span className="text-charcoal-3">{name}</span>
              <span className="text-charcoal-3/60 text-sm">
                {shortDetail}
              </span>
            </span>
            <span className="text-charcoal-3/90 text-sm col-span-2 row-start-2 pt-1">
              {desc}
            </span>
          </div>
        ))}

        <div className="z-30 text-transparent sticky self-stretch min-w-10 bg-gradient-to-l from-white to-transparent right-0">
          s
        </div>
      </div>
    </div>
  );
}
