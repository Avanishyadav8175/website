// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

// utils
import { getInitialContentDeliveryValue } from "@/components/custom/inputs/contentDelivery/utils/getInitialContentDeliveryValue";
import { getInitialContentPrice } from "@/components/custom/inputs/contentPrice/utils/getInitialContentPrice";

// hooks
import { useEffect, useState } from "react";

// components
import ContentDelivery from "@/components/custom/inputs/contentDelivery/ContentDelivery";
import ContentPrice from "@/components/custom/inputs/contentPrice/ContentPrice";
import { DialogClose, DialogHeader } from "@/components/ui/dialog";
import Input from "@/lib/Forms/Input/Input";
import Reset from "@/lib/Forms/Submit_Reset/Reset";
import Submit from "@/lib/Forms/Submit_Reset/Submit";
import { SubmitAndReset } from "@/lib/Forms/layouts/layouts";
import Toggle from "@/lib/Forms/Toggle/Toggle";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentAvailabilityDocument } from "@/common/types/documentation/nestedDocuments/contentAvailability";
import { type FormEvent } from "react";
import { FormSubTitle, FormTitle, LineSeperator } from "@/components/custom/inputs/title/Form";

export default function ContentDeliveryInfoForm({
  initialDocument,
  onUpdate
}: {
  initialDocument: Partial<ContentDocument>;
  onUpdate: (updatedDocument: Partial<ContentDocument>) => void;
}) {
  // states
  const [document, setDocument] = useState<
    Partial<ContentDocument> | undefined
  >(initialDocument);

  // event handlers
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onUpdate({ ...document });
  };

  // side effect
  useEffect(() => {
    if (initialDocument) {
      setDocument(initialDocument);
    }
  }, [initialDocument]);

  return (
    <>
      <DialogHeader></DialogHeader>
      <FormTitle title="Delivery price & time details" />
      <form
        className="flex flex-col gap-5 w-full px-1"
        onSubmit={handleSubmit}
      >
        <ContentDelivery
          name="delivery"
          label="Delivery"
          isAvailableInAllIndia={
            document?.availability?.availableAt === "all-india"
          }
          value={document?.delivery || getInitialContentDeliveryValue()}
          onChangeValue={(delivery) => {
            setDocument({
              ...document,
              delivery
            });
          }}
        />

        <LineSeperator />

        <FormSubTitle subtitle="Pricing Details" />
        <Input
          type="dropdown"
          name="availableAt"
          labelConfig={{
            label: "Availability"
          }}
          isRequired
          nullOption
          customInitialValuePlaceholderLabel="Select Availability"
          options={[
            {
              label: "All India",
              value: "all-india"
            },
            {
              label: "City Wise",
              value: "cities"
            }
          ]}
          customValue={{
            value: (document?.availability?.availableAt as string) || "",
            setValue: (availableAt) => {
              setDocument({
                ...document,
                availability: {
                  ...(document?.availability ? document.availability : {}),
                  availableAt: availableAt as "all-india" | "cities",
                  ...(availableAt === "cities"
                    ? {}
                    : { limitAvailability: undefined })
                } as ContentAvailabilityDocument
              });
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
        {document?.availability?.availableAt === "cities" && (
          <Toggle
            name="limitAvailability"
            label="Limit Availability"
            isActive={document.availability?.limitAvailability}
            onChangeIsActive={(limitAvailability) => {
              setDocument({
                ...document,
                availability: {
                  ...(document.availability ? document.availability : {}),
                  ...(limitAvailability
                    ? { limitAvailability }
                    : document.availability?.availableAt === "cities"
                      ? { limitAvailability }
                      : { limitAvailability: undefined })
                } as ContentAvailabilityDocument
              });
            }}
          />
        )}

        <ContentPrice
          name="price"
          label=""
          withoutCity={document?.availability?.availableAt !== "cities"}
          value={
            document?.price ||
            getInitialContentPrice(
              document?.availability?.availableAt !== "cities"
            )
          }
          onChangeValue={(price) => {
            setDocument({
              ...document,
              price
            });
          }}
        />
        <SubmitAndReset position="right">
          <Reset label="Reset" />
          <DialogClose asChild>
            <div className={BUTTON_STYLES.GHOST}>{"Close"}</div>
          </DialogClose>
          <Submit label="Update" />
        </SubmitAndReset>
      </form>
    </>
  );
}
