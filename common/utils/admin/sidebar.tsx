import {
  type AdminPanelSection,
  type AdminPanelSectionProp,
  type AdminPanelSubSectionProp
} from "@/common/types/layouts/admin/adminPanelLayout";
import { camelToKebabCase } from "@/common/utils/case";
import { type ReactNode } from "react";

export const ADMIN_ROOT_ROUTE = "hsiwirolfkey8080";

const hasSubSections = (
  section: AdminPanelSectionProp
): section is AdminPanelSectionProp & {
  subSections: AdminPanelSubSectionProp[];
} => "subSections" in section;

const hasComponent = (
  section: AdminPanelSectionProp
): section is AdminPanelSectionProp & { component: ReactNode } =>
  "component" in section;

export const getSection = (
  section: AdminPanelSectionProp
): AdminPanelSection => {
  if (hasSubSections(section)) {
    return {
      sectionName: section.sectionName as string,
      sectionLabel: section.sectionLabel,
      icon: section.icon,
      subSections: section.subSections.map(
        (subSection: any) =>
          ({
            sectionName: subSection.sectionName,
            sectionLabel: subSection.sectionLabel,
            icon: subSection.icon,
            component: subSection.component,
            path: `/${ADMIN_ROOT_ROUTE}/${camelToKebabCase(section.sectionName)}/${camelToKebabCase(subSection.sectionName as string)}`
          }) as AdminPanelSection
      )
    };
  } else if (hasComponent(section)) {
    return {
      sectionName: section.sectionName as string,
      sectionLabel: section.sectionLabel,
      icon: section.icon,
      component: section.component,
      path: `/${ADMIN_ROOT_ROUTE}/${camelToKebabCase(section.sectionName as string)}`
    };
  }

  throw new Error(
    "Invalid section configuration: missing either subSections or component."
  );
};
