import { Children } from "@/common/types/reactTypes";
import {
  BottomVerticalSpacing,
  TopVerticalSpacing,
  VerticalSpacing
} from "./VerticalSpacings";
import { HorizontalSpacing } from "./HorizontalSpacings";
import { CategoryComponentDesignType } from "@/common/types/types";
import { getComponentDesignClassName } from "./utils/getComponentDesignClassName";

export const ParentContainer = ({
  type,
  design,
  children
}: {
  type?: "first" | "last" | "default";
  design?: CategoryComponentDesignType;
  children: Children;
}) => {
  const componentClassName: string = getComponentDesignClassName(design);

  if (!type || type === "default")
    return (
      <VerticalSpacing className={componentClassName}>
        <HorizontalSpacing>{children}</HorizontalSpacing>
      </VerticalSpacing>
    );

  if (type === "first")
    return (
      <TopVerticalSpacing className={componentClassName}>
        <HorizontalSpacing>{children}</HorizontalSpacing>
      </TopVerticalSpacing>
    );

  // type = "last"
  return (
    <BottomVerticalSpacing className={componentClassName}>
      <HorizontalSpacing>{children}</HorizontalSpacing>
    </BottomVerticalSpacing>
  );
};
