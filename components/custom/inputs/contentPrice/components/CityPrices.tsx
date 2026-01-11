// icons
import { Plus, PlusCircle } from "lucide-react";

// utils
import { getInitialCityPrice } from "../utils/getInitialCityPrice";
import { getInitialCityPrices } from "../utils/getInitialCityPrices";

// components
import CityPrice from "./CityPrice";
import CityPricesText from "./CityPricesText";

// types
import { type ContentCityPriceDocument } from "@/common/types/documentation/nestedDocuments/contentCityPrice";

export default function CityPrices({
  cityPrices,
  onChangeCityPrices
}: {
  cityPrices: ContentCityPriceDocument[];
  onChangeCityPrices: (newCityPrices: ContentCityPriceDocument[]) => void;
}) {
  // handlers
  const handleAddCityPrice = () => {
    onChangeCityPrices([...cityPrices, getInitialCityPrice()]);
  };

  const handleDeleteCityPrice = (cityPriceId: string) => {
    if (cityPrices.length === 1) {
      onChangeCityPrices(getInitialCityPrices());
    } else {
      onChangeCityPrices(
        [...cityPrices].filter(({ _id }) => _id !== cityPriceId)
      );
    }
  };

  return (
    <section className="flex flex-col gap-3 mt-2 bg-teal-100/60 p-4 pb-5 border border-teal-200 rounded-xl">
      <section className="flex items-center justify-between pb-3">
        <div className="text-xl font-light">{"City Wise:"}</div>
        <CityPricesText onChangeCityPrices={onChangeCityPrices} />
      </section>
      <section className="grid grid-cols-[12px_1fr_1fr_1fr_30px] items-center justify-center gap-3 text-center">
        <span>No</span>
        <span>City</span>
        <span>MRP</span>
        <span>Discounted Price</span>
        <span></span>
        {cityPrices.map((cityPrice, i) => (
          <CityPrice
            key={i}
            index={i}
            cityPrice={cityPrice}
            onChangeCityPrice={(newCityPrice) => {
              onChangeCityPrices(
                [...cityPrices].map((cityPrice) =>
                  cityPrice._id === newCityPrice._id ? newCityPrice : cityPrice
                )
              );
            }}
            onDeleteCityPrice={() => {
              handleDeleteCityPrice(cityPrice._id as string);
            }}
          />
        ))}
        <div
          onClick={handleAddCityPrice}
          className="cursor-pointer mt-2 transition-all duration-300 w-full flex items-center justify-center gap-1.5 py-2 col-span-5 bg-teal-200 border border-teal-400 hover:text-white hover:bg-teal-600 hover:border-teal-600 rounded-lg"
        >
          <Plus
            strokeWidth={1.5}
            width={18}
            height={18}
          />{" "}
          <span>Add another</span>
        </div>
      </section>
    </section>
  );
}
