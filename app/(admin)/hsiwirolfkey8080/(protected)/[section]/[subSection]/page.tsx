// components
import AdminRoleAuth from "@/common/utils/admin/roleAuth";

export default function Dashboard({
  params: { section, subSection }
}: {
  params: { section: string; subSection: string };
}) {
  return (
    <AdminRoleAuth
      sectionSlug={section}
      subSectionSlug={subSection}
    />
  );
}
