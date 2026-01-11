import { Children, ClassNameType } from "@/common/types/reactTypes";
import { BreadcrumbsType } from "@/common/types/types";
import Breadcrumbs from "@/components/(frontend)/global/Breadcrumbs/Breadcrumbs";

export default function BreadcrumbsWrapper({
  children,
  breadcrumbs,
  className,
  hideInMobile
}: {
  children: Children;
  breadcrumbs: BreadcrumbsType[];
  className: ClassNameType;
  hideInMobile?: boolean;
}) {
  return (
    <Breadcrumbs
      breadcrumbs={breadcrumbs}
      forceShowBreadcrumb
      hideInMobile={hideInMobile || false}
    >
      <div className={className}>{children}</div>
    </Breadcrumbs>
  );
}
