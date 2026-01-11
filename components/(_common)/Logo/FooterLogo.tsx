// utils
import { memo } from "react";

// components
import Image from "next/image";
import Link from "next/link";

function FooterLogo() {
  return (
    <Link
      href={"/"}
      prefetch={false}
      className={`flex items-center gap-1.5 sm:gap-3 min-w-fit max-w-fit contrast-125 brightness-75 max-sm:mb-3 max-sm:mt-5`}
    >
      <Image
        src={"/logo/somethiong.webp"}
        alt=""
        width={30}
        height={40}
        priority
        quality={75}
        className="w-[30px] h-[40px]"
      />
      <Image
        src={"/logo/somethiong-icon.webp"}
        alt=""
        width={100}
        height={40}
        priority
        quality={75}
        className="w-[100px] h-[27px]"
      />
    </Link>
  );
}

export default memo(FooterLogo);
