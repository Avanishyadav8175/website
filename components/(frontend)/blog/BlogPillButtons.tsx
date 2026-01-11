// components
// import Link from "next/link";

export default function BlogPillButtons({
  pills
}: {
  pills: { label: string; path: string }[];
}) {
  return (
    <section className="flex items-center justify-start flex-wrap *:whitespace-nowrap gap-2.5 sm:gap-2">
      {pills.map((tag, index) => (
        <div
          key={index}
          // href={tag.path}
          className="text-sm font-medium rounded-full py-1 px-4 bg-charcoal-3/10 text-charcoal-3/90"
        >
          {tag.label}
        </div>
        // <Link
        //   key={index}
        //   href={tag.path}
        //   className="text-sm rounded-full py-[3px] px-4 bg-charcoal-3/10 sm:bg-charcoal-3/20 text-charcoal-3/85 cursor-pointer transition-all duration-300 hover:bg-charcoal-3/30"
        // >
        //   {tag.label}
        // </Link>
      ))}
    </section>
  );
}
