// hooks
import { useEffect, useMemo, useState } from "react";
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import ContentDetailDeliveryDate from "./ContentDetailDeliveryDate";
import ContentDetailDeliveryEarliest from "./ContentDetailDeliveryEarliest";
import ContentDetailDeliveryCity from "./ContentDetailDeliveryCity";

// types
import { type CartItemDeliveryDocument } from "@/common/types/documentation/nestedDocuments/cartItemDelivery";
import { type ContentAvailabilityDocument } from "@/common/types/documentation/nestedDocuments/contentAvailability";
import { type ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { type ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { type ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";
import {
  type SelectDateStatus,
  type SelectCityStatus
} from "../types/delivery";

export default function ContentDetailDelivery({
  id,
  title,
  isAvailable,
  showDeliveryStatus,
  contentAvailability,
  contentDelivery,
  cartItemDelivery,
  onChangeShowDeliveryStatus,
  onChangeCartItemDelivery
}: {
  id: string;
  title: string;
  isAvailable: boolean;
  showDeliveryStatus: boolean;
  contentAvailability: ContentAvailabilityDocument;
  contentDelivery: ContentDeliveryDocument;
  cartItemDelivery: CartItemDeliveryDocument;
  onChangeShowDeliveryStatus: (showDeliveryStatus: boolean) => void;
  onChangeCartItemDelivery: (delivery: CartItemDeliveryDocument) => void;
}) {
  // Early return if contentDelivery is not available
  if (!contentDelivery) {
    return null;
  }

  // hooks
  const {
    location: {
      data: { selectedCity }
    }
  } = useAppStates();

  // states
  const [selectCityStatus, setSelectCityStatus] =
    useState<SelectCityStatus>("");
  const [selectDateStatus, setSelectDateStatus] =
    useState<SelectDateStatus>("");

  const lastDeliverySlotTime = useMemo(() => {
    let maxStartTime = "";

    if (!contentDelivery?.slots || !Array.isArray(contentDelivery.slots)) {
      return maxStartTime;
    }

    (contentDelivery.slots as ContentDeliverySlotDocument[]).forEach(
      ({ type, timeSlots }) => {
        const deliveryType = type as DeliveryTypeDocument;

        deliveryType.timeSlots
          .filter(({ _id }) => (timeSlots as string[]).includes(_id as string))
          .forEach(({ startTime }) => {
            if (maxStartTime) {
              const [hours, minutes] = maxStartTime.split(":").map(Number);
              const [newHours, newMinutes] = startTime.split(":").map(Number);

              if (newHours === hours) {
                if (newMinutes > minutes) {
                  maxStartTime = startTime;
                }
              } else if (newHours > hours) {
                maxStartTime = startTime;
              }
            } else {
              maxStartTime = startTime;
            }
          });
      }
    );

    return maxStartTime;
  }, [contentDelivery]);

  // side effects
  useEffect(() => {
    if (selectedCity) {
      setSelectCityStatus(isAvailable ? "available" : "not-available");
    } else if (showDeliveryStatus) {
      setSelectCityStatus("not-selected");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDeliveryStatus, selectedCity, isAvailable]);

  useEffect(() => {
    if (
      cartItemDelivery?.date &&
      cartItemDelivery?.type &&
      cartItemDelivery?.slot
    ) {
      setSelectDateStatus("selected");
    } else if (showDeliveryStatus) {
      setSelectDateStatus("not-selected");
    }
  }, [
    showDeliveryStatus,
    cartItemDelivery?.date,
    cartItemDelivery?.type,
    cartItemDelivery.slot
  ]);

  useEffect(() => {
    if (selectCityStatus || selectDateStatus) {
      onChangeShowDeliveryStatus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectCityStatus, selectDateStatus]);

  if (contentAvailability.availableAt === "all-india") {
    return (
      <ContentDetailDeliveryEarliest
        isAvailableAtAllIndia={true}
        processingTime={
          (contentDelivery?.processingTime as ProcessingTimeDocument)?.hours || 0
        }
        lastDeliverySlotTime="21:00"
        onChangeDate={(date?: Date) => {
          onChangeCartItemDelivery({
            date: date?.toISOString() || date
          } as CartItemDeliveryDocument);
        }}
      />
    );
  }

  return (
    <div className="bg-ivory-1 border-ash-1/40 sm:border-ash-1 border shadow-sm relative overflow-hidden sm:rounded-2xl pt-10 sm:pt-9 pb-5 px-4 sm:px-6 lg:mr-10">
      <div className="absolute top-0 left-0 bg-ash-1/50 text-sienna-1 pt-2 pb-1.5 font-medium px-5 sm:px-6 rounded-br-xl">{title}</div>
      <div
        id={id}
        className={`grid grid-cols-1 sm:grid-cols-2 sm:gap-x-5 gap-y-2.5 sm:pt-4 max-sm:pt-3`}
      >
        <ContentDetailDeliveryDate
          status={selectDateStatus}
          contentDelivery={contentDelivery}
          lastDeliverySlotTime={lastDeliverySlotTime}
          cartItemDelivery={cartItemDelivery}
          onChangeCartItemDelivery={onChangeCartItemDelivery}
        />
        <ContentDetailDeliveryCity status={selectCityStatus} />
      </div>
      <ContentDetailDeliveryEarliest
        processingTime={
          (contentDelivery?.processingTime as ProcessingTimeDocument)?.hours || 0
        }
        lastDeliverySlotTime={lastDeliverySlotTime}
        onChangeDate={(date?: Date) => {
          onChangeCartItemDelivery({
            date: date?.toISOString() || date
          } as CartItemDeliveryDocument);
        }}
      />
    </div>
  );
}
