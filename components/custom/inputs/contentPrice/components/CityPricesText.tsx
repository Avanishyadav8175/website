// libraries
import { v4 as uuid } from "uuid";

// icons
import { ClipboardPaste } from "lucide-react";

// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createCityAction,
  selectCity
} from "@/store/features/presets/citySlice";

// components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

// types
import { type ClipboardEvent } from "react";
import { type ContentCityPriceDocument } from "@/common/types/documentation/nestedDocuments/contentCityPrice";

export default function CityPricesText({
  onChangeCityPrices
}: {
  onChangeCityPrices: (newCityPrices: ContentCityPriceDocument[]) => void;
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

  // states
  const [cityPriceJSON, setCityPriceJSON] = useState<string>("");

  // handlers
  const handlePaste = ({
    clipboardData
  }: ClipboardEvent<HTMLTextAreaElement>) => {
    const value = clipboardData?.getData("text").replace(/\r/g, "");

    if (value) {
      const values = value
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => line.split("\t"));

      const arr = values
        .filter((value) => value.length === 3)
        .map((value) => ({
          city: value[0],
          mrp: Number(value[1]),
          price: Number(value[2])
        }));

      const json = JSON.stringify(arr);
      const formattedJSON = json
        .replace(/\[/g, "[")
        .replace(/\{/g, "\n\t{\n\t\t")
        .replace(/\}/g, "\n\t}")
        .replace(/\]/g, "\n]")
        .replace(/},/g, "}$")
        .replace(/,/g, ",\n\t\t")
        .replace(/}\$/g, "},")
        .replace(/:/g, ": ");

      setCityPriceJSON(formattedJSON);
    } else {
      setCityPriceJSON("");
    }
  };

  const handleDone = () => {
    if (cityPriceJSON) {
      const newCityPrices = JSON.parse(
        cityPriceJSON
      ) as ContentCityPriceDocument[];

      const cities: string[] = [];

      const validCityPrices = newCityPrices.map((cityPrice) => {
        if (
          cityOptions.find(
            (option) =>
              option.label.toLowerCase() ===
              (cityPrice.city as string).toLowerCase()
          )
        ) {
          const cityId = cityOptions.find(
            (option) =>
              option.label.toLowerCase() ===
              (cityPrice.city as string).toLowerCase()
          )?.value;

          if (cityId && !cities.includes(cityId)) {
            cityPrice.city = cityId;

            cities.push(cityPrice.city);
          } else {
            cityPrice.city = "";
          }
        } else {
          cityPrice.city = "";
        }

        cityPrice._id = uuid();

        return cityPrice;
      });

      onChangeCityPrices(validCityPrices);

      setCityPriceJSON("");
    }
  };

  // effects
  useEffect(() => {
    if (cityStatus === "idle") {
      dispatch(createCityAction.fetchDocumentList());
    }
  }, [cityStatus, dispatch]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-teal-700 text-white transition-colors duration-300 cursor-pointer">
          <ClipboardPaste
            strokeWidth={2}
            width={16}
            height={16}
          />
          <span>{"PASTE"}</span>
        </div>
      </DialogTrigger>
      <DialogContent className={`min-w-fit rounded-2xl max-sm:px-5`}>
        <DialogHeader>
          <DialogTitle className="mt-1">{"Paste Here"}</DialogTitle>
        </DialogHeader>
        <textarea
          className={
            "h-[60dvh] w-full rounded-xl border-[1.5px] border-black/30 transition-colors duration-300 hover:black/70 focus:outline-none resize-none"
          }
          name="textAreaInput"
          spellCheck={false}
          readOnly
          value={cityPriceJSON}
          onPaste={handlePaste}
        />
        <DialogFooter>
          <section className="flex items-center gap-3">
            <div
              className={BUTTON_STYLES.GHOST}
              onClick={() => {
                setCityPriceJSON("");
              }}
            >
              {"Reset"}
            </div>
            <DialogClose asChild>
              <div
                className={BUTTON_STYLES.GENESIS}
                onClick={handleDone}
              >
                {"Done"}
              </div>
            </DialogClose>
          </section>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
