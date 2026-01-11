// config
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// requests
import { fetchHeader } from "@/request/page/header";

// constants
import { ALL_CACHE_KEY, SEARCH_CACHE_KEY } from "@/common/constants/cacheKeys";
import { API_SEARCH_INITIAL_LOAD } from "@/common/apiHandlers/(frontend)/apiLinks";
import { XApiKey } from "@/common/constants/apiKey";

// utils
import { memo } from "react";

// components
import HeaderClient from "./components/HeaderClient";

// types
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";
import { HeaderNavLinkSectionDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSection";
import { HeaderNavLinkSectionLinkDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSectionLink";

async function getNavLinks() {
  try {
    const response = await fetchHeader(RENDERING_STRATEGY);

    if (response.data) {
      return response.data as HeaderNavLinkDocument[];
    }
  } catch (error) {
    return [];
  }

  return [];
}

export type SearchBarInitialContentsType = {
  aiTags: { _id: string; name: string }[];
  categories: { name: string; slug: string }[];
  trendingKeywords: { label: string; path: string }[];
};


async function Header({ searchResults }: { searchResults: SearchBarInitialContentsType | null }) {
  // const navLinks: HeaderNavLinkDocument[] = await getNavLinks();
  const navLinks: HeaderNavLinkDocument[] = [
 {
    label: "Flowers",
    order: 1,
    sections: [
      {
        heading: "Flowers Services",
        links: [
          { label: "All Flowers ", path: "/flowers" },
          { label: "Red Rose", path: "/red-rose" },
          { label: "Pink Rose", path: "/pink-rose" },
          { label: "Yellow Rose", path: "/yellow-rose" },
          { label: "Carnations", path: "/carnations-flower" },
          { label: "Lily", path: "/lily-flower" },
          { label: "Gerberas", path: "/gerberas-flower" },
          { label: "Orchids", path: "/orchids-flower" },
          { label: "White Rose", path: "/white-rose" },
          { label: "Chocolate Bouquet", path: "/chocolate-bouquet" },
        ],
      },
    ],
  },
     {
    label: "Cakes",
    order: 4,
    sections: [
      {
        heading: "Cakes",
        links: [{ label: "All cakes", path: "/cakes" }],
      },
    ],
  },
      {
    label: "Balloon Decor",
    order: 5,
    sections: [
      {
        heading: " Balloon Decoration",
        links: [{ label: "All Balloon Decoration", path: "/balloon-decoration" }],
      },
    ],
  },

     {
    label: "Wedding",
    order: 6,
    sections: [
      {
        heading: "Wedding Services",
        links: [
          { label: "First Night Room Decoration", path: "/first-night-room-decoration" },
          { label: "Jaimala / Varmala", path: "/wedding-varmala-jaimala" },
          { label: "Wedding Car Decor", path: "/wedding-car-decorations" },
          { label: "Haldi Decoration", path: "/haldi-decoration-service" },
          { label: "Mehndi Decoration", path: "/mehndi-decoration-service" },
        ],
      },
    ],
  },

   {
    label: "Personalized",
    order: 7,
    sections: [
      {
        heading: "Comming Soon",
        links: [],
      },
    ],
  },
        {
    label: "Premium",
    order: 8,
    sections: [
      {
        heading: "All Premium Gifting in India",
        links: [{ label: "Premium Gift", path: "/flowers/india" }],
      },
    ],
  },
    // {
    //   label: "Hampers",
    //   order: 6,
    //   sections: [
    //     {
    //       heading: "",
    //       links: [

    //       ] as HeaderNavLinkSectionLinkDocument[]
    //     }
    //   ] as HeaderNavLinkSectionDocument[]
    // },
  ] as HeaderNavLinkDocument[];

  return (
    <HeaderClient
      navLinks={navLinks}
      searchResults={searchResults}
    />
  );
}

export default memo(Header);
