// hooks
import { useState } from "react";

// components
import AdminSidebarSectionItem from "@/layouts/admin/sidebar/components/AdminSidebarSectionItem";

// icons
import { ChevronRight } from "lucide-react";

// types
import { type AdminPanelSection } from "@/common/types/layouts/admin/adminPanelLayout";

export default function AdminSidebarSection({
  section,
  currPath,
  isLocked,
  isMobile,
  isActive
}: {
  section: AdminPanelSection;
  currPath: string;
  isLocked: boolean;
  isMobile?: boolean;
  isActive: boolean;
}) {
  const [isSectionExpanded, setIsSectionExpanded] = useState<boolean>(false);

  return (
    <>
      <AdminSidebarSectionItem
        section={section}
        isLocked={isLocked}
        isMobile={isMobile}
        isActive={
          isActive ||
          ("subSections" in section
            ? section.subSections
                .map((subSection) =>
                  "path" in subSection
                    ? currPath.includes(subSection.path)
                    : false
                )
                .reduce((bool, val) => (bool ||= val), false)
            : false)
        }
        rightSideComponent={
          "subSections" in section ? (
            <div
              className={`transition-all duration-200 ${isSectionExpanded ? "rotate-90" : "rotate-0"}`}
            >
              <ChevronRight
                strokeWidth={2.5}
                width={15}
              />
            </div>
          ) : undefined
        }
        toggleIsExpanded={() => {
          setIsSectionExpanded(
            (prevIsSectionExpanded) => !prevIsSectionExpanded
          );
        }}
      />
      {isSectionExpanded ? (
        "subSections" in section ? (
          section.subSections.map((subSection, i) => (
            <AdminSidebarSectionItem
              key={i}
              section={subSection}
              isLocked={isLocked}
              isMobile={isMobile}
              isActive={
                "path" in subSection
                  ? currPath.includes(subSection.path)
                    ? true
                    : false
                  : false
              }
              isSubSection={true}
            />
          ))
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </>
  );
}
