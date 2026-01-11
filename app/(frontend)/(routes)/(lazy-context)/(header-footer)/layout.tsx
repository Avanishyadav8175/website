// components/(frontend)/FrontendRoot.tsx

import { API_SEARCH_INITIAL_LOAD } from "@/common/apiHandlers/(frontend)/apiLinks";
import { XApiKey } from "@/common/constants/apiKey";
import { ALL_CACHE_KEY, SEARCH_CACHE_KEY } from "@/common/constants/cacheKeys";

import Background from "@/components/(frontend)/components/background/page/Background";
import Footer from "@/components/(frontend)/components/footer/page/Footer";
import Header, {
  SearchBarInitialContentsType
} from "@/components/(frontend)/components/header/page/Header";
import MobileNavbar from "@/components/(frontend)/components/mobileNavbar/MobileNavbar";

import { ReactNode } from "react";

/* ---------------------------------------------
   SAFE FETCH (never returns null)
--------------------------------------------- */
async function fetchInitialSearch(): Promise<SearchBarInitialContentsType> {
  try {
    const response = await fetch(API_SEARCH_INITIAL_LOAD, {
      headers: { "x-api-key": XApiKey },
      next: {
        tags: [ALL_CACHE_KEY, SEARCH_CACHE_KEY]
      }
    });

    if (!response.ok) {
      return {} as SearchBarInitialContentsType;
    }

    const data = await response.json();
    return data as SearchBarInitialContentsType;
  } catch {
    return {} as SearchBarInitialContentsType;
  }
}

/* ---------------------------------------------
   ROOT COMPONENT (SAFE)
--------------------------------------------- */
export default async function FrontendRoot({
  children
}: {
  children: ReactNode;
}) {
  const searchResults = await fetchInitialSearch();

  return (
    <Background showStickyButtons>
      <Header searchResults={searchResults} />
      {children}
      <Footer />
      <MobileNavbar searchResults={searchResults} />
    </Background>
  );
}

