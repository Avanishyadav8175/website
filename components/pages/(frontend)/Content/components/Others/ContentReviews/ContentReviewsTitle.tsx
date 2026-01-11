export default function ContentReviewsTitle({ title }: { title: string }) {
  return (
    <div className="w-full relative text-[25px] font-medium capitalize sm:pl-4 flex items-center justify-start max-sm:justify-center gap-[6px]">
      <div className="relative w-fit gap-[6px] flex sm:pl-[40px]">
        <span className="text-charcoal-3 text-xl sm:text-2xl">
          Customer
        </span>
        <span className="text-sienna text-xl sm:text-2xl">Reviews</span>
        <span className="absolute -top-[8px] -translate-x-[calc(100%_+_10px)] text-[56px] leading-none text-sienna">
          “
        </span>
        <span className="absolute -bottom-[8px] right-0 top-auto translate-y-[calc(50%_-_7px)]  translate-x-[calc(100%_+_10px)] text-[56px] leading-none text-sienna">
          ”
        </span>
      </div>
    </div>
  );
}
