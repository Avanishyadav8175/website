import Link from "next/link";

export default function QuickLink({
  label,
  url,
  isLast
}: {
  label: string;
  url: string;
  isLast: boolean;
}) {
  return (
    <>
      <Link
        href={url}
        className="transition-all duration-300 hover:underline hover:underline-offset-2"
      >
        {label}
      </Link>
      {!isLast && <span className="px-1.5">|</span>}
    </>
  );
}
