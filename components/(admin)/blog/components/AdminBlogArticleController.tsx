import {
  ArrowBigDown,
  ArrowBigUp,
  ArrowLeft,
  Boxes,
  CircleHelp,
  Eye,
  Images,
  SquarePlay,
  Trash,
  Type
} from "lucide-react";
import AdminBlogTitle from "./articleComponents/AdminBlogTitle";
import { useEffect, useState } from "react";
import { BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import AdminBlogText from "./articleComponents/AdminBlogText";
import AdminBlogImages from "./articleComponents/AdminBlogImages";
import AdminBlogVideo from "./articleComponents/AdminBlogVideo";
import AdminBlogFAQ from "./articleComponents/AdminBlogFAQ";
import { Children } from "@/common/types/reactTypes";
import { BlogLayoutItemDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutItem";
import { BlogLayoutDocument } from "@/common/types/documentation/nestedDocuments/blogLayout";
import AdminBlogContent from "./articleComponents/AdminBlogContent";
import { BlogLayoutImageDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutImage";
import { QADocument } from "@/common/types/documentation/nestedDocuments/qa";
import { generateRandomId } from "../../Images/static/data";
import { ImageDocument } from "@/common/types/documentation/media/image";
import AdminBlogImage from "./articleComponents/AdminBlogImage";
import { ContentDocument } from "@/common/types/documentation/contents/content";

export default function AdminBlogArticleController({
  currIndex,
  allLayouts,
  heading,
  expandPreview,
  images,
  contents,
  isEditing,
  setHeading,
  onLayoutChange,
  toggleExpandPreview
}: {
  currIndex: 0 | 1;
  allLayouts?: BlogArticleDocument["layouts"];
  heading: string;
  expandPreview: boolean;
  images: ImageDocument[];
  contents: ContentDocument[];
  isEditing: boolean;
  setHeading: (newHeading: string) => void;
  onLayoutChange: (updatedLayouts: BlogArticleDocument["layouts"]) => void;
  toggleExpandPreview: () => void;
}) {
  const [layouts, setLayouts] = useState<BlogArticleDocument["layouts"]>(
    allLayouts || []
  );
  const [totalLayouts, setTotalLayouts] = useState<number>(
    allLayouts ? allLayouts.length : 0
  );
  const [isShifting, setIsShifting] = useState<boolean>(false);

  const addLayout = (newLayoutType: BlogLayoutItemDocument["type"]) => {
    const layoutData: BlogLayoutDocument = {
      ...(newLayoutType === "text"
        ? { text: "" }
        : newLayoutType === "video"
          ? { video: "" }
          : newLayoutType === "image"
            ? { image: { style: "", images: [], shape: "square" } }
            : newLayoutType === "faq"
              ? { faq: [] }
              : { content: [] })
    } as BlogLayoutDocument;

    const newData: BlogLayoutItemDocument = {
      order: totalLayouts,
      type: newLayoutType,
      layout: layoutData,
      _id: generateRandomId(16)
    } as BlogLayoutItemDocument;

    setLayouts((prev) =>
      [...prev, newData].slice().sort((a, b) => a.order - b.order)
    );
    setTotalLayouts((prev) => prev + 1);
  };

  const handleMoveUp = (currOrder: number, id: string) => {
    if (currOrder === 0) return;

    const complementaryLayout = layouts.find(
      ({ order }) => order === currOrder - 1
    );

    if (complementaryLayout) {
      setLayouts((prev) =>
        prev
          .map((layout) =>
            (layout._id as string) === id ||
            (complementaryLayout._id as string) === (layout._id as string)
              ? ({
                  ...layout,
                  order:
                    (layout._id as string) === id ? currOrder - 1 : currOrder
                } as BlogLayoutItemDocument)
              : layout
          )
          .slice()
          .sort((a, b) => a.order - b.order)
      );
      setIsShifting((prev) => true);
    }
  };

  const handleMoveDown = (currOrder: number, id: string) => {
    if (currOrder === totalLayouts - 1) return;

    const complementaryLayout = layouts.find(
      ({ order }) => order === currOrder + 1
    );

    if (complementaryLayout) {
      setLayouts((prev) =>
        prev
          .map((layout) =>
            (layout._id as string) === id ||
            (complementaryLayout._id as string) === (layout._id as string)
              ? ({
                  ...layout,
                  order:
                    (layout._id as string) === id ? currOrder + 1 : currOrder
                } as BlogLayoutItemDocument)
              : layout
          )
          .slice()
          .sort((a, b) => a.order - b.order)
      );
      setIsShifting((prev) => true);
    }
  };

  const handleDisable = () => {};

  const handleDelete = (id: string) => {
    setLayouts((prev) =>
      prev
        .filter(({ _id }) => (_id as string) !== (id as string))
        .slice()
        .sort((a, b) => a.order - b.order)
    );
    setIsShifting((prev) => true);
    updateOrders(id);
  };

  // VIDEO URL ================================
  const updateVideoURL = (updatedURL: string, order: number) => {
    const targetLayout = layouts.find(({ order: ord }) => order === ord);

    if (targetLayout) {
      setLayouts((prev) =>
        prev.map((layout) =>
          layout.order === order
            ? ({
                ...layout,
                layout: { video: updatedURL }
              } as BlogLayoutItemDocument)
            : layout
        )
      );
    }
  };

  const updateText = (updatedText: string, id: string) => {
    if (updatedText.length === 0 && isShifting) return;

    const targetLayout = layouts.find(({ _id }) => id === (_id as string));

    if (targetLayout) {
      setLayouts((prev) =>
        prev.map((layout) =>
          (layout._id as string) === id
            ? ({
                ...layout,
                layout: { text: updatedText }
              } as BlogLayoutItemDocument)
            : layout
        )
      );
    }
  };

  const updateImages = (
    updatedImageDoc: BlogLayoutImageDocument,
    order: number
  ) => {
    if (isShifting && updatedImageDoc.images?.length === 0) return;

    const targetLayout = layouts.find(({ order: ord }) => order === ord);

    if (targetLayout) {
      setLayouts((prev) =>
        prev.map((layout) =>
          layout.order === order
            ? ({
                ...layout,
                layout: { image: updatedImageDoc }
              } as BlogLayoutItemDocument)
            : layout
        )
      );
    }
  };

  const updateFAQs = (updatedFaqs: QADocument[], order: number) => {
    const targetLayout = layouts.find(({ order: ord }) => order === ord);

    if (targetLayout) {
      setLayouts((prev) =>
        prev.map((layout) =>
          layout.order === order
            ? ({
                ...layout,
                layout: { faq: updatedFaqs }
              } as BlogLayoutItemDocument)
            : layout
        )
      );
    }
  };

  const updateContents = (selectedContents: string[], order: number) => {
    setLayouts((prev) =>
      prev.map((layout) =>
        layout.order === order
          ? ({
              ...layout,
              layout: { content: selectedContents }
            } as BlogLayoutItemDocument)
          : layout
      )
    );
  };

  const updateOrders = (omitId: string) => {
    const orderedLayouts: BlogLayoutItemDocument[] = layouts
      .filter(({ _id }) => (_id as string) !== (omitId as string))
      .slice()
      .sort((a, b) => a.order - b.order);
    let currOrder = -1;

    const updatedOrderedLayouts: BlogLayoutItemDocument[] = orderedLayouts.map(
      (orderedLayout) => {
        currOrder += 1;
        return {
          ...orderedLayout,
          order: currOrder
        } as BlogLayoutItemDocument;
      }
    );

    setLayouts((prev) =>
      updatedOrderedLayouts.slice().sort((a, b) => a.order - b.order)
    );
    setTotalLayouts((prev) => updatedOrderedLayouts.length);
  };

  useEffect(() => {
    if (onLayoutChange) {
      onLayoutChange(layouts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layouts]);

  useEffect(() => {
    if (isShifting) setTimeout(() => setIsShifting((prev) => false), 500);
  }, [isShifting]);

  useEffect(() => {
    if (isEditing) setIsShifting((prev) => true);
  }, [isEditing]);

  return (
    <section
      className={`bg-ash/35 border-r border-charcoal-3/30 grid grid-rows-[55px_1fr] ${currIndex === 0 ? (expandPreview ? "max-[1100px]:w-[20dvw] w-[220px] *:px-5 pb-3" : "max-[1100px]:w-[60dvw] w-[660px] *:px-5 pb-3") : "w-0 p-0"} max-h-device sm:max-h-[90dvh]`}
    >
      <div className="border-b border-ash/70 sticky pt-1 top-0 flex items-center justify-between !px-3">
        <div className="flex items-center justify-start gap-2.5 *:cursor-pointer *:transition-all *:duration-300 *:border *:border-transparent *:py-1 *:px-3 *:text-charcoal-3/70 *:rounded-lg *:flex *:items-center">
          {!expandPreview && (
            <>
              <span
                className="hover:bg-ash/40 hover:border-ash/70"
                onClick={() => addLayout("text")}
              >
                Text
              </span>
              <span
                className="hover:bg-ash/40 hover:border-ash/70"
                onClick={() => addLayout("image")}
              >
                Image
              </span>
              <span
                className="hover:bg-ash/40 hover:border-ash/70"
                onClick={() => addLayout("video")}
              >
                Video
              </span>
              <span
                className="hover:bg-ash/40 hover:border-ash/70"
                onClick={() => addLayout("faq")}
              >
                FAQ
              </span>
              <span
                className="hover:bg-ash/40 hover:border-ash/70"
                onClick={() => addLayout("content")}
              >
                Product
              </span>
            </>
          )}
        </div>

        <div
          onClick={toggleExpandPreview}
          className={`cursor-pointer transition-all duration-300 border border-transparent p-2 aspect-square rounded-full flex items-center hover:bg-ash/80`}
        >
          <ArrowLeft
            strokeWidth={1.5}
            width={19}
            height={19}
            className={`transition-all duration-300 ${expandPreview ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>
      <div className="overflow-y-auto scrollbar-hide max-h-[calc(100dvh_-_50px)]  md:max-h-[calc(90dvh_-_50px)] pt-5 pb-32 space-y-4">
        <AdminBlogTitle
          heading={heading}
          setHeading={setHeading}
        />
        {layouts &&
          layouts.map(({ order, type, layout, _id }, index) => {
            return (
              <div key={index}>
                {/* ====[ TEXT ]==================================================== */}
                {type === "text" ? (
                  <BlogConstructWrapper
                    onMoveUp={() => handleMoveUp(order, _id as string)}
                    onDisable={() => handleDisable()}
                    onDelete={() => handleDelete(_id as string)}
                    onMoveDown={() => handleMoveDown(order, _id as string)}
                  >
                    <AdminBlogText
                      text={layout.text || ""}
                      name={`text-${order}`}
                      onChange={(updatedText: string) =>
                        updateText(updatedText, _id as string)
                      }
                    />
                  </BlogConstructWrapper>
                ) : type === "image" ? (
                  /* ====[ IMAGE ]==================================================== */
                  <BlogConstructWrapper
                    onMoveUp={() => handleMoveUp(order, _id as string)}
                    onDisable={() => handleDisable()}
                    onDelete={() => handleDelete(_id as string)}
                    onMoveDown={() => handleMoveDown(order, _id as string)}
                  >
                    <AdminBlogImage
                      data={
                        Array.isArray(layout.image)
                          ? (layout.image[0] as BlogLayoutImageDocument)
                          : (layout.image as BlogLayoutImageDocument)
                      }
                      onEdits={(doc: BlogLayoutImageDocument) =>
                        updateImages(doc, order)
                      }
                      images={images}
                    />
                  </BlogConstructWrapper>
                ) : type === "video" ? (
                  /* ====[ VIDEO ]==================================================== */
                  <BlogConstructWrapper
                    onMoveUp={() => handleMoveUp(order, _id as string)}
                    onDisable={() => handleDisable()}
                    onDelete={() => handleDelete(_id as string)}
                    onMoveDown={() => handleMoveDown(order, _id as string)}
                  >
                    <AdminBlogVideo
                      data={layout}
                      onEdits={(updatedURL: string) =>
                        updateVideoURL(updatedURL, order)
                      }
                    />
                  </BlogConstructWrapper>
                ) : type === "faq" ? (
                  /* ====[ FAQ ]==================================================== */
                  <BlogConstructWrapper
                    onMoveUp={() => handleMoveUp(order, _id as string)}
                    onDisable={() => handleDisable()}
                    onDelete={() => handleDelete(_id as string)}
                    onMoveDown={() => handleMoveDown(order, _id as string)}
                  >
                    <AdminBlogFAQ
                      data={layout.faq as QADocument[]}
                      onEdits={(faqs: QADocument[]) => updateFAQs(faqs, order)}
                    />
                  </BlogConstructWrapper>
                ) : (
                  // ====[ CONTENT ]==========================================
                  <BlogConstructWrapper
                    onMoveUp={() => handleMoveUp(order, _id as string)}
                    onDisable={() => handleDisable()}
                    onDelete={() => handleDelete(_id as string)}
                    onMoveDown={() => handleMoveDown(order, _id as string)}
                  >
                    <AdminBlogContent
                      data={layout}
                      onEdits={(selectedContents: string[]) =>
                        updateContents(selectedContents, order)
                      }
                      allContents={contents}
                      allImages={images}
                    />
                  </BlogConstructWrapper>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
}

const BlogConstructWrapper = ({
  children,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDisable
}: {
  children: Children;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDisable: () => void;
}) => {
  return (
    <div className="relative grid grid-cols-[40px_1fr]">
      <div className="border-r sticky top-0 py-2 bg-ash/50 flex flex-col justify-start items-center gap-2 *:aspect-square *:p-1.5 *:transition-all *:duration-300 *:rounded-full *:cursor-pointer">
        <div
          className="hover:bg-ash/95"
          onClick={onMoveUp}
        >
          <ArrowBigUp
            strokeWidth={1.5}
            width={18}
            height={18}
          />
        </div>

        {/* <div
          className="hover:bg-ash/95"
          onClick={onDisable}
        >
          <Eye
            strokeWidth={1.5}
            width={18}
            height={18}
          />
        </div> */}

        <div
          className="hover:bg-rose-300/45 hover:text-rose-700"
          onClick={onDelete}
        >
          <Trash
            strokeWidth={1.5}
            width={18}
            height={18}
            className="scale-95"
          />
        </div>

        <div
          className="hover:bg-ash/95"
          onClick={onMoveDown}
        >
          <ArrowBigDown
            strokeWidth={1.5}
            width={18}
            height={18}
          />
        </div>
      </div>

      <div className="relative grid">{children}</div>
    </div>
  );
};
