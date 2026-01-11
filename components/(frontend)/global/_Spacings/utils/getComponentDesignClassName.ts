import { CategoryComponentDesignType } from "@/common/types/types";

export const getComponentDesignClassName = (
  design: CategoryComponentDesignType | undefined
) => {
  if (!design || design === "default") return "";

  if (design === "dawnlit-dust")
    return "sm:py-8 sm:my-3 bg-gradient-to-br from-sienna-3/70 via-transparent to-sienna-3/70 1200:rounded-3xl";

  // if (design === "royal-strands")
  return "";
};
