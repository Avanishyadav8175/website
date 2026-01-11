import { ClassNameType } from "./reactTypes";

export type DateFormatType = "MINI" | "SHORT" | "FULL";

export type SVGType = {
  dimensions?: number | string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
  stroke?: string;
  fill?: string;
  className?: ClassNameType;
};

export type ThemeType = "light" | "dark";

export type BasicLinkType = { label: string; link: string };

export type BasicImageType = { url: string; alt: string };

export type BasicVideoType = { link: string; alt: string };

export type BasicAlignmentType = "left" | "middle" | "right";

export type CategoryComponentDesignType =
  | "default"
  | "dawnlit-dust"
  | "royal-strands";

export type AdminPanelRoute = {
  sectionName: string;
  sectionLabel: string;
  svg: JSX.Element;
} & ({ subsections: AdminPanelRoutes } | { link: string });

export type AdminPanelRoutes = Array<AdminPanelRoute>;

export type SortType = "none" | "asc" | "desc";

export type FormEntriesType = {
  [k: string]: string | File;
};

export type AtomicRoleType = "create" | "read" | "update" | "delete";

export type RoleType = Record<AtomicRoleType, boolean>;

export type FolderColorType = "red" | "blue" | "amber" | "jade" | "purple";

export type BreadcrumbsType = { label: string; link: string };

// DUMMIES ================================================================
export type DummyCityDocument = { _id: string; name: string };

export type DummyPriceTagDocument = {
  _id: string;
  mrp: number;
  price: number;
  currency: string;
};

export type DummyPriceDocument = {
  base: DummyPriceTagDocument;
  cities: Array<{
    city: DummyCityDocument;
    price: DummyPriceTagDocument;
  }>;
};
