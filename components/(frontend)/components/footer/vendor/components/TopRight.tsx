// components
import Link from "next/link";

// type
import { type FooterSectionDocument } from "@/common/types/documentation/pages/footerSection";

export default function FooterTopRight({
  footerSections: footerSections
}: {
  footerSections: FooterSectionDocument[];
}) {
  return (
    <section className="grid grid-cols-2 sm:flex sm:flex-wrap *:min-w-fit items-start justify-start sm:justify-end gap-x-3 gap-y-8 sm:gap-10 text-charcoal-3 pb-5 sm:pb-12 max-sm:px-1">
      {footerSections.map(({ _id, heading, links }) => (
        <div
          key={_id as string}
          className="flex flex-col items-start justify-start gap-2 sm:pr-14"
        >
          <span className="text-lg sm:font-semibold capitalize mb-1">
            {heading}
          </span>
          <div className="flex flex-col items-start justify-start gap-3 text-charcoal-3/60">
            {links &&
              links.map(({ _id, label, path }) => (
                <Link
                  key={_id as string}
                  href={path}
                  className={`transition-all duration-300 hover:brightness-75 hover:text-sienna max-sm:text-sm`}
                  // prefetch
                >
                  {label}
                </Link>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}
