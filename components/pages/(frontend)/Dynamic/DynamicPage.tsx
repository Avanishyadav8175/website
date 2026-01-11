import FAQs from "@/components/(frontend)/global/_Templates/FAQs/FAQs";
import { dummyCustomContentData, dummyFAQData } from "../Home/static/data";
import { HorizontalSpacing } from "@/components/(frontend)/global/_Spacings/HorizontalSpacings";
import Heading2 from "@/components/(frontend)/global/_Typography/Heading2";
import CustomTypedContent from "@/components/(frontend)/global/_Templates/CustomTypedContent/CustomTypedContent";
import { fromSlug } from "@/common/utils/slugOperations";
import { CategoryListBannerCarousel } from "@/components/(frontend)/global/_Templates/BannerCarousel/BannerCarousel";
import { dummyListBannerData } from "../CategoryList/static/data";

export default function FrontendDynamicPage({ slug }: { slug: string }) {
  return (
    <>
      <CategoryListBannerCarousel config={dummyListBannerData} />

      <HorizontalSpacing className="pt-4 sm:mb-1 sm:mt-2">
        <h1
          className={`text-[30px] z-[850] sm:text-4xl font-medium`}
        >
          {fromSlug(slug)}
        </h1>
      </HorizontalSpacing>

      <HorizontalSpacing className="mb-4">
        <CustomTypedContent content={dummyCustomContentData.substring(55)} />
      </HorizontalSpacing>

      <HorizontalSpacing className="my-4">
        <Heading2 label="Frequently Asked Questions" />
        <FAQs faqData={dummyFAQData} />
      </HorizontalSpacing>
    </>
  );
}
