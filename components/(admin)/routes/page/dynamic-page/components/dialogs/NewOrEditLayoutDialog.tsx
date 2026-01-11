
import { SetStateType } from "@/common/types/reactTypes";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { HomepageLayoutType } from "../../../homepage/HomepageManagement";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import NewLayoutSlide from "./components/NewLayoutSlide";
import EditLayoutSlide from "./components/EditLayoutSlide";
import { generateRandomId } from "@/components/(admin)/Images/static/data";
import { PageLayoutDocument } from "@/common/types/documentation/nestedDocuments/pageLayout";
import { isSufficientDataFilled } from "./utils/isSufficientDataFilled";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { HomepageLayoutStructure } from "@/components/pages/(frontend)/Home/static/types";

export type LayoutEditPageType = "choose-layout" | "layout-data-form";
type LayoutEditsDialogType = {
  open: boolean;
  setOpen: SetStateType<boolean>;
  totalCurrSlides: number;
  allImages: ImageDocument[];
  allContents: ContentDocument[];
} & (
  | {
      isNewLayout: true;
      onConfirmLayoutAddition: (newLayoutData: HomepageLayoutType) => void;
    }
  | {
      isNewLayout: false;
      initialData: HomepageLayoutType;
      onConfirmLayoutEdits: (updatedLayoutData: HomepageLayoutType) => void;
    }
);

export default function NewOrEditLayoutDialog(props: LayoutEditsDialogType) {
  const {
    open,
    setOpen,
    isNewLayout,
    totalCurrSlides,
    allContents,
    allImages
  } = props;
  const { toast } = useToast();

  const [currSlide, setCurrSlide] = useState<LayoutEditPageType>(
    isNewLayout ? "choose-layout" : "layout-data-form"
  );
  const [layout, setLayout] = useState<HomepageLayoutType>();
  const [allowSave, setAllowSave] = useState<boolean>(false);

  const navigation = {
    goBack: () => {
      if (currSlide === "choose-layout") {
        setOpen((prev) => false);
        setLayout((prev) => undefined);
        setCurrSlide((prev) => "choose-layout");
      } else {
        if (isNewLayout) {
          setCurrSlide((prev) => "choose-layout");
        } else {
          setOpen((prev) => false);
          setLayout((prev) => undefined);
        }
      }
    },

    goNext: () => {
      if (currSlide === "layout-data-form") {
        // save data
        if (isNewLayout && layout) props.onConfirmLayoutAddition(layout);
        if (!isNewLayout && layout) props.onConfirmLayoutEdits(layout);

        setOpen((prev) => false);

        toast({
          variant: "success",
          title: isNewLayout ? "Layout Data Added" : "Layout Modified"
        });
        setLayout((prev) => undefined);
        setCurrSlide((prev) => "choose-layout");
      } else setCurrSlide((prev) => "layout-data-form");
    }
  };

  // FIRST SLIDE HANDLERS ==============================================================
  const handleLayoutSelection = (
    newLayoutType: HomepageLayoutType["tag"] | undefined
  ) => {
    if (newLayoutType === undefined) setLayout((prev) => undefined);
    else {
      setLayout((prev) =>
        newLayoutType === "title"
          ? {
              _id: generateRandomId(20),
              tag: "title",
              order: prev ? prev.order : totalCurrSlides + 1,
              type: "title",
              data: "",
              layout: {} as PageLayoutDocument
            }
          : {
              _id: generateRandomId(20),
              tag: newLayoutType,
              order: prev ? prev.order : totalCurrSlides + 1,
              type: "component",
              layout: {} as PageLayoutDocument
            }
      );
    }
  };

  const handleOrderSelection = (selectedIndex: number) => {
    setLayout((prev) =>
      prev === undefined ? prev : { ...prev, order: selectedIndex }
    );
  };

  // SECOND SLIDE HANDLERS ==============================================================

  useEffect(() => {
    if (isNewLayout) {
      setCurrSlide((prev) => "choose-layout");
      setLayout((prev) => undefined);
    } else {
      setCurrSlide((prev) => "layout-data-form");
      setLayout((prev) => props.initialData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewLayout]);

  useEffect(() => {
    if (isSufficientDataFilled(layout)) setAllowSave((prev) => true);
    else setAllowSave((prev) => false);
  }, [layout]);

  useEffect(() => {
    if (!open) {
      setCurrSlide((prev) => "choose-layout");
      setLayout((prev) => undefined);
      setAllowSave((prev) => false);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="rounded-3xl p-0 outline-none border-none min-w-fit min-h-fit overflow-hidden">
        <div className="flex items-stretch justify-start relative overflow-hidden scrollbar-hide bg-ash-1 min-w-[80dvw] max-w-[1000px] h-[95dvh]">
          <NewLayoutSlide
            currSlide={currSlide}
            selectedLayout={isNewLayout && layout ? layout.tag : undefined}
            onChangeSelectedLayout={handleLayoutSelection}
            onSelectIndex={handleOrderSelection}
            totalLayouts={totalCurrSlides}
            currOrder={layout ? layout.order : 0}
          />
          <EditLayoutSlide
            currSlide={currSlide}
            layout={layout}
            setLayout={setLayout}
            allContents={allContents}
            allImages={allImages}
          />

          <NavigationButtons
            currSlide={currSlide}
            isNewLayout={isNewLayout}
            navigation={navigation}
            allowSave={allowSave}
            layout={layout}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

const NavigationButtons = ({
  currSlide,
  isNewLayout,
  navigation,
  allowSave,
  layout
}: {
  currSlide: LayoutEditPageType;
  isNewLayout: boolean;
  navigation: {
    goBack: () => void;
    goNext: () => void;
  };
  allowSave: boolean;
  layout: HomepageLayoutStructure | undefined;
}) => (
  <div className="absolute bottom-2 right-2 flex items-center justify-end gap-2.5 w-fit h-fit">
    <div
      onClick={navigation.goBack}
      className="rounded-full py-2.5 px-6 cursor-pointer transition-all duration-300 border border-charcoal-3/65 bg-ivory-1 min-w-32 text-center hover:bg-ivory-2"
    >
      {currSlide === "choose-layout" ? "Close" : isNewLayout ? "Back" : "Close"}
    </div>
    <div
      onClick={
        (currSlide === "layout-data-form" && !allowSave) ||
        (currSlide === "choose-layout" && layout === undefined)
          ? () => {}
          : navigation.goNext
      }
      className={`rounded-full py-2.5 px-6 ${(currSlide === "layout-data-form" && !allowSave) || (currSlide === "choose-layout" && layout === undefined) ? "cursor-default bg-teal-600 hover:border-teal-600 " : "cursor-pointer hover:bg-teal-700 border-teal-600 bg-teal-600"} transition-all duration-300 border text-white min-w-32 text-center`}
    >
      {currSlide === "choose-layout"
        ? "Next"
        : isNewLayout
          ? "Save Layout"
          : "Save Edits"}
    </div>
  </div>
);
