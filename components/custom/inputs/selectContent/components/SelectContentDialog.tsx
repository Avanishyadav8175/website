// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// icons
import { Boxes, MousePointerClick } from "lucide-react";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createContentAction,
  selectContent
} from "@/store/features/contents/contentSlice";
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";

// components
import Contents from "./Contents";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import SelectContentDialogQuery from "./SelectContentDialogQuery";
import Image from "next/image";

export default function SelectContentDialog(
  props: {
    type: "product" | "service" | "both";
    selectSingle?: boolean;
    excludes?: string[];
    selectedContentIds: string[];
    onChangeSelectedContentIds: (newSelectedContentIds: string[]) => void;
  } & (
    | {
        icon?: false;
      }
    | {
        icon: true;
        onFinish: (newSelectedContentIds: string[]) => void;
      }
  )
) {
  // props
  const {
    type,
    selectSingle,
    excludes,
    icon,
    selectedContentIds,
    onChangeSelectedContentIds
  } = props;

  // hooks
  const dispatch = useDispatch();

  // states
  const [typeFilter, setTypeFilter] = useState<"" | "product" | "service">("");

  const [filter, setFilter] = useState<"" | "selected" | "not-selected">("");

  const [activationFilter, setActivationFilter] = useState<
    "" | "active" | "inactive"
  >("active");

  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // redux
  const contentStatus = useSelector(selectContent.status);

  const { documents: contents } = useSelector((state) =>
    selectContent.documentList(state, {
      ...(activationFilter
        ? activationFilter === "active"
          ? { active: true }
          : { active: false }
        : {}),
      ...(type !== "both"
        ? {
            defaultFilterBy: "type",
            defaultFilterKeyword: type as string
          }
        : {}),
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const imageStatus = useSelector(selectImage.status);

  const { documents: images } = useSelector(selectImage.documentList);

  // variables
  const filteredContents = (
    excludes && excludes.length
      ? contents.filter(({ _id }) => !excludes.includes(_id as string))
      : contents
  )
    .filter(({ type }) => {
      if (typeFilter) {
        if (typeFilter === "product") {
          return type === "product";
        } else if (typeFilter === "service") {
          return type === "service";
        }
      } else {
        return true;
      }
    })
    .filter(({ _id }) => {
      if (filter) {
        if (filter === "selected") {
          return selectedContentIds.includes(_id as string);
        } else if (filter === "not-selected") {
          return !selectedContentIds.includes(_id as string);
        }
      } else {
        return true;
      }
    })
    .filter(({ category }) => {
      if (categoryFilter) {
        return category.primary === categoryFilter;
      } else {
        return true;
      }
    })
    .filter(({ name }) => {
      if (searchKeyword) {
        return name.toLowerCase().includes(searchKeyword.toLowerCase());
      } else {
        return true;
      }
    });

  const isAllSelected =
    Boolean(filteredContents.length) &&
    filteredContents.length ===
      filteredContents.filter((content) =>
        selectedContentIds.includes(content._id as string)
      ).length;

  const selectedContent =
    selectSingle && selectedContentIds.length
      ? contents.find(({ _id }) => _id === selectedContentIds[0])
      : undefined;

  const selectedContentPrimaryImage = selectedContent
    ? images.find(({ _id }) => _id === selectedContent.media.primary)
    : undefined;

  // handlers
  const handleCheckIsSelected = (contentId: string) =>
    selectedContentIds.includes(contentId);

  const handleToggleSelect = (contentId: string) => {
    if (selectedContentIds.includes(contentId)) {
      onChangeSelectedContentIds(
        [...selectedContentIds].filter((content) => content !== contentId)
      );
    } else {
      if (selectSingle) {
        onChangeSelectedContentIds([contentId]);
      } else {
        onChangeSelectedContentIds([...selectedContentIds, contentId]);
      }
    }
  };

  const handleSelectAll = () => {
    const contentsToBeAdded = filteredContents.filter(
      ({ _id }) => !selectedContentIds.includes(_id as string)
    );

    onChangeSelectedContentIds([
      ...selectedContentIds,
      ...contentsToBeAdded.map(({ _id }) => _id as string)
    ]);
  };

  const handleDeselectAll = () => {
    onChangeSelectedContentIds(
      selectedContentIds.filter(
        (content) => !filteredContents.find(({ _id }) => _id === content)
      )
    );
  };

  const handleResetQuery = () => {
    setFilter("");
    setActivationFilter("");
    setCategoryFilter("");
    setSearchKeyword("");
  };

  // effects
  useEffect(() => {
    if (contentStatus === "idle") {
      dispatch(createContentAction.fetchDocumentList());
    }
  }, [contentStatus, dispatch]);

  useEffect(() => {
    if (imageStatus === "idle") {
      dispatch(createImageAction.fetchDocumentList());
    }
  }, [imageStatus, dispatch]);

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="w-fit"
      >
        {selectSingle ? (
          selectedContentIds.length ? (
            <div
              className={`relative rounded-xl border border-charcoal-3/50 flex items-center justify-center aspect-square cursor-pointer`}
            >
              <Image
                src={selectedContentPrimaryImage?.url as string}
                alt={
                  (selectedContentPrimaryImage?.alt as string) ||
                  (selectedContentPrimaryImage?.defaultAlt as string) ||
                  "Product Image"
                }
                unoptimized={!OPTIMIZE_IMAGE}
                decoding="async"
                draggable={false}
                height={100}
                width={100}
                className="w-full h-full object-cover object-center rounded-xl"
              />
            </div>
          ) : (
            <div
              className={`flex items-center justify-center flex-col gap-2 relative top-1/2 -translate-y-1/2 px-5 w-full aspect-square border-[3px] border-dashed border-charcoal-3/30 text-center text-charcoal-3/50 rounded-xl overflow-hidden cursor-pointer`}
            >
              <MousePointerClick
                strokeWidth={1.5}
                width={36}
                height={36}
              />
              <span>Select</span>
            </div>
          )
        ) : icon ? (
          <div
            className="flex flex-col items-center cursor-pointer"
            title="products"
          >
            <Boxes
              strokeWidth={1.5}
              width={20}
            />
            <span className="text-xs">{selectedContentIds.length}</span>
          </div>
        ) : (
          <div className="bg-black text-white py-2 px-6 text-[14px] flex items-center justify-end gap-1 rounded-lg cursor-pointer">
            {`+ Select ${type === "both" ? "Products" : type === "product" ? "Product" : "Service"}`}
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-fit ">
        <DialogTitle>
          <section className="w-full">
            <div className="capitalize">{`Select ${type === "both" ? "Products" : type === "product" ? "Products" : "Services"}`}</div>
          </section>
        </DialogTitle>
        <div className="px-1 pt-5 min-w-[90dvw]">
          <SelectContentDialogQuery
            type={type}
            selectSingle={selectSingle}
            isAllSelected={isAllSelected}
            typeFilter={typeFilter}
            filter={filter}
            activationFilter={activationFilter}
            categoryFilter={categoryFilter}
            searchKeyword={searchKeyword}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onChangeTypeFilter={setTypeFilter}
            onChangeFilter={setFilter}
            onChangeActivationFilter={setActivationFilter}
            onChangeCategoryFilter={setCategoryFilter}
            onChangeSearchKeyword={setSearchKeyword}
            onResetQuery={handleResetQuery}
          />
          <Contents
            type={type}
            contents={filteredContents}
            checkIsSelected={handleCheckIsSelected}
            onToggleSelect={handleToggleSelect}
          />
          <DialogClose className="flex items-center justify-end w-full pt-5">
            <div
              className="min-w-24 px-4 py-2 bg-blue-800 text-white rounded-lg"
              onClick={
                icon
                  ? () => {
                      props.onFinish(selectedContentIds);
                    }
                  : undefined
              }
            >
              {"Done"}
            </div>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
