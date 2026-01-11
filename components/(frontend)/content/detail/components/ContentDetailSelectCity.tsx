// constants
import { IS_MOBILE } from "@/common/constants/mediaQueries";

// utils
import { lazy, memo } from "react";

// hooks
import { useMediaQuery } from "usehooks-ts";

// components
const LazyCityDialog = lazy(
  () => import("@/components/(frontend)/global/SelectCity/cityModal/CityDialog")
);
const LazyCityDrawer = lazy(
  () => import("@/components/(frontend)/global/SelectCity/cityModal/CityDrawer")
);
import { Suspense } from "react";

function ContentDetailSelectCity({
  showSelectCity,
  onChangeShowSelectCity
}: {
  showSelectCity: boolean;
  onChangeShowSelectCity: (showSelectCity: boolean) => void;
}) {
  // hooks
  const isMobile = useMediaQuery(IS_MOBILE);

  return isMobile ? (
    <Suspense>
      <LazyCityDrawer
        showDrawer={showSelectCity}
        onToggleShowDrawer={onChangeShowSelectCity}
      />
    </Suspense>
  ) : (
    <Suspense>
      <LazyCityDialog
        showDialog={showSelectCity}
        onToggleShowDialog={onChangeShowSelectCity}
      />
    </Suspense>
  );
}

export default memo(ContentDetailSelectCity);
