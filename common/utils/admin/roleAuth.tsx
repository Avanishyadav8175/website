"use client";
import { ADMIN_ROOT_ROUTE } from "@/common/utils/admin/sidebar";
import { useRouter } from "next/navigation";
import { kebabToCamelCase } from "@/common/utils/case";
import { SIDEBAR_SECTIONS } from "@/common/routes/admin/sidebarSections";

export default function AdminRoleAuth({
  sectionSlug,
  subSectionSlug
}: {
  sectionSlug: string;
  subSectionSlug?: string;
}) {
  const { replace } = useRouter();

  const sectionName = kebabToCamelCase(sectionSlug);
  const subSectionName = subSectionSlug ? kebabToCamelCase(subSectionSlug) : "";

  const relevantComponent = SIDEBAR_SECTIONS.find(({ sectionName: name }) => name.toLowerCase() === sectionName.toLowerCase());
  if (relevantComponent) {
    if (subSectionName && 'subSections' in relevantComponent) {
      const relevantSubSectionComponent = relevantComponent.subSections.find(({ sectionName: name }) => name.toLowerCase() === subSectionName.toLowerCase());
      if (relevantSubSectionComponent && 'component' in relevantSubSectionComponent)
        return relevantSubSectionComponent.component;
    }
    else if ('component' in relevantComponent)
      return relevantComponent.component;
  }

  replace(`/${ADMIN_ROOT_ROUTE}`);
}
