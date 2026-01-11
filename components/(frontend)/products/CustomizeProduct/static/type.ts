import { CustomizationImageDocument } from "@/common/types/documentation/media/customizationImage";
import { ContentCustomizationDocument } from "@/common/types/documentation/nestedDocuments/contentCustomization";
import { ContentEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancementItem";
import { BalloonColorGroupDocument } from "@/common/types/documentation/presets/balloonColorGroup";
import { SetStateType } from "@/common/types/reactTypes";
import { BasicImageType } from "@/common/types/types";
import { LocalPincodeDocument } from "@/components/(frontend)/global/SelectCity/static/types";
import { LocalProductDateTimeType } from "@/components/pages/(frontend)/Content/components/Details/ContentDetailsUI";
// import { LocalProductDateTimeType } from "@/components/pages/(frontend)/Content/components/Details/ContentDetails";

export type EnhancementType = {
  _id: string;
  label: string;
  price: number;
  image: BasicImageType;
};
export type FlavorType = { _id: string; label: string; price: number };
export type ProductColorType = { _id: string; label: string };

export type FrontendProductCustomizationType = {
  showDialog: boolean;
  setShowDialog: SetStateType<boolean>;
  enhancements: Array<ContentEnhancementItemDocument>;
  setEnhancements: SetStateType<Array<ContentEnhancementItemDocument>>;
  availableEnhancements: Array<EnhancementType>;
  upgrade: string | undefined;
  setUpgrade: SetStateType<string | undefined>;
  flavor: string | undefined;
  setFlavor: SetStateType<string | undefined>;
  availableFlavors: Array<FlavorType>;
  imgText: string | undefined;
  setImgText: SetStateType<string | undefined>;
  textLetterLimit: number;
  imgImages: Array<BasicImageType>;
  setImgImages: SetStateType<Array<BasicImageType>>;
  color: BalloonColorGroupDocument | undefined;
  setColor: SetStateType<BalloonColorGroupDocument | undefined>;
  otherColors: string[];
  setOtherColors: SetStateType<string[]>;
  availableColors: Array<ProductColorType>;
  maxImages: number;
  imageDimensions: { size: number; width: number; height: number };
  currPincode: LocalPincodeDocument | undefined;
  dateTime: LocalProductDateTimeType;
  baseProduct: {
    name: string;
    image: BasicImageType;
    selectedPrice: number;
  };
  onBook: () => void;
  onBack: () => void;
  customizations: ContentCustomizationDocument;
  contentName: string;
  customizationImages: CustomizationImageDocument[];
  onChangeCustomizationImages: (
    customizationImages: CustomizationImageDocument[]
  ) => void;
};
