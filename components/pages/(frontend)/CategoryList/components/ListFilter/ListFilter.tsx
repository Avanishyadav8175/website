import FAQs from "@/components/(frontend)/global/_Templates/FAQs/FAQs";

export default function FrontendCategoryListFilter({
  filters
}: {
  filters: Array<{
    _id: string;
    filterName: string;
    filterContent: string | JSX.Element;
  }>;
}) {
  return (
    <FAQs
      faqData={
        filters.map(({ _id, filterName, filterContent }) => ({
          _id,
          question: filterName,
          answer: filterContent
        })) || []
      }
    />
  );
}
