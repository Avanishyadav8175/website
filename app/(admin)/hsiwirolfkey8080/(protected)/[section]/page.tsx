// components
import AdminRoleAuth from "@/common/utils/admin/roleAuth";

export default async function Dashboard({
  params
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return <AdminRoleAuth sectionSlug={section} />;
}
