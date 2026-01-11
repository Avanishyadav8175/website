// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// components
import Image from "next/image";
import Link from "next/link";

// types
import { type BannerCarouselElementsType } from "../static/types";

export default function Banner({
  props
}: {
  props: BannerCarouselElementsType;
}) {
  return props.isLink ? (
    <Link href={props.link}>
      <Image
        className={`sm:hidden object-cover object-center h-full w-full rounded-2xl sm:rounded-3xl`}
        src={props.image.mobile.url || ""}
        alt={props.image.mobile.alt || "Banner Image"}
        width={480}
        height={240}
        unoptimized
      />
      <Image
        className={`max-sm:hidden object-cover object-center h-full w-full rounded-2xl sm:rounded-3xl`}
        src={props.image.desktop.url || ""}
        alt={props.image.desktop.alt || "Banner Image"}
        width={1200}
        height={400}
        unoptimized
      />
    </Link>
  ) : (
    <>
      <Image
        className={`sm:hidden object-cover object-center h-full w-full rounded-2xl sm:rounded-3xl`}
        src={props.image.mobile.url || ""}
        alt={props.image.mobile.alt || "Banner Image"}
        width={480}
        height={240}
        unoptimized
      />
      <Image
        className={`max-sm:hidden object-cover object-center h-full w-full rounded-2xl sm:rounded-3xl`}
        src={props.image.desktop.url || ""}
        alt={props.image.desktop.alt || "Banner Image"}
        width={1200}
        height={400}
        unoptimized
      />
    </>
  );
}

export function CategoryListBanner(props: BannerCarouselElementsType) {
  return props.isLink ? (
    <div className="grid *:row-start-1 *:col-start-1 h-[180px] min-[450px]:h-[250px] md:h-[300px]">
      <Link
        href={props.link}
        prefetch={false}
        className={`block w-full overflow-hidden`}
      >
        <Image
          className={`sm:rounded-3xl object-cover h-full w-full`}
          src={props.image.desktop.url || ""}
          alt={props.image.desktop.alt || "Banner Image"}
          width={1200}
          height={480}
          quality={50}
          unoptimized={!OPTIMIZE_IMAGE}
          draggable={false}
          priority
        />
      </Link>
    </div>
  ) : (
    <section>
      <Image
        className={`sm:rounded-3xl object-cover w-full aspect-[3/1] sm:aspect-[9/2] md:aspect-[6/1]`}
        src={props.image.desktop.url || ""}
        alt={props.image.desktop.alt || "Banner Image"}
        title={props.image.desktop.alt || "Banner"}
        width={1200}
        height={480}
        quality={50}
        unoptimized={!OPTIMIZE_IMAGE}
        draggable={false}
        priority
      />
    </section>
  );
}
