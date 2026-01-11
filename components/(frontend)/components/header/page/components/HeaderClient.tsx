"use client";

// utils
import { lazy, memo, Suspense, useState } from "react";

// hooks
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import MobileHeaderDrawer from "./MobileDrawer/MobileHeaderDrawer";
import HeaderCart from "./content/HeaderCart";
import HeaderContact from "./content/HeaderContact";
import HeaderLogo from "@/components/(_common)/Logo/HeaderLogo";
import HeaderUserContent from "./content/HeaderUserContent";
import HeaderNavBar from "./navBar/HeaderNavBar";
import SearchDesktop from "./content/components/search/SearchDesktop";
import SearchMobile from "./content/components/search/SearchMobile";
import SelectCityMobile from "@/components/(frontend)/global/SelectCity/SelectCityMobile";
import SelectCityDesktop from "@/components/(frontend)/global/SelectCity/SelectCityDesktop";
import WidthWrapper from "@/components/(frontend)/components/wrapper/WidthWrapper";

// lazy components
const LazyPincodeDialog = lazy(
  () => import("@/components/(frontend)/global/SelectCity/cityModal/CityDialog")
);
const LazyPincodeDrawer = lazy(
  () => import("@/components/(frontend)/global/SelectCity/cityModal/CityDrawer")
);
const LazyCustomerAuthDialog = lazy(
  () => import("@/components/(frontend)/auth/components/CustomerAuthDialog")
);

// types
import { type SearchBarInitialContentsType } from "../Header";
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";

function HeaderClient({
  navLinks,
  searchResults
}: {
  navLinks: HeaderNavLinkDocument[];
  searchResults: SearchBarInitialContentsType | null;
}) {
  // hooks
  const {
    isTablet,
    auth: {
      data: { showAuth, isAuthenticated, userName },
      method: { onChangeShowAuth }
    },
    location: {
      data: { selectedCity }
    },
    profile: {
      data: { customer }
    }
  } = useAppStates();

  // states
  const [showCitiesList, setShowCitiesList] = useState<boolean>(false);

  return (
    <>
      <header
        className={`!z-50 pt-3 border-b border-ash-3/30 lg:pt-4.5 max-lg:sticky max-lg:top-0 bg-ivory-1 flex flex-col justify-start h-fit *:px-3. 1200:px-0`}
      >
        <WidthWrapper className={"max-lg:!px-1 z-30"}>
          <div className="relative flex items-center justify-between pb-2.5 lg:pb-3 max-lg:px-2">
            <div className="flex items-center max-lg:w-full justify-between lg:justify-start gap-3 lg:gap-1">
              <MobileHeaderDrawer
                isAuthenticated={isAuthenticated}
                customerName={userName}
                customer={customer}
                navLinks={navLinks}
              />
              <HeaderLogo />
              <SelectCityDesktop
                selectedCity={selectedCity}
                onClick={() => {
                  setShowCitiesList(true);
                }}
              />
            </div>
            <SearchDesktop searchResults={searchResults} />
            <div className="flex items-center justify-end gap-1.5 lg:gap-7 lg:translate-y-1">
              <SearchMobile searchResults={searchResults} />
              <HeaderCart />
              <HeaderUserContent
                isAuthenticated={isAuthenticated}
                userName={userName}
                onClick={() => {
                  onChangeShowAuth(true);
                }}
              />
              {/* <HeaderContact /> */}
            </div>
          </div>
        </WidthWrapper>
        <SelectCityMobile
          selectedCity={selectedCity}
          onClick={() => {
            setShowCitiesList(true);
          }}
        />
        <HeaderNavBar navLinks={navLinks} />
      </header>
      {isTablet ? (
        <Suspense fallback={<></>}>
          <LazyPincodeDrawer
            showDrawer={showCitiesList}
            onToggleShowDrawer={setShowCitiesList}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<></>}>
          <LazyPincodeDialog
            showDialog={showCitiesList}
            onToggleShowDialog={setShowCitiesList}
          />
        </Suspense>
      )}
      <Suspense fallback={<></>}>
        <LazyCustomerAuthDialog
          showDialog={showAuth}
          onChangeShowDialog={onChangeShowAuth}
        />
      </Suspense>
    </>
  );
}

export default memo(HeaderClient);
