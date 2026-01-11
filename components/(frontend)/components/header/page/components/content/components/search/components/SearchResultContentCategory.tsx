// components
import Link from "next/link";

export default function SearchResultContentCategory({
  name,
  slug,
  collapse
}: {
  name: string;
  slug: string;
  collapse: () => void;
}) {
  return (
    <Link
      className="text-sm border border-px sm:border-charcoal-3/50 px-3 py-1 rounded-full cursor-pointer transition-all duration-300 hover:shadow-md hover:bg-sienna hover:text-white hover:border-sienna"
      href={`/${slug}`}
      onClick={collapse}
    >
      {name}
    </Link>
  );
}
