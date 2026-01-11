// libraries
import mongoose from "mongoose";

// utils
import { getInitialContentDeliveryValue } from "./utils/getInitialContentDeliveryValue";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createProcessingTimeAction,
  selectProcessingTime
} from "@/store/features/presets/processingTimeSlice";

// components
import ContentDeliverySlots from "./components/ContentDeliverySlots";
import Input from "@/lib/Forms/Input/Input";

// types
import { type ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { type ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";
import { FormSubTitle } from "../title/Form";

export default function ContentDelivery(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    isAvailableInAllIndia?: boolean;
    defaultValue?: ContentDeliveryDocument;
  } & (
      | {
        isRequired?: undefined;
      }
      | {
        isRequired?: boolean;
        label: string;
      }
    ) &
    (
      | {
        value?: undefined;
        defaultValue?: ContentDeliveryDocument;
      }
      | {
        value?: ContentDeliveryDocument;
        defaultValue?: undefined;
        onChangeValue: (newValue: ContentDeliveryDocument) => void;
      }
    )
) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const processingTimeStatus = useSelector(selectProcessingTime.status);

  const { options: processingTimeOptions } = useSelector((state) =>
    selectProcessingTime.documentList(state, {
      active: true,
      sortBy: "hours",
      orderBy: "asc"
    })
  );

  // props
  const {
    name,
    label,
    isRequired,
    performReset,
    isAvailableInAllIndia,
    defaultValue,
    value
  } = props;

  // states
  const [contentDelivery, setContentDelivery] =
    useState<ContentDeliveryDocument>(
      defaultValue || value || getInitialContentDeliveryValue()
    );

  // variables
  const returnValue = {
    ...contentDelivery,
    slots: [...(contentDelivery.slots as ContentDeliverySlotDocument[])]
      .filter(({ type, timeSlots }) => type && timeSlots?.length)
      .map((deliverySlot) => {
        const validDeliverySlot = { ...deliverySlot };

        if (!mongoose.Types.ObjectId.isValid(validDeliverySlot._id as string)) {
          delete validDeliverySlot._id;
        }

        return validDeliverySlot;
      })
  };

  // effects
  useEffect(() => {
    if (processingTimeStatus === "idle") {
      dispatch(createProcessingTimeAction.fetchDocumentList());
    }
  }, [processingTimeStatus, dispatch]);

  useEffect(() => {
    if (defaultValue) {
      setContentDelivery(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (value) {
      props.onChangeValue(returnValue as ContentDeliveryDocument);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentDelivery]);

  return (
    <section className="grid grid-cols-1 gap-3 py-3 w-full">
      {label && (
        <FormSubTitle subtitle={label} />
      )}
      <section className="flex flex-col gap-3">
        {isAvailableInAllIndia && (
          <Input
            type="number"
            name="charge"
            isRequired={true}
            labelConfig={{
              label: "Charge"
            }}
            customValue={{
              value: contentDelivery.charge
                ? (contentDelivery.charge as number).toString()
                : "",
              setValue: (charge) => {
                setContentDelivery({
                  ...contentDelivery,
                  charge: Number(charge)
                } as ContentDeliveryDocument);
              }
            }}
            errorCheck={false}
            validCheck={false}
          />
        )}
        <Input
          type="dropdown"
          name="processingTime"
          isRequired
          labelConfig={{
            label: "Processing Time"
          }}
          nullOption
          customInitialValuePlaceholderLabel="Select Processing Time"
          options={processingTimeOptions}
          customValue={{
            value: contentDelivery.processingTime as string,
            setValue: (processingTime) => {
              setContentDelivery({
                ...contentDelivery,
                processingTime
              } as ContentDeliveryDocument);
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
        {/* {!isAvailableInAllIndia && contentDelivery.slots && ( */}
        {contentDelivery.slots && (
          <ContentDeliverySlots
            deliverySlots={contentDelivery.slots}
            onChangeDeliverySlots={(slots) => {
              setContentDelivery({
                ...contentDelivery,
                slots
              } as ContentDeliveryDocument);
            }}
          />
        )}
      </section>
      <input
        className="hidden"
        type="text"
        name={name}
        value={returnValue ? JSON.stringify(returnValue) : ""}
        onChange={() => { }}
      />
    </section>
  );
}
