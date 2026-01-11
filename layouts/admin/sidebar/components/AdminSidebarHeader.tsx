import AdminSidebarSectionItem from "./AdminSidebarSectionItem";
import { Flower2 } from "lucide-react";
import { COMPANY_NAME } from "@/common/constants/companyDetails";

export default function AdminSidebarHeader({
  isLocked,
  isMobile
}: {
  isLocked: boolean;
  isMobile?: boolean;
  toggleIsLocked: () => void;
}) {
  return (
    <AdminSidebarSectionItem
      section={{
        sectionName: "admin-panel",
        sectionLabel: COMPANY_NAME,
        // sectionLabel: WEBSITE_NAME + " Admin",
        icon: (
          <Flower2 className="text-teal-700" />
        ),
        component: <></>,
        path: "#"
      }}
      isLocked={isLocked}
      isActive={false}
      customHeight={`h-[60px] min-h-[60px] ${isMobile ? "hidden" : ""}`}
      rightSideComponent={<></>}
    />
  );
}
