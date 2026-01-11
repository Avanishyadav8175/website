// utils
import { memo } from "react";

// components
import Image from "next/image";
import Link from "next/link";
import { COMPANY_LOGO_URL } from "@/common/constants/companyDetails";

function HeaderLogo({ atFooter }: { atFooter?: true }) {
  return (
    <Link
      href={"/"}
      prefetch={false}
      className={`flex items-center gap-1.5 lg:gap-3 min-w-fit max-w-fit ${!atFooter && "max-lg:translate-x-5"}`}
    >
      <Image
        src={COMPANY_LOGO_URL}
        alt="Logo"
        width={30}
        unoptimized
        height={40}
        priority
        className="h-auto w-32 object-cover object-center"
      />
    </Link>
  );
}

export default memo(HeaderLogo);
