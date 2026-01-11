import { ContentAddonDocument } from "@/common/types/documentation/nestedDocuments/contentAddon";
import { SetStateType } from "@/common/types/reactTypes";
import { BasicImageType } from "@/common/types/types";

export type LocalAddonsDocument = {
  _id: string;
  label: string;
  image: BasicImageType;
  category: string;
  pricePerUnit: number;
};

export type SelectedAddonsDocument = LocalAddonsDocument & { count: number };

export type ProductAddonsPopupType = {
  showDialog: boolean;
  setShowDialog: SetStateType<boolean>;
  addons: { id: string; count: number }[];
  setAddons: SetStateType<{ id: string; count: number }[]>;
  availableAddons: ContentAddonDocument[];
  baseProduct: {
    name: string;
    image: BasicImageType;
    selectedPrice: number;
  };
  afterCustomizationPrice: {
    baseAmount: number;
    enhancement: number;
    flavor: number;
  };
  onClickBookNow: () => void;
};
