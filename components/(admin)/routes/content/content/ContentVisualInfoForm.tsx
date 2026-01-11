// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

// utils
import { getInitialQualityValue } from "@/components/custom/inputs/contentQuality/utils/getInitialQualityValue";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createAITagAction,
  selectAITag
} from "@/store/features/presets/aiTagSlice";
import {
  createBrandAction,
  selectBrand
} from "@/store/features/presets/brandSlice";
import {
  createCareInfoAction,
  selectCareInfo
} from "@/store/features/presets/careInfoSlice";
import {
  createCancellationPolicyAction,
  selectCancellationPolicy
} from "@/store/features/presets/cancellationPolicySlice";
import {
  createContentAction,
  selectContent
} from "@/store/features/contents/contentSlice";
import {
  createColorAction,
  selectColor
} from "@/store/features/presets/colorSlice";
import {
  createDeliveryDetailAction,
  selectDeliveryDetail
} from "@/store/features/presets/deliveryDetailSlice";
import {
  createFAQGroupAction,
  selectFAQGroup
} from "@/store/features/presets/faqGroupSlice";
import {
  createOccasionAction,
  selectOccasion
} from "@/store/features/presets/occasionSlice";
import {
  createPromotionTagAction,
  selectPromotionTag
} from "@/store/features/presets/promotionTagSlice";
import {
  createRelationAction,
  selectRelation
} from "@/store/features/presets/relationSlice";
import {
  createSearchTagAction,
  selectSearchTag
} from "@/store/features/presets/searchTagSlice";

// components
import AdvancedCheckbox from "@/lib/Forms/Checkbox/AdvancedCheckbox";
import ContentQuality from "@/components/custom/inputs/contentQuality/ContentQuality";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Input from "@/lib/Forms/Input/Input";
import Reset from "@/lib/Forms/Submit_Reset/Reset";
import SEOMeta from "@/components/custom/inputs/seoMeta/SEOMeta";
import Submit from "@/lib/Forms/Submit_Reset/Submit";
import { SubmitAndReset } from "@/lib/Forms/layouts/layouts";
import Textarea from "@/lib/Forms/Textarea/Textarea";
import Toggle from "@/lib/Forms/Toggle/Toggle";

// types
import { type AdvanceSelectOption } from "@/common/types/inputs";
import { type ColorDocument } from "@/common/types/documentation/presets/color";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentDetailDocument } from "@/common/types/documentation/nestedDocuments/contentDetail";
import { type ContentTagDocument } from "@/common/types/documentation/nestedDocuments/contentTag";
import { type FormEvent } from "react";
import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";
import { FormSubTitle, FormTitle, LineSeperator } from "@/components/custom/inputs/title/Form";
import { MONGO_COMPANY_BRAND_ID } from "@/common/constants/values";

export default function ContentVisualInfoForm({
  initialDocument,
  onUpdate
}: {
  initialDocument: Partial<ContentDocument>;
  onUpdate: (updatedDocument: Partial<ContentDocument>) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const brandStatus = useSelector(selectBrand.status);

  const { options: brandOptions } = useSelector((state) =>
    selectBrand.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const deliveryDetailStatus = useSelector(selectDeliveryDetail.status);

  const { options: deliveryDetailOptions } = useSelector((state) =>
    selectDeliveryDetail.documentList(state, {
      active: true,
      sortBy: "label",
      orderBy: "asc"
    })
  );

  const careInfoStatus = useSelector(selectCareInfo.status);

  const { options: careInfoOptions } = useSelector((state) =>
    selectCareInfo.documentList(state, {
      active: true,
      sortBy: "label",
      orderBy: "asc"
    })
  );

  const cancellationPolicyStatus = useSelector(selectCancellationPolicy.status);

  const { options: cancellationPolicyOptions } = useSelector((state) =>
    selectCancellationPolicy.documentList(state, {
      active: true,
      sortBy: "label",
      orderBy: "asc"
    })
  );

  const faqGroupStatus = useSelector(selectFAQGroup.status);

  const { options: faqGroupOptions } = useSelector((state) =>
    selectFAQGroup.documentList(state, {
      active: true,
      sortBy: "label",
      orderBy: "asc"
    })
  );

  const colorStatus = useSelector(selectColor.status);

  const { documents: colors, options: colorOptions } = useSelector((state) =>
    selectColor.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const occasionStatus = useSelector(selectOccasion.status);

  const { options: occasionOptions } = useSelector((state) =>
    selectOccasion.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const relationStatus = useSelector(selectRelation.status);

  const { options: relationOptions } = useSelector((state) =>
    selectRelation.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const aiTagStatus = useSelector(selectAITag.status);

  const { options: aiTagOptions } = useSelector((state) =>
    selectAITag.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const promotionTagStatus = useSelector(selectPromotionTag.status);

  const { options: promotionTagOptions } = useSelector((state) =>
    selectPromotionTag.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const searchTagStatus = useSelector(selectSearchTag.status);

  const { options: searchTagOptions } = useSelector((state) =>
    selectSearchTag.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // variables
  const advanceColorOptions = colorOptions.map(
    ({ label, value }) =>
      ({
        label,
        labelElement: (
          <span className="flex items-center justify-center gap-2">
            <div
              className="w-4 aspect-square -ml-1.5 rounded-full"
              style={{
                backgroundColor: (
                  colors.find(({ _id }) => _id === value) as ColorDocument
                ).hexCode
              }}
            ></div>
            <span>{label}</span>
          </span>
        ),
        value
      }) as AdvanceSelectOption
  );

  // states
  const [document, setDocument] = useState<
    Partial<ContentDocument> | undefined
  >(initialDocument);

  const [includeQuality, setIncludeQuality] = useState<boolean>(
    Boolean(
      document?.quality?.rating?.count || document?.quality?.review?.count
    )
  );

  // variables
  const filled = Boolean(
    initialDocument?.brand &&
    initialDocument?.detail &&
    initialDocument?.seoMeta
  );

  // event handlers
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onUpdate({ ...document, brand: MONGO_COMPANY_BRAND_ID });
  };

  // side effects
  useEffect(() => {
    if (initialDocument) {
      setDocument(initialDocument);
      setIncludeQuality(
        Boolean(
          initialDocument?.quality?.rating?.count ||
          initialDocument?.quality?.review?.count
        )
      );
    }
  }, [initialDocument]);

  useEffect(() => {
    if (brandStatus === "idle") {
      dispatch(createBrandAction.fetchDocumentList());
    }
  }, [brandStatus, dispatch]);

  useEffect(() => {
    if (deliveryDetailStatus === "idle") {
      dispatch(createDeliveryDetailAction.fetchDocumentList());
    }
  }, [deliveryDetailStatus, dispatch]);

  useEffect(() => {
    if (careInfoStatus === "idle") {
      dispatch(createCareInfoAction.fetchDocumentList());
    }
  }, [careInfoStatus, dispatch]);

  useEffect(() => {
    if (cancellationPolicyStatus === "idle") {
      dispatch(createCancellationPolicyAction.fetchDocumentList());
    }
  }, [cancellationPolicyStatus, dispatch]);

  useEffect(() => {
    if (faqGroupStatus === "idle") {
      dispatch(createFAQGroupAction.fetchDocumentList());
    }
  }, [faqGroupStatus, dispatch]);

  useEffect(() => {
    if (colorStatus === "idle") {
      dispatch(createColorAction.fetchDocumentList());
    }
  }, [colorStatus, dispatch]);

  useEffect(() => {
    if (occasionStatus === "idle") {
      dispatch(createOccasionAction.fetchDocumentList());
    }
  }, [occasionStatus, dispatch]);

  useEffect(() => {
    if (relationStatus === "idle") {
      dispatch(createRelationAction.fetchDocumentList());
    }
  }, [relationStatus, dispatch]);

  useEffect(() => {
    if (aiTagStatus === "idle") {
      dispatch(createAITagAction.fetchDocumentList());
    }
  }, [aiTagStatus, dispatch]);

  useEffect(() => {
    if (promotionTagStatus === "idle") {
      dispatch(createPromotionTagAction.fetchDocumentList());
    }
  }, [promotionTagStatus, dispatch]);

  useEffect(() => {
    if (searchTagStatus === "idle") {
      dispatch(createSearchTagAction.fetchDocumentList());
    }
  }, [searchTagStatus, dispatch]);

  return (
    <>
      <DialogHeader>
        <DialogTitle asChild>
          <FormTitle title="Product - Visual Info" />
        </DialogTitle>
      </DialogHeader>

      <form
        className="flex flex-col gap-5 w-full px-1"
        onSubmit={handleSubmit}
      >
        <FormSubTitle subtitle="Basic Data" />
        {/* <Input
          type="dropdown"
          name="brand"
          labelConfig={{
            label: "Brand"
          }}
          isRequired
          nullOption
          customInitialValuePlaceholderLabel="Select Brand"
          options={brandOptions || []}
          customValue={{
            value: (document?.brand as string) || "",
            setValue: (brand) => {
              setDocument(() => ({
                ...document,
                brand
              }));
              console.log({brand})
            }
          }}
          errorCheck={false}
          validCheck={false}
        /> */}

        <Toggle
          name="includeQuality"
          label="Add Review and Rating"
          isActive={includeQuality}
          onChangeIsActive={(newIncludeQuality) => {
            setIncludeQuality(newIncludeQuality);
          }}
        />
        {includeQuality && (
          <ContentQuality
            name="quality"
            label=""
            value={document?.quality || getInitialQualityValue()}
            onChangeValue={(quality) => {
              setDocument(() => ({
                ...document,
                quality
              }));
            }}
          />
        )}


        <div className="grid grid-cols-2 gap-5">
          <Textarea
            name="includes"
            labelConfig={{
              label: "Includes",
              labelStyle: "",
              layoutStyle: "flex-col space-y-2"
            }}
            isList
            customValue={{
              value: (document?.detail?.includes as string[]) || [],
              setValue: (includes) => {
                setDocument(() => ({
                  ...document,
                  detail: {
                    ...document?.detail,
                    includes
                  } as ContentDetailDocument
                }));
              }
            }}
          />
          <Textarea
            name="excludes"
            labelConfig={{
              label: "Excludes",
              labelStyle: "",
              layoutStyle: "flex-col space-y-2"
            }}
            isList
            customValue={{
              value: (document?.detail?.excludes as string[]) || [],
              setValue: (excludes) => {
                setDocument(() => ({
                  ...document,
                  detail: {
                    ...document?.detail,
                    excludes
                  } as ContentDetailDocument
                }));
              }
            }}
          />
        </div>
        <Input
          type="dropdown"
          name="deliveryDetail"
          labelConfig={{
            label: "Delivery Detail"
          }}
          isRequired
          nullOption
          customInitialValuePlaceholderLabel="Select Delivery Detail"
          options={deliveryDetailOptions || []}
          customValue={{
            value: (document?.detail?.deliveryDetail as string) || "",
            setValue: (deliveryDetail) => {
              setDocument(() => ({
                ...document,
                detail: {
                  ...document?.detail,
                  deliveryDetail
                } as ContentDetailDocument
              }));
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
        <Input
          type="dropdown"
          name="careInfo"
          labelConfig={{
            label: "Care Info"
          }}
          isRequired
          nullOption
          customInitialValuePlaceholderLabel="Select Care Info"
          options={careInfoOptions || []}
          customValue={{
            value: (document?.detail?.careInfo as string) || "",
            setValue: (careInfo) => {
              setDocument(() => ({
                ...document,
                detail: {
                  ...document?.detail,
                  careInfo
                } as ContentDetailDocument
              }));
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
        <Input
          type="dropdown"
          name="cancellationPolicy"
          labelConfig={{
            label: "Cancellation Policy"
          }}
          isRequired
          nullOption
          customInitialValuePlaceholderLabel="Select Cancellation Policy"
          options={cancellationPolicyOptions || []}
          customValue={{
            value: (document?.detail?.cancellationPolicy as string) || "",
            setValue: (cancellationPolicy) => {
              setDocument(() => ({
                ...document,
                detail: {
                  ...document?.detail,
                  cancellationPolicy
                } as ContentDetailDocument
              }));
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
        <Input
          type="dropdown"
          name="faqGroup"
          labelConfig={{
            label: "FAQ"
          }}
          isRequired
          nullOption
          customInitialValuePlaceholderLabel="Select FAQ"
          options={faqGroupOptions || []}
          customValue={{
            value: (document?.detail?.faqGroup as string) || "",
            setValue: (faqGroup) => {
              setDocument(() => ({
                ...document,
                detail: {
                  ...document?.detail,
                  faqGroup
                } as ContentDetailDocument
              }));
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
        <Input
          type="dropdown"
          name="promotionTag"
          labelConfig={{
            label: "Promotion Tag"
          }}
          isRequired={false}
          nullOption={false}
          options={[
            { label: "None", value: "" },
            ...(promotionTagOptions || [])
          ]}
          customValue={{
            value: (document?.tag?.promotionTag as string) || "",
            setValue: (promotionTag) => {
              setDocument(() => ({
                ...document,
                tag: {
                  ...document?.tag,
                  promotionTag: promotionTag || undefined
                } as ContentTagDocument
              }));
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
        {/* <AdvancedCheckbox
          name="colors"
          label="Colors"
          searchPlaceholder="Search Color"
          options={advanceColorOptions || []}
          selectedValues={(document?.detail?.colors as string[]) || []}
          onChangeSelectedValues={(colors) => {
            setDocument(() => ({
              ...document,
              detail: {
                ...document?.detail,
                colors
              } as ContentDetailDocument
            }));
          }}
        />
        <AdvancedCheckbox
          name="occasions"
          label="Occasions"
          searchPlaceholder="Search Occasion"
          options={occasionOptions || []}
          selectedValues={(document?.detail?.occasions as string[]) || []}
          onChangeSelectedValues={(occasions) => {
            setDocument(() => ({
              ...document,
              detail: {
                ...document?.detail,
                occasions
              } as ContentDetailDocument
            }));
          }}
        />
        <AdvancedCheckbox
          name="relations"
          label="Relations"
          searchPlaceholder="Search Relation"
          options={relationOptions || []}
          selectedValues={(document?.detail?.relations as string[]) || []}
          onChangeSelectedValues={(relations) => {
            setDocument(() => ({
              ...document,
              detail: {
                ...document?.detail,
                relations
              } as ContentDetailDocument
            }));
          }}
        /> */}

        {/* <LineSeperator /> */}

        {/* <FormSubTitle subtitle="Tags" /> */}
        {/* <AdvancedCheckbox
          name="aiTags"
          label="Relevant Categories"
          isRequired
          searchPlaceholder="Search"
          options={aiTagOptions || []}
          selectedValues={(document?.tag?.aiTags as string[]) || []}
          onChangeSelectedValues={(aiTags) => {
            setDocument(() => ({
              ...document,
              tag: {
                ...document?.tag,
                aiTags
              } as ContentTagDocument
            }));
          }}
        /> */}
        {/* <AdvancedCheckbox
          name="searchTags"
          label="Search Tags"
          isRequired
          searchPlaceholder="Search Search-Tag"
          options={searchTagOptions || []}
          selectedValues={(document?.tag?.searchTags as string[]) || []}
          onChangeSelectedValues={(searchTags) => {
            setDocument(() => ({
              ...document,
              tag: {
                ...document?.tag,
                searchTags
              } as ContentTagDocument
            }));
          }}
        /> */}


        <LineSeperator />

        <SEOMeta
          name="seoMeta"
          label="SEO Metadata"
          value={
            document?.seoMeta ||
            ({
              title: document?.name,
              tags: [] as string[],
              description: ""
            } as SEOMetaDocument)
          }
          onChangeValue={(seoMeta) => {
            setDocument(() => ({
              ...document,
              seoMeta
            }));
          }}
        />
        <SubmitAndReset position="right">
          <Reset
            label="Reset"
            customResetLogic={() => {
              setDocument(initialDocument);
            }}
          />
          <DialogClose asChild>
            <div className={BUTTON_STYLES.GHOST}>{"Close"}</div>
          </DialogClose>
          <Submit label="Update" />
        </SubmitAndReset>
      </form>
    </>
  );
}
