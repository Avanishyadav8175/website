// providers
import { LocationProvider } from "@/hooks/useLocation/useLocation";

// components
import ContentDetailDeliveryPincodeListUI from "./ContentDetailDeliveryCityListUI";

export default function ContentDetailDeliveryCityList({
  showPopover,
  keyword,
  onChangeShowPopover
}: {
  showPopover: boolean;
  keyword: string;
  onChangeShowPopover: (showPopover: boolean) => void;
}) {
  return (
    <LocationProvider>
      <ContentDetailDeliveryPincodeListUI
        showPopover={showPopover}
        keyword={keyword}
        onChangeShowPopover={onChangeShowPopover}
      />
    </LocationProvider>
  );
}
