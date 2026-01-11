
"use client";
import { BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import AdminBlogSmallDetails from "./components/AdminBlogSmallDetails";
import AdminBlogChangePreview from "./components/AdminBlogChangePreview";
import AdminBlogArticleController from "./components/AdminBlogArticleController";
import { DEFAULT_ADMIN_BLOG_ARTICLE_DATA } from "./components/static/data";
import { SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";
import { toSlug } from "@/common/utils/slugOperations";
import { useDispatch, useSelector } from "@/store/withType";
import { selectBlogAuthor } from "@/store/features/blogs/blogAuthorSlice";
import { selectBlogTag } from "@/store/features/blogs/blogTagSlice";
import { selectBlogCategory } from "@/store/features/blogs/blogCategorySlice";
import { SelectOption } from "@/common/types/inputs";
import { createBlogArticleAction } from "@/store/features/blogs/blogArticleSlice";
import { useToast } from "@/components/ui/use-toast";
import { BlogLayoutItemDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutItem";
import { QADocument } from "@/common/types/documentation/nestedDocuments/qa";
import { BlogLayoutDocument } from "@/common/types/documentation/nestedDocuments/blogLayout";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { ContentDocument } from "@/common/types/documentation/contents/content";

export default function AdminBlogsForm(
  props: {
    open: boolean;
    images: ImageDocument[];
    contents: ContentDocument[];
    onOpenChange: () => void;
    onChangeData?: (blogData: BlogArticleDocument) => void;
    toggleEditing: () => void;
  } & (
      | {
        isEditing: false;
      }
      | { isEditing: true; data: BlogArticleDocument }
    )
) {
  const {
    open,
    onOpenChange,
    isEditing,
    onChangeData,
    toggleEditing,
    images,
    contents
  } = props;

  const { toast } = useToast();

  const [currIndex, setCurrIndex] = useState<0 | 1>(0);
  const [expandPreview, setExpandPreview] = useState<boolean>(false);
  const [blogData, setBlogData] = useState<BlogArticleDocument>(
    isEditing ? props.data : DEFAULT_ADMIN_BLOG_ARTICLE_DATA
  );
  const [preventUpdates, setPreventUpdates] = useState<boolean>(false);

  // REDUX ===========================================================
  const { options: authorOptions } = useSelector(selectBlogAuthor.documentList);
  const { options: tagOptions } = useSelector(selectBlogTag.documentList);
  const { options: categoryOptions } = useSelector(
    selectBlogCategory.documentList
  );

  const dispatch = useDispatch();

  const [selectedCategories, setSelectedCategories] = useState<SelectOption[]>(
    []
  );
  const [selectedTags, setSelectedTags] = useState<SelectOption[]>([
    { label: 'Tag1', value: '6852c1b4ed901034de3dfe38' }
  ]);
  const [selectedAuthor, setSelectedAuthor] = useState<SelectOption>({
    label: 'Floriwish',
    value: '6852c390ed901034de3dfe3a'
  });

  // SLIDE NAVIGATIONS ===========================================================
  const navigation = {
    next: () => {
      if (currIndex === 0) setCurrIndex((prev) => 1);
      else if (currIndex === 1) {
        if (blogData) {
          if (isEditing) submitBlogArticleForm("update");
          else submitBlogArticleForm("submit");
        }
        onOpenChange();
        doCleanup();
      }
    },
    prev: () => {
      if (currIndex === 1) setCurrIndex((prev) => 0);
      else if (currIndex === 0) {
        doCleanup();
        onOpenChange();
      }
    }
  };

  // HEADING ===========================================================
  const changeHeading = (newHeading: string) => {
    setBlogData(
      (prev) => ({ ...prev, heading: newHeading }) as BlogArticleDocument
    );
  };

  // LAYOUTS ==============================================================
  const updateLayouts = (updatedLayouts: BlogArticleDocument["layouts"]) => {
    setBlogData(
      (prev) => ({ ...prev, layouts: updatedLayouts }) as BlogArticleDocument
    );
  };

  // OTHER BLOG DETAILS ==============================================================
  const updateSlug = (newSlug: string) => {
    const slugStr = toSlug(newSlug);
    setBlogData((prev) => ({ ...prev, slug: slugStr }) as BlogArticleDocument);
  };

  useEffect(() => {
    if (
      !isEditing ||
      (isEditing && toSlug(props.data.heading) === props.data.slug)
    )
      updateSlug(blogData.heading);

    setBlogData(
      (prev) =>
        ({
          ...prev,
          meta: { ...prev.meta, title: blogData.heading } as SEOMetaDocument
        }) as BlogArticleDocument
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogData.heading]);

  const updateTags = (newTags: SelectOption[]) => {
    if (!preventUpdates) setSelectedTags((prev) => newTags);
  };

  const updateSEO = (newSEO: SEOMetaDocument) => {
    setBlogData((prev) => ({ ...prev, meta: newSEO }) as BlogArticleDocument);
  };

  const updateCategories = (newCategories: SelectOption[]) => {
    if (!preventUpdates) setSelectedCategories((prev) => newCategories);
  };

  const updateAuthor = (newAuthor: SelectOption) => {
    setSelectedAuthor((prev) => newAuthor);
  };

  const isFormValid = (): boolean => !(selectedAuthor === undefined);

  const doCleanup = () => {
    setBlogData((prev) => DEFAULT_ADMIN_BLOG_ARTICLE_DATA);
    // setSelectedAuthor((prev) => undefined);
    setSelectedCategories((prev) => []);
    setSelectedTags((prev) => []);
    setCurrIndex((prev) => 0);
    setPreventUpdates((prev) => false);
  };

  // ----------------------------------------------------------------------------------------
  const submitBlogArticleForm = (type: "submit" | "update") => {
    if (!isFormValid()) {
      toast({
        title: "Incomplete Fields",
        description: "Fill out all fields first",
        variant: "destructive"
      });
      return;
    }

    let blogLayouts: BlogLayoutItemDocument[] = blogData.layouts;
    blogLayouts = blogLayouts.map((layout) => {
      const obj = layout;
      if (obj._id && (obj._id as string).length !== 24) delete obj._id;
      if (obj.type === "faq" && obj.layout.faq) {
        const faqs: QADocument[] = obj.layout.faq.map(
          ({ question, answer, _id }) =>
            !_id || (_id as string).length !== 24
              ? ({
                question,
                answer
              } as QADocument)
              : ({
                question,
                answer,
                _id: _id as string
              } as QADocument)
        );

        obj.layout = { faq: faqs } as BlogLayoutDocument;
      }
      return obj;
    });

    const entireBlogData: BlogArticleDocument = {
      ...blogData,
      slug: blogData.slug,
      author: selectedAuthor!.value,
      categories: selectedCategories
        .filter((x) => x !== undefined)
        .map(({ value }) => value),
      tags: selectedTags
        .filter((x) => x !== undefined)
        .map(({ value }) => value),
      name: blogData.heading,
      layouts: blogLayouts,
      createdBy: "Tester",
      updatedBy: "Tester"
    } as BlogArticleDocument;

    if (type === "submit") {
      dispatch(
        createBlogArticleAction.addDocuments({
          newDocuments: entireBlogData
        })
      );
      toast({ title: "Blog Created", variant: "success" });
    } else {
      dispatch(
        createBlogArticleAction.updateDocument({
          documentId: (isEditing ? props.data._id : "") as string,
          updateData: entireBlogData
        })
      );
      toast({ title: "Blog Updated", variant: "success" });
    }

    doCleanup();
  };

  // ----------------------------------------------------------------------------------------

  useEffect(() => {
    if (onChangeData && blogData) onChangeData(blogData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogData]);

  useEffect(() => {
    if (currIndex == 1 && expandPreview) setExpandPreview((prev) => false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currIndex]);

  useEffect(() => {
    if (isEditing) {
      setPreventUpdates((prev) => true);

      const thisAuthor: SelectOption = authorOptions.find(
        ({ value }) => value === props.data.author
      ) as SelectOption;
      const thisCategories: SelectOption[] = props.data.categories.map(
        (val) =>
          categoryOptions.find(({ value }) => value === val) as SelectOption
      );
      const thisTags: SelectOption[] = props.data.tags.map(
        (val) => tagOptions.find(({ value }) => value === val) as SelectOption
      );

      setBlogData((prev) => props.data);
      if (thisAuthor) setSelectedAuthor((prev) => thisAuthor);
      if (thisCategories.length)
        setSelectedCategories((prev) => thisCategories);
      if (thisTags.length) setSelectedTags((prev) => thisTags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  useEffect(() => {
    if (!open) {
      toggleEditing();
      doCleanup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (preventUpdates)
      setTimeout(() => setPreventUpdates((prev) => false), 1000);
  }, [preventUpdates]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="bg-ivory-1 outline-none border-none p-0 rounded-2xl overflow-hidden w-device h-device max-sm:max-w-device max-[1100px]:max-w-[90dvw] max-w-[1100px] sm:max-h-[90dvh]">
        <div className="flex max-sm:flex-col items-stretch justify-stretch *:transition-all *:duration-300 relative *:overflow-hidden">
          <AdminBlogArticleController
            currIndex={currIndex}
            heading={blogData?.heading}
            setHeading={changeHeading}
            allLayouts={blogData.layouts}
            onLayoutChange={updateLayouts}
            expandPreview={expandPreview}
            images={images}
            contents={contents}
            isEditing={isEditing}
            toggleExpandPreview={() => setExpandPreview((prev) => !prev)}
          />
          <AdminBlogChangePreview
            data={blogData?.layouts}
            images={images}
            contents={contents}
            title={blogData.heading}
            expandPreview={expandPreview}
            currIndex={currIndex}
          />
          <AdminBlogSmallDetails
            currIndex={currIndex}
            author={selectedAuthor}
            updateAuthor={updateAuthor}
            allAuthors={authorOptions}
            categories={selectedCategories}
            updateCategories={updateCategories}
            allCategories={categoryOptions}
            seo={blogData.meta}
            updateSEO={updateSEO}
            tags={selectedTags}
            updateTags={updateTags}
            allTags={tagOptions}
            slug={blogData.slug}
            updateSlug={updateSlug}
          />

          {/* next and prev buttons ------------------------- */}
          <div className="absolute bottom-3 right-3 flex items-center justify-end gap-3 w-[335px] *:h-[42px] *:grid *:place-items-center *:rounded-full *:py-2 *:text-center *:transition-all *:duration-300 *:cursor-pointer">
            <div
              className={`bg-ivory-1 border border-charcoal-3/40 ${currIndex === 0 ? "w-[130px]" : "h-[42px] w-[42px]"}`}
              onClick={navigation.prev}
            >
              {currIndex === 0 ? (
                "Close"
              ) : (
                <ArrowLeft
                  strokeWidth={1.5}
                  width={20}
                  height={20}
                />
              )}
            </div>
            <div
              className={`text-white ${currIndex === 0 ? "bg-charcoal w-[130px]" : "bg-teal-500 w-[calc(335px_-_54px)]"}`}
              onClick={navigation.next}
            >
              {currIndex === 0 ? "Next" : "Save"}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
