import { BasicImageType } from "@/common/types/types";

export type CartItemChoiceType = {
  _id: string;
  instruction: string;
  count: number;
  addons: {
    _id: string;
    name: string;
    pricePerUnit: number;
    image: BasicImageType;
    count: number;
  }[];
};
