// libraries
import mongoose from "mongoose";

// utils
import { getInitialCustomizationValue } from "./utils/getInitialCustomizationValue";
import { getInitialEnhancementValue } from "./utils/getInitialEnhancementValue";
import { getInitialUpgradeValue } from "./utils/getInitialUpgradeValue";
import { getInitialFlavourValue } from "./utils/getInitialFlavourValue";
import { getInitialBalloonColorValue } from "./utils/getInitialBalloonColorValue";
import { getInitialUploadTextValue } from "./utils/getInitialUploadTextValue";
import { getInitialUploadImageValue } from "./utils/getInitialUploadImageValue";

// hooks
import { useEffect, useState } from "react";

// components
import BalloonColor from "./components/BalloonColor";
import Enhancement from "./components/Enhancement";
import Flavour from "./components/Flavour";
import Toggle from "@/lib/Forms/Toggle/Toggle";
import Upgrade from "./components/Upgrade";
import UploadImage from "./components/UploadImage";
import UploadText from "./components/UploadText";

// types
import { type ContentBalloonColorDocument } from "@/common/types/documentation/nestedDocuments/contentBalloonColor";
import { type ContentCustomizationDocument } from "@/common/types/documentation/nestedDocuments/contentCustomization";
import { type ContentCustomizationUploadImageDocument } from "@/common/types/documentation/nestedDocuments/contentCustomizationUploadImage";
import { type ContentEnhancementDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancement";
import { type ContentFlavourDocument } from "@/common/types/documentation/nestedDocuments/contentFlavour";
import { type ContentUpgradeDocument } from "@/common/types/documentation/nestedDocuments/contentUpgrade";
import { FormSubTitle, LineSeperator } from "../title/Form";

export default function ContentCustomization(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    isEdible?: boolean;
    defaultValue?: ContentCustomizationDocument;
  } & (
      | {
        isRequired?: undefined;
      }
      | {
        isRequired?: boolean;
        label: string;
      }
    ) &
    (
      | {
        value?: undefined;
        defaultValue?: ContentCustomizationDocument;
      }
      | {
        value?: ContentCustomizationDocument;
        defaultValue?: undefined;
        onChangeValue: (newValue: ContentCustomizationDocument) => void;
      }
    )
) {
  // props
  const {
    name,
    label,
    isRequired,
    performReset,
    isEdible,
    defaultValue,
    value
  } = props;

  // states
  const [customization, setCustomization] =
    useState<ContentCustomizationDocument>(
      defaultValue || value || getInitialCustomizationValue()
    );

  const [includeEnhancement, setIncludeEnhancement] = useState<boolean>(
    Boolean(customization?.enhancement?.label)
  );
  const [includeUpgrade, setIncludeUpgrade] = useState<boolean>(
    Boolean(customization?.upgrade?.label)
  );
  const [includeFlavour, setIncludeFlavour] = useState<boolean>(
    Boolean(customization?.flavour?.label)
  );
  const [includeBalloonColor, setIncludeBalloonColor] = useState<boolean>(
    Boolean(customization.balloonColor?.label)
  );
  const [includeUploadText, setIncludeUploadText] = useState<boolean>(
    Boolean(customization.uploadText?.label)
  );
  const [includeUploadImage, setIncludeUploadImage] = useState<boolean>(
    Boolean(customization.uploadImage?.label)
  );

  // variables
  const returnValue = (() => {
    const validCustomization = { ...customization };

    if (validCustomization.enhancement) {
      validCustomization.enhancement = {
        ...validCustomization.enhancement,
        items: [...validCustomization.enhancement.items]
          .filter(({ enhancement, price }) => enhancement && price)
          .map((enhancementItem) => {
            const validEnhancementItem = { ...enhancementItem };

            if (
              !mongoose.Types.ObjectId.isValid(
                validEnhancementItem._id as string
              )
            ) {
              delete validEnhancementItem._id;
            }

            return validEnhancementItem;
          })
      } as ContentEnhancementDocument;
    }

    if (validCustomization.upgrade) {
      validCustomization.upgrade = {
        ...validCustomization.upgrade,
        options: [...validCustomization.upgrade.options]
          .filter(({ upgrade, price }) => upgrade && price)
          .map((upgradeItem) => {
            const validUpgradeItem = { ...upgradeItem };

            if (
              !mongoose.Types.ObjectId.isValid(validUpgradeItem._id as string)
            ) {
              delete validUpgradeItem._id;
            }

            return validUpgradeItem;
          })
      } as ContentUpgradeDocument;
    }

    if (validCustomization.flavour) {
      validCustomization.flavour = {
        ...validCustomization.flavour,
        options: [...validCustomization.flavour.options]
          .filter(({ flavour, price }) => flavour && price)
          .map((flavourItem) => {
            const validFlavourItem = { ...flavourItem };

            if (
              !mongoose.Types.ObjectId.isValid(validFlavourItem._id as string)
            ) {
              delete validFlavourItem._id;
            }

            return validFlavourItem;
          })
      } as ContentFlavourDocument;
    }

    return {
      isCustomizable: validCustomization.isCustomizable,
      ...(validCustomization.isCustomizable &&
        validCustomization?.enhancement &&
        validCustomization.enhancement.label &&
        validCustomization.enhancement.items.length
        ? {
          enhancement: { ...validCustomization.enhancement }
        }
        : {}),
      ...(validCustomization?.upgrade &&
        validCustomization.upgrade.label &&
        validCustomization.upgrade.default &&
        validCustomization.upgrade.options.length
        ? {
          upgrade: { ...validCustomization.upgrade }
        }
        : {}),
      ...(validCustomization?.flavour &&
        validCustomization.flavour.label &&
        validCustomization.flavour.default &&
        validCustomization.flavour.options.length
        ? {
          flavour: { ...validCustomization.flavour }
        }
        : {}),
      ...(validCustomization?.balloonColor &&
        validCustomization.balloonColor.label &&
        validCustomization.balloonColor.groups &&
        validCustomization.balloonColor.groups.length
        ? {
          balloonColor: { ...validCustomization.balloonColor }
        }
        : {}),
      ...(validCustomization?.uploadText && validCustomization.uploadText.label
        ? {
          uploadText: { ...validCustomization.uploadText }
        }
        : {}),
      ...(validCustomization?.uploadImage &&
        validCustomization.uploadImage.label
        ? {
          uploadImage: { ...validCustomization.uploadImage }
        }
        : {})
    } as ContentCustomizationDocument;
  })();

  // effects
  useEffect(() => {
    if (customization) {
      if (customization.enhancement?.label) {
        setIncludeEnhancement(true);
      }
      if (customization.upgrade?.label) {
        setIncludeUpgrade(true);
      }
      if (customization.flavour?.label) {
        setIncludeFlavour(true);
      }
      if (customization.balloonColor?.label) {
        setIncludeBalloonColor(true);
      }
      if (customization.uploadText?.label) {
        setIncludeUploadText(true);
      }
      if (customization.uploadImage?.label) {
        setIncludeUploadImage(true);
      }
    }

    if ("onChangeValue" in props) {
      props.onChangeValue(returnValue as ContentCustomizationDocument);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customization]);

  return (
    <section className="flex flex-col gap-3 w-full">
      {label && (
        <FormSubTitle subtitle={label} />
      )}
      <section className="flex flex-col gap-3 bg-teal-100/60 border border-teal-200 px-5 py-4 rounded-xl">
        <Toggle
          name="isCustomizable"
          label="Add Customizations"
          isActive={customization.isCustomizable}
          onChangeIsActive={(isCustomizable) => {
            setCustomization({
              ...customization,
              isCustomizable
            } as ContentCustomizationDocument);
          }}
        />


        {customization.isCustomizable && (
          <>
            <LineSeperator />
            <Toggle
              name="includeEnhancement"
              label="Enhancement"
              isActive={includeEnhancement}
              onChangeIsActive={(newIncludeEnhancement) => {
                setIncludeEnhancement(newIncludeEnhancement);

                if (!newIncludeEnhancement) {
                  setCustomization({
                    ...customization,
                    enhancement: getInitialEnhancementValue()
                  } as ContentCustomizationDocument);
                }
              }}
            />
          </>
        )}
        {customization.isCustomizable && includeEnhancement && (
          <Enhancement
            enhancement={
              (customization.enhancement as ContentEnhancementDocument) ||
              getInitialEnhancementValue()
            }
            onChangeEnhancement={(enhancement) => {
              setCustomization({
                ...customization,
                enhancement
              } as ContentCustomizationDocument);
            }}
          />
        )}
        {/* {customization.isCustomizable && (
          <Toggle
            name="includeUpgrade"
            label="Upgrade"
            isActive={includeUpgrade}
            onChangeIsActive={(newIncludeUpgrade) => {
              setIncludeUpgrade(newIncludeUpgrade);

              if (!newIncludeUpgrade) {
                setCustomization({
                  ...customization,
                  upgrade: getInitialUpgradeValue()
                } as ContentCustomizationDocument);
              }
            }}
          />
        )}
        {customization.isCustomizable && includeUpgrade && (
          <Upgrade
            upgrade={
              (customization.upgrade as ContentUpgradeDocument) ||
              getInitialUpgradeValue()
            }
            onChangeUpgrade={(upgrade) => {
              setCustomization({
                ...customization,
                upgrade
              } as ContentCustomizationDocument);
            }}
          />
        )} */}
        {/* {customization.isCustomizable && isEdible && (
          <Toggle
            name="includeFlavour"
            label="Flavour"
            isActive={includeFlavour}
            onChangeIsActive={(newIncludeFlavour) => {
              setIncludeFlavour(newIncludeFlavour);

              if (!newIncludeFlavour) {
                setCustomization({
                  ...customization,
                  flavour: getInitialFlavourValue()
                } as ContentCustomizationDocument);
              }
            }}
          />
        )}
        {customization.isCustomizable && isEdible && includeFlavour && (
          <Flavour
            flavour={
              (customization.flavour as ContentFlavourDocument) ||
              getInitialFlavourValue()
            }
            onChangeFlavour={(flavour) => {
              setCustomization({
                ...customization,
                flavour
              } as ContentCustomizationDocument);
            }}
          />
        )} */}


        {customization.isCustomizable && (
          <>
            <LineSeperator />
            <Toggle
              name="includeBalloonColor"
              label="Balloon Color"
              isActive={includeBalloonColor}
              onChangeIsActive={(newIncludeBalloonColor) => {
                setIncludeBalloonColor(newIncludeBalloonColor);

                if (!newIncludeBalloonColor) {
                  setCustomization({
                    ...customization,
                    balloonColor: getInitialBalloonColorValue()
                  } as ContentCustomizationDocument);
                }
              }}
            />
          </>
        )}
        {customization.isCustomizable && includeBalloonColor && (
          <BalloonColor
            balloonColor={
              (customization.balloonColor as ContentBalloonColorDocument) ||
              getInitialBalloonColorValue()
            }
            onChangeBalloonColor={(balloonColor) => {
              setCustomization({
                ...customization,
                balloonColor
              } as ContentCustomizationDocument);
            }}
          />
        )}


        {customization.isCustomizable && (
          <>
            <LineSeperator />
            <Toggle
              name="includeUploadText"
              label="Upload Text"
              isActive={includeUploadText}
              onChangeIsActive={(newIncludeUploadText) => {
                setIncludeUploadText(newIncludeUploadText);

                if (!newIncludeUploadText) {
                  setCustomization({
                    ...customization,
                    uploadText: getInitialUploadTextValue()
                  } as ContentCustomizationDocument);
                }
              }}
            />
          </>
        )}
        {customization.isCustomizable && includeUploadText && (
          <UploadText
            uploadText={
              (customization.uploadText as ContentCustomizationUploadImageDocument) ||
              getInitialUploadTextValue()
            }
            onChangeUploadText={(uploadText) => {
              setCustomization({
                ...customization,
                uploadText
              } as ContentCustomizationDocument);
            }}
          />
        )}


        {/* {customization.isCustomizable && (
          <>
            <LineSeperator />
            <Toggle
              name="includeUploadImage"
              label="Upload Image"
              isActive={includeUploadImage}
              onChangeIsActive={(newIncludeUploadImage) => {
                setIncludeUploadImage(newIncludeUploadImage);

                if (!newIncludeUploadImage) {
                  setCustomization({
                    ...customization,
                    uploadImage: getInitialUploadImageValue()
                  } as ContentCustomizationDocument);
                }
              }}
            />
          </>
        )}
        {customization.isCustomizable && includeUploadImage && (
          <UploadImage
            uploadImage={
              (customization.uploadImage as ContentCustomizationUploadImageDocument) ||
              getInitialUploadImageValue()
            }
            onChangeUploadImage={(uploadImage) => {
              setCustomization({
                ...customization,
                uploadImage
              } as ContentCustomizationDocument);
            }}
          />
        )} */}
      </section>
      <input
        className="hidden"
        type="text"
        name={name}
        value={returnValue ? JSON.stringify(returnValue) : ""}
        onChange={() => { }}
      />
    </section>
  );
}
