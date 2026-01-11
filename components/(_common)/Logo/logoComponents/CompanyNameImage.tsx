// utils
import { memo } from "react";

// components
import Image from "next/image";
import { COMPANY_LOGO_URL, COMPANY_NAME } from "@/common/constants/companyDetails";

function CompanyNameImage() {
  return (
    <Image
      src={COMPANY_LOGO_URL}
      alt={COMPANY_NAME}
      width={100}
      height={40}
      priority
      loading="eager"
      decoding="sync"
      quality={75}
    />
  );
}

export default memo(CompanyNameImage);
