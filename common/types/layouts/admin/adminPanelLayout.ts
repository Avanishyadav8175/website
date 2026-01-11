// types
import { type AdminRolePermissionDocument } from "@/common/types/documentation/nestedDocuments/adminRolePermission";
import { type DocumentKeyOption } from "@/common/types/utils";
import { type PermissionDocument } from "../../documentation/nestedDocuments/permission";
import { type ReactNode } from "react";

export type AdminPanelSectionKey = DocumentKeyOption<string>;

export type AdminPanelSubSectionKey = string;
// DocumentKeyOption<
//   Omit<
//     Exclude<
//       Exclude<AdminRolePermissionDocument[T], undefined>["custom"],
//       undefined
//     >,
//     "createdAt" | "updatedAt"
//   >
// >;

export type AdminPanelSubSectionProp = {
  sectionName: string;
  sectionLabel: string | ReactNode;
  icon: ReactNode;
  component: ({
    userName,
    isSuperAdmin,
    permission
  }: {
    userName?: string;
    isSuperAdmin?: boolean;
    permission?: PermissionDocument;
  }) => ReactNode;
};

export type AdminPanelSectionProp = {
  sectionName: string;
  sectionLabel: string;
  icon: ReactNode;
} & (
    | {
      subSections: {
        sectionName: string;
        sectionLabel: string | JSX.Element;
        icon: JSX.Element;
        component: JSX.Element;
      }[]
    }
    | {
      component: ReactNode;
    }
  );

export type AdminPanelSection = {
  sectionName: string;
  sectionLabel: string | ReactNode;
  icon: ReactNode;
} & (
    | { subSections: AdminPanelSection[] }
    | {
      component: ReactNode;
      path: string;
    }
    | { askConfirmation: boolean; onConfirmAction: () => void }
  );

export type CurrFilterType = {
  label: string;
  value: string;
  keyword: {
    label: string;
    value: string;
  };
};

export type AllFiltersType = {
  label: string;
  value: string;
  options: { label: string; value: string }[];
}[];
