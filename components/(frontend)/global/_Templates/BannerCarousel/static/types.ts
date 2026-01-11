import { BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";

export type BannerCarouselElementsType = {
  image: {
    mobile: { url: string; alt: string };
    desktop: { url: string; alt: string };
  };
} & ({ isLink: true; link: string } | { isLink: false });

export type BannerCarouselType = {
  elements: BannerCarouselElementsType[];
  loop?: boolean;
  showBubbles?: boolean;
  ratioType?: BannerDocument["type"];
} & ({ autoScroll?: true; scrollAfter: number } | { autoScroll?: false });
