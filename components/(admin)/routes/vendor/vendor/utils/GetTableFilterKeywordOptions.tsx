// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import { selectVendor } from "@/store/features/users/vendorSlice";
import {
  createCityAction,
  selectCity
} from "@/store/features/presets/citySlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type VendorDocument } from "@/common/types/documentation/users/vendor";
import {
  createVendorOfferCategoryAction,
  selectVendorOfferCategory
} from "@/store/features/presets/vendorOfferCategorySlice";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<VendorDocument>) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // react states
  const { documents } = useSelector(selectVendor.documentList);

  const cityStatus = useSelector(selectCity.status);

  const { options: cityOptions } = useSelector((state) =>
    selectCity.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const vendorOfferCategoryStatus = useSelector(
    selectVendorOfferCategory.status
  );

  const { options: vendorOfferCategoryOptions } = useSelector((state) =>
    selectVendorOfferCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // side effects
  useEffect(() => {
    if (cityStatus === "idle") {
      dispatch(createCityAction.fetchDocumentList());
    }
  }, [cityStatus, dispatch]);

  useEffect(() => {
    if (vendorOfferCategoryStatus === "idle") {
      dispatch(createVendorOfferCategoryAction.fetchDocumentList());
    }
  }, [vendorOfferCategoryStatus, dispatch]);

  useEffect(() => {
    onReturnOptions({
      // @ts-ignore
      "location.city": cityOptions,
      "business.categories": vendorOfferCategoryOptions,
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [documents, cityOptions, vendorOfferCategoryOptions, onReturnOptions]);

  return null;
}
