// constants
import { IS_MOBILE } from "@/common/constants/mediaQueries";

// components
import ContentDetailCancellationPolicyDialog from "./ContentDetailCancellationPolicyDialog";
import ContentDetailCancellationPolicyDrawer from "./ContentDetailCancellationPolicyDrawer";

// hooks
import { useMediaQuery } from "usehooks-ts";

export default function ContentDetailCancellationPolicy({
  cancellationPolicy
}: {
  cancellationPolicy: string;
}) {
  const isMobile = useMediaQuery(IS_MOBILE);

  return isMobile ? (
    <ContentDetailCancellationPolicyDrawer
      cancellationPolicy={cancellationPolicy}
    />
  ) : (
    <ContentDetailCancellationPolicyDialog
      cancellationPolicy={cancellationPolicy}
    />
  );
}
