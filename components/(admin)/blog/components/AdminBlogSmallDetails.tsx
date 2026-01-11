import { SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";
import { SelectOption } from "@/common/types/inputs";
import AdvancedCheckbox from "@/lib/Forms/Checkbox/AdvancedCheckbox";
import Input from "@/lib/Forms/Input/Input";
import Textarea from "@/lib/Forms/Textarea/Textarea";

export default function AdminBlogSmallDetails({
  currIndex,
  slug,
  updateSlug,
  author,
  updateAuthor,
  allAuthors,
  categories,
  updateCategories,
  allCategories,
  seo,
  updateSEO,
  tags,
  updateTags,
  allTags
}: {
  currIndex: 0 | 1;
  slug: string;
  updateSlug: (newSlug: string) => void;
  author: SelectOption | undefined;
  allAuthors: SelectOption[];
  updateAuthor: (newAuthor: SelectOption) => void;
  categories: SelectOption[];
  updateCategories: (newCategories: SelectOption[]) => void;
  allCategories: SelectOption[];
  tags: SelectOption[];
  updateTags: (newTags: SelectOption[]) => void;
  allTags: SelectOption[];
  seo: SEOMetaDocument;
  updateSEO: (newSEO: SEOMetaDocument) => void;
}) {
  return (
    <section
      className={`bg-teal-200 ${currIndex === 1 ? "w-[360px] px-5" : "w-0"}`}
    >
      <div className="flex flex-col justify-start gap-9 overflow-auto scrollbar-hide max-h-device sm:max-h-[90dvh] pt-10 pb-40">
        {/* SLUG ]============================================= */}
        <Input
          type="text"
          isRequired={true}
          errorCheck={false}
          validCheck={false}
          name="slug"
          labelConfig={{ label: "URL", layoutStyle: "flex-col" }}
          customValue={{
            value: slug,
            setValue: updateSlug
          }}
          customStyle="bg-transparent border-b border-charcoal-3/60 transition-all duration-300 hover:border-teal-600 focus:border-teal-800 py-3 w-full outline-none"
        />

        {/* AUTHOR ]============================================= */}
        {/* <Input
          type="dropdown"
          isRequired={true}
          errorCheck={false}
          validCheck={false}
          name="author"
          labelConfig={{ label: "Author", layoutStyle: "flex-col" }}
          options={allAuthors}
          nullOption
          customValue={{
            value: author ? author.value : "",
            setValue: (newVal: string) => {
              const selectedOption: SelectOption = allAuthors.find(
                ({ value }) => value === newVal
              ) as SelectOption;
              updateAuthor(selectedOption);
            }
          }}
          customStyle="cursor-pointer bg-transparent border-b border-charcoal-3/60 transition-all duration-300 hover:border-teal-600 focus:border-teal-800 py-3 w-full outline-none"
        /> */}

        {/* CATEGORIES ]============================================= */}
        <div className="flex flex-col justify-start gap-3">
          <span className="font-medium">
            Categories <span className="text-red-400">*</span>
          </span>
          <AdvancedCheckbox
            options={allCategories}
            name="blog-tags"
            selectedValues={
              categories && categories[0]
                ? categories.map(({ value }) => value)
                : []
            }
            onChangeSelectedValues={(newValues: string[]) => {
              const selectedOptions: SelectOption[] = newValues.map(
                (val) =>
                  allCategories.find(
                    ({ value }) => value === val
                  ) as SelectOption
              );

              updateCategories(selectedOptions);
            }}
          />
        </div>

        {/* TAGS ]============================================= */}
        {/* <div className="flex flex-col justify-start gap-3">
          <span className="font-medium">
            Tags <span className="text-red-400">*</span>
          </span>
          <AdvancedCheckbox
            options={allTags}
            name="blog-tags"
            selectedValues={
              tags && tags.length
                ? tags.filter((tag) => tag).map(({ value }) => value)
                : []
            }
            onChangeSelectedValues={(newValues: string[]) => {
              const selectedOptions: SelectOption[] = newValues.map(
                (val) =>
                  allTags.find(({ value }) => value === val) as SelectOption
              );

              updateTags(selectedOptions);
            }}
          />
        </div> */}

        {/* SEO ]============================================= */}
        <div className="flex flex-col justify-start gap-3 border-t border-charcoal/20 mt-4 pt-7">
          <span className="font-medium text-xl text-center">SEO Data</span>

          <Input
            type="text"
            isRequired={false}
            errorCheck={false}
            validCheck={false}
            name="slug"
            labelConfig={{ label: "SEO Title", layoutStyle: "flex-col" }}
            customValue={{
              value: seo.title,
              setValue: (newVal: string) =>
                updateSEO({
                  ...seo,
                  title: newVal
                } as SEOMetaDocument)
            }}
            customStyle="bg-transparent border-b border-charcoal-3/60 transition-all duration-300 hover:border-teal-600 focus:border-teal-800 py-3 w-full outline-none"
          />

          <span className="font-medium mt-2">Tags</span>
          <Textarea
            errorCheck={false}
            validCheck={false}
            name="seo-tags"
            customValue={{
              value: seo.tags.join("\n"),
              setValue: (newVal: string) =>
                updateSEO({
                  ...seo,
                  tags: newVal.split("\n")
                } as SEOMetaDocument)
            }}
            customStyle="resize-none outline-none bg-charcoal-3/10 rounded-xl p-4 transition-all duration-300 w-full h-[70px] scrollbar-hide"
          />

          <span className="font-medium mt-2">Description</span>
          <Textarea
            errorCheck={false}
            validCheck={false}
            name="seo-description"
            customValue={{
              value: seo.description,
              setValue: (newVal: string) =>
                updateSEO({ ...seo, description: newVal } as SEOMetaDocument)
            }}
            customStyle="resize-none outline-none bg-charcoal-3/10 rounded-xl p-4 transition-all duration-300 w-full h-[120px] scrollbar-hide"
          />
        </div>
      </div>
    </section>
  );
}
