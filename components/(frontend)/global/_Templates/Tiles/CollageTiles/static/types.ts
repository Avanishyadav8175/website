import { BasicImageType } from "@/common/types/types";

export type CollageLayoutType =
  | "l4-m0-r1"
  | "l1-m0-r4"
  | "l2-m1-r2"
  | "lt1-lb2-rt1-rb2"
  | "lt2-lb1-rt2-rb1";

export type CollageDataType = {
  _id: string;
  layoutType: CollageLayoutType;
  contents: Array<{
    image: BasicImageType;
    title: string;
    description?: string;
    link: string;
  }>;
};
