// utils
import { memo } from "react";

// components
import Image from "next/image";

function CompanyLogoImage() {
  return (
    <Image
      src={"/logo/something-icon.webp"}
      alt=""
      width={30}
      height={40}
      priority
      loading="eager"
      decoding="sync"
      quality={75}
    />
  );
}

export default memo(CompanyLogoImage);
