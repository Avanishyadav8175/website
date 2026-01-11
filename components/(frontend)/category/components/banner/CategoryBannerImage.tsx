// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// utils
import { memo } from "react";

// hooks
import { useMemo } from "react";

// components
import Image from "next/image";
import Link from "next/link";

// types
import { type BannerImageDocument } from "@/common/types/documentation/nestedDocuments/bannerImage";
import { type ImageDocument } from "@/common/types/documentation/media/image";

function CategoryBannerImage({
  bannerImage
}: {
  bannerImage: BannerImageDocument;
}) {
  const mobile = useMemo(
    () => bannerImage.mobile as ImageDocument,
    [bannerImage]
  );
  const desktop = useMemo(
    () => bannerImage.desktop as ImageDocument,
    [bannerImage]
  );

  return bannerImage.path ? (
    <Link
      href={bannerImage.path}
      prefetch={false}
    >
      <Image
        className={`sm:hidden object-cover object-center h-full w-full rounded-2xl sm:rounded-3xl`}
        src={mobile.url || ""}
        alt={mobile.alt || mobile.defaultAlt || "Banner Image"}
        width={480}
        height={240}
        quality={75}
        unoptimized={!OPTIMIZE_IMAGE}
      />
      <Image
        className={`max-sm:hidden object-cover object-center h-full w-full rounded-2xl sm:rounded-3xl`}
        src={desktop.url || ""}
        alt={desktop.alt || desktop.defaultAlt || "Banner Image"}
        width={1200}
        height={400}
        quality={75}
        unoptimized={!OPTIMIZE_IMAGE}
      />
    </Link>
  ) : (
    <>
      <Image
        className={`sm:hidden object-cover object-center h-full w-full rounded-2xl sm:rounded-3xl`}
        src={mobile.url || ""}
        alt={mobile.alt || mobile.defaultAlt || "Banner Image"}
        width={480}
        height={240}
        quality={25}
        unoptimized={!OPTIMIZE_IMAGE}
      />
      <Image
        className={`max-sm:hidden object-cover object-center h-full w-full rounded-2xl sm:rounded-3xl`}
        src={desktop.url || ""}
        alt={desktop.alt || desktop.defaultAlt || "Banner Image"}
        width={1200}
        height={400}
        quality={50}
        unoptimized={!OPTIMIZE_IMAGE}
      />
    </>
  );
}

export default memo(CategoryBannerImage);
