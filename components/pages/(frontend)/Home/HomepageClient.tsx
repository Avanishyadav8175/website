// components
import BentoHomepage from "./BentoHomepage";
import BodyWrapper from "@/components/(frontend)/components/wrapper/BodyWrapper";

// types
import { type HomepageLayoutDocument } from "@/common/types/documentation/pages/homepageLayout";
import { WEBSITE_NAME } from "@/common/constants/environmentVariables";

export default function HomepageClient({
  homepageLayouts
}: {
  homepageLayouts: HomepageLayoutDocument[];
}) {
  return (
    <BodyWrapper fullWidth>
      <h1 className="visually-hidden">
        {WEBSITE_NAME}
      </h1>
      <BentoHomepage
        data={homepageLayouts}
        inFrontend
      />
    </BodyWrapper>
  );
}
