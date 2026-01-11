// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type ContentBasePriceDocument } from "@/common/types/documentation/nestedDocuments/contentBasePrice";

export default function BasePrice({
  basePrice,
  onChangeBasePrice
}: {
  basePrice: ContentBasePriceDocument;
  onChangeBasePrice: (newBasePrice: ContentBasePriceDocument) => void;
}) {
  return (
    <section className="grid grid-cols-2 items-center justify-center gap-5">
      <div className="bg-teal-100/60 border border-teal-200 rounded-xl p-4">
        <Input
          type="number"
          name="baseMRP"
          isRequired={true}
          labelConfig={{
            label: "MRP",
            layoutStyle: "flex-col space-y-2"
          }}
          customValue={{
            value: basePrice.mrp ? basePrice.mrp.toString() : "",
            setValue: (mrp) => {
              onChangeBasePrice({
                ...basePrice,
                mrp: Number(mrp)
              } as ContentBasePriceDocument);
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
      </div>

      <div className="bg-teal-100/60 border border-teal-200 rounded-xl p-4">
        <Input
          type="number"
          name="basePrice"
          isRequired={true}
          labelConfig={{
            label: "Discounted Price",
            layoutStyle: "flex-col space-y-2"
          }}
          customValue={{
            value: basePrice.price ? basePrice.price.toString() : "",
            setValue: (price) => {
              onChangeBasePrice({
                ...basePrice,
                price: Number(price)
              } as ContentBasePriceDocument);
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
      </div>
    </section>
  );
}
