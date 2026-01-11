// utils
import { memo } from "react";
import Link from "next/link";

async function notFound() {
  return (
    <div>
      <meta
        name="robots"
        content="noindex, nofollow"
      />
      <div className="w-full h-[75dvh] bg-ivory-1 grid *:row-start-1 *:col-start-1">
        <div className="flex flex-col items-center justify-center gap-2 *text-center">
          {/* <Image
            src={"/placeholders/error-404.svg"}
            alt="not-found"
            unoptimized
            decoding="async"
            width={300}
            height={300}
            draggable={false}
          /> */}
          <span className="text-charcoal-3/90">
            Not Found
          </span>
          <Link
            href={"/"}
            prefetch={false}
            className="cursor-pointer px-4 py-1.5 mt-6 bg-sienna/70 text-white rounded-full text-charcoal-3/60 transition-all duration-300 hover:bg-sienna"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(notFound);
