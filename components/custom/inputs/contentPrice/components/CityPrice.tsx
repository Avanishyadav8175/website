// icons
import { X } from "lucide-react";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createCityAction,
  selectCity
} from "@/store/features/presets/citySlice";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type ContentCityPriceDocument } from "@/common/types/documentation/nestedDocuments/contentCityPrice";

export default function CityPrice({
  index,
  cityPrice,
  onChangeCityPrice,
  onDeleteCityPrice
}: {
  index: number;
  cityPrice: ContentCityPriceDocument;
  onChangeCityPrice: (newCityPrice: ContentCityPriceDocument) => void;
  onDeleteCityPrice: () => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const cityStatus = useSelector(selectCity.status);

  const { options: cityOptions } = useSelector((state) =>
    selectCity.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // effects
  useEffect(() => {
    if (cityStatus === "idle") {
      dispatch(createCityAction.fetchDocumentList());
    }
  }, [cityStatus, dispatch]);

  return (
    <>
      <div className="font-semibold justify-self-center">{index + 1}</div>
      <Input
        type="dropdown"
        name="city"
        isRequired={false}
        nullOption
        customInitialValuePlaceholderLabel="Select City"
        options={cityOptions}
        customValue={{
          value: cityPrice.city as string,
          setValue: (city) => {
            onChangeCityPrice({
              ...cityPrice,
              city
            } as ContentCityPriceDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="number"
        name="mrp"
        isRequired={false}
        customValue={{
          value: cityPrice.mrp ? cityPrice.mrp.toString() : "",
          setValue: (mrp) => {
            onChangeCityPrice({
              ...cityPrice,
              mrp: Number(mrp)
            } as ContentCityPriceDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="number"
        name="basePrice"
        isRequired={false}
        customValue={{
          value: cityPrice.price ? cityPrice.price.toString() : "",
          setValue: (price) => {
            onChangeCityPrice({
              ...cityPrice,
              price: Number(price)
            } as ContentCityPriceDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <div
        onClick={() => {
          onDeleteCityPrice();
        }}
        className="w-min rounded-full bg-red-600 text-white p-1 cursor-pointer transition-all duration-300 hover:bg-red-700"
      >
        <X
          strokeWidth={1.5}
          width={16}
          height={16}
        />
      </div>
    </>
  );
}
