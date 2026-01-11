// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

// utils
import { getInitialCustomizationValue } from "@/components/custom/inputs/contentCustomization/utils/getInitialCustomizationValue";
import { getInitialEdibleValue } from "@/components/custom/inputs/edible/utils/getInitialEdibleValue";
import { getInitialVariantCategoriesValue } from "@/components/custom/inputs/contentVariantCategories/utils/getInitialVariantCategoriesValue";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createAITagAction,
  selectAITag
} from "@/store/features/presets/aiTagSlice";

// components
import AdvancedCheckbox from "@/lib/Forms/Checkbox/AdvancedCheckbox";
import ContentCustomization from "@/components/custom/inputs/contentCustomization/ContentCustomization";
import ContentVariantCategories from "@/components/custom/inputs/contentVariantCategories/ContentVariantCategories";
import { DialogClose, DialogHeader } from "@/components/ui/dialog";
import Edible from "@/components/custom/inputs/edible/Edible";
import Reset from "@/lib/Forms/Submit_Reset/Reset";
import SelectAddon from "@/components/custom/inputs/selectAddon/SelectAddon";
import Submit from "@/lib/Forms/Submit_Reset/Submit";
import { SubmitAndReset } from "@/lib/Forms/layouts/layouts";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentTagDocument } from "@/common/types/documentation/nestedDocuments/contentTag";
import { type FormEvent } from "react";
import { FormTitle, LineSeperator } from "@/components/custom/inputs/title/Form";

export default function ContentCustomizationInfoForm({
  initialDocument,
  onUpdate
}: {
  initialDocument: Partial<ContentDocument>;
  onUpdate: (updatedDocument: Partial<ContentDocument>) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  const aiTagStatus = useSelector(selectAITag.status);

  const { options: aiTagOptions } = useSelector((state) =>
    selectAITag.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // states
  const [document, setDocument] = useState<
    Partial<ContentDocument> | undefined
  >(initialDocument);

  // event handlers
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onUpdate({ ...document });
  };

  // side effect
  useEffect(() => {
    if (initialDocument) {
      setDocument(initialDocument);
    }
  }, [initialDocument]);

  useEffect(() => {
    if (aiTagStatus === "idle") {
      dispatch(createAITagAction.fetchDocumentList());
    }
  }, [aiTagStatus, dispatch]);

  return (
    <>
      <DialogHeader></DialogHeader>
      <FormTitle title="product extra additions" />
      <form
        className="flex flex-col gap-5 w-full px-1"
        onSubmit={handleSubmit}
      >
        {/*  <AdvancedCheckbox
          name="relatedAITags"
          label="Related AI Tags"
          isRequired={false}
          searchPlaceholder="Search AI-Tag"
          options={aiTagOptions}
          selectedValues={(document?.tag?.relatedAITags as string[]) || []}
          onChangeSelectedValues={(relatedAITags) => {
            setDocument(() => ({
              ...document,
              tag: {
                ...document?.tag,
                relatedAITags
              } as ContentTagDocument
            }));
          }}
        />
        <Edible
          name="edible"
          label="Edible"
          value={document?.edible || getInitialEdibleValue()}
          onChangeValue={(edible) => {
            setDocument({
              ...document,
              edible
            });
          }}
        /> */}

        <ContentVariantCategories
          name="variants"
          label="Product Variants"
          contentId={document?._id as string}
          value={document?.variants || getInitialVariantCategoriesValue()}
          onChangeValue={(variants) => {
            setDocument({
              ...document,
              variants
            });
          }}
        />

        <LineSeperator />
        


        <ContentCustomization
          name="customization"
          label="Customizations"
          isEdible={document?.edible?.isEdible}
          value={document?.customization || getInitialCustomizationValue()}
          onChangeValue={(customization) => {
            setDocument({
              ...document,
              customization
            });
          }}
        />

        <LineSeperator />

        <SelectAddon
          name="addons"
          label="Addons"
          value={document?.addons || []}
          onChangeValue={(addons) => {
            setDocument({
              ...document,
              addons
            });
          }}
        />

        <SubmitAndReset position="right">
          <Reset label="Reset" />
          <DialogClose asChild>
            <div className={BUTTON_STYLES.GHOST}>{"Close"}</div>
          </DialogClose>
          <Submit label="Update" />
        </SubmitAndReset>
      </form>
    </>
  );
}
