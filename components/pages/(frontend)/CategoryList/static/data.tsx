import { BasicImageType } from "@/common/types/types";
import { BannerCarouselType } from "@/components/(frontend)/global/_Templates/BannerCarousel/static/types";
import MenGifting from "../../../../../public/placeholders/menGifting.jpeg";
import WomenGifting from "../../../../../public/placeholders/womenGifting.jpg";
import seniorCitizenGifting from "../../../../../public/placeholders/seniorCitizienGifting.jpg";
import childrenGifting from "../../../../../public/placeholders/childrenGifting.jpg";
import { ContentsSortType } from "./types";

export const dummyFilters: Array<{
  _id: string;
  filterName: string;
  filterContent: string | JSX.Element;
}> = [
  { _id: "356eyr244", filterName: "Popularity", filterContent: <></> },
  { _id: "356eyr244", filterName: "Price", filterContent: <></> },
  { _id: "356eyr244", filterName: "Cake Type", filterContent: <></> },
  { _id: "356eyr244", filterName: "Indgredients", filterContent: <></> },
  { _id: "356eyr244", filterName: "Flavor", filterContent: <></> },
  { _id: "356eyr244", filterName: "Color", filterContent: <></> },
  { _id: "356eyr244", filterName: "Shape", filterContent: <></> },
  { _id: "356eyr244", filterName: "Weight", filterContent: <></> }
];

export const dummyListBannerData: BannerCarouselType = {
  scrollAfter: 7000,
  elements: [
    {
      image: {
        desktop: {
          alt: "",
          url: "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Rakhi_Desk-Recovered.jpg"
        },
        mobile: {
          alt: "",
          url: "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Rakhi_Desk-Recovered.jpg"
        }
      },
      isLink: false
    },
    {
      image: {
        desktop: {
          alt: "",
          url: "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday-7624.jpg"
        },
        mobile: {
          alt: "",
          url: "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday-7624.jpg"
        }
      },
      isLink: false
    },
    {
      image: {
        desktop: {
          alt: "",
          url: "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Gourmet_Desk.jpg"
        },
        mobile: {
          alt: "",
          url: "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Gourmet_Desk.jpg"
        }
      },
      isLink: false
    }
  ]
};

export const dummyListQuickLinks: {
  _id: string;
  label: string;
  link: string;
  image?: BasicImageType;
}[] = [
  {
    _id: "",
    label: "Men",
    link: "/men",
    image: {
      alt: "",
      url: MenGifting.src
    }
  },
  {
    _id: "",
    label: "Women",
    link: "/women",
    image: {
      alt: "",
      url: WomenGifting.src
    }
  },
  {
    _id: "",
    label: "Children",
    link: "/children",
    image: {
      alt: "",
      url: childrenGifting.src
    }
  },
  {
    _id: "",
    label: "Senior Citizens",
    link: "/senior-citizens",
    image: {
      alt: "",
      url: seniorCitizenGifting.src
    }
  }
];

export const CATEGORY_PAGE_SORT_TYPES: {
  label: string;
  sortBy: ContentsSortType;
}[] = [
  { label: "Popularity", sortBy: "popularity" },
  { label: "Latest", sortBy: "latest" },
  { label: "High to Low", sortBy: "high-to-low" },
  { label: "Low to High", sortBy: "low-to-high" }
];
