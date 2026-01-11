"use client";

// hooks
import { useLocation } from "@/hooks/useLocation/useLocation";

// components
import FrontendProductTilesUI from "./FrontendProductTilesUI";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentsSortType } from "@/components/pages/(frontend)/CategoryList/static/types";
import { useAppStates } from "@/hooks/useAppState/useAppState";

export default function FrontendProductTilesWithHook({
  id,
  type,
  currSort,
  inAdmin,
  inCategoryPage,
  sync,
  extraCurved,
  limit,
  productList
}: {
  id?: string;
  type?: "list" | "scrollable";
  currSort?: ContentsSortType;
  inAdmin?: boolean;
  inCategoryPage?: boolean;
  sync?: boolean;
  extraCurved?: boolean;
  limit?: number;
  productList: ContentDocument[];
}) {
  // hooks
  const {
    location: {
      data: { selectedCity }
    }
  } = useAppStates();

  return (
    <FrontendProductTilesUI
      id={id}
      type={type}
      currSort={currSort}
      inAdmin={inAdmin}
      inCategoryPage={inCategoryPage}
      sync={sync}
      extraCurved={extraCurved}
      limit={limit}
      productList={productList}
      selectedCity={selectedCity}
    />
  );
}
