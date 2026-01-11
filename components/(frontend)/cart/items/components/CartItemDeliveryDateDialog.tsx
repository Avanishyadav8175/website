// icons
import { CalendarIcon } from "lucide-react";

// utils
import {
  getHoursGapFromDateAndTime,
  getNextSevenDays,
  isSameDate
} from "@/components/(frontend)/content/detail/utils/date";

// hooks
import { useEffect, useMemo, useState } from "react";

// components
import { Calendar } from "@/components/ui/calendar";
import CartItemDeliveryDateItem from "./CartItemDeliveryDateItem";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// types
import { type Matcher } from "react-day-picker";
import { type ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { type ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { type ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";

export default function CartItemDeliveryDateDialog({
  showDialog,
  selectedDate,
  contentDelivery,
  onChangeShowDialog,
  onSelectDate
}: {
  showDialog: boolean;
  selectedDate: Date;
  contentDelivery: ContentDeliveryDocument;
  onChangeShowDialog: (showDialog: boolean) => void;
  onSelectDate: (date: Date) => void;
}) {
  // states
  const [newDate, setNewDate] = useState<Date>(selectedDate);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  // utils
  const pastDates: Matcher = (day: Date): boolean =>
    day.getFullYear() < new Date().getFullYear()
      ? true
      : day.getFullYear() > new Date().getFullYear()
        ? false
        : day.getMonth() < new Date().getMonth()
          ? true
          : day.getMonth() > new Date().getMonth()
            ? false
            : day.getDate() < new Date().getDate()
              ? true
              : false;

  // memoizes
  const lastDeliverySlotTime = useMemo(() => {
    let maxStartTime = "";

    (contentDelivery?.slots as ContentDeliverySlotDocument[] || []).forEach(
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

  // variables
  const orderProcessingTime = (
    contentDelivery?.processingTime as ProcessingTimeDocument
  )?.hours || 0;

  const dates = getNextSevenDays();
  const inDates =
    Boolean(newDate) &&
    Boolean(dates.filter((date) => isSameDate(date, newDate)).length);

  // side effects
  useEffect(() => {
    setNewDate(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDialog]);

  return (
    <Dialog
      open={showDialog}
      onOpenChange={onChangeShowDialog}
    >
      <DialogContent
        aria-describedby="date-selector"
        className="p-0 outline-none border-none bg-transparent w-[calc(100dvw_-_28px)] sm:min-w-[360px] sm:max-w-[360px] sm:h-[480px] scrollbar-hide z-[996]"
      >
        <div className="relative bg-ivory-1 overflow-x-hidden flex items-stretch justify-stretch max-sm:px-3.5 p-5 rounded-2xl sm:py-6 max-sm:pb-16 text-base min-h-fit sm:min-w-[360px] sm:max-w-[360px]">
          <div
            className={`relative flex items-start justify-start *:w-[calc(100dvw_-_56px)] *:sm:w-[320px] space-x-5 transition-all duration-300`}
          >
            <section className="flex flex-col justify-start gap-1">
              <span className="flex items-center justify-start gap-1.5 text-charcoal-2 text-xl">
                <CalendarIcon
                  strokeWidth={1.5}
                  width={21}
                  height={21}
                />
                <span>{" Select Date"}</span>
              </span>
              <div className="grid *:row-start-1 *:col-start-1">
                <div
                  className={`${showCalendar ? "hidden" : ""} grid grid-rows-[auto_auto] gap-2.5 my-4`}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {dates
                      .filter((_, index) => index < 2)
                      .map((date, index) => (
                        <CartItemDeliveryDateItem
                          key={index}
                          date={new Date(date)}
                          selectedDate={newDate}
                          disabled={
                            getHoursGapFromDateAndTime(
                              new Date(date),
                              lastDeliverySlotTime
                            ) < orderProcessingTime
                          }
                          onSelect={setNewDate}
                        />
                      ))}
                  </div>
                  <div className="grid grid-cols-3 grid-rows-2 gap-2.5">
                    {dates
                      .filter((_, index) => index >= 2 && index < 7)
                      .map((date, index) => (
                        <CartItemDeliveryDateItem
                          key={index}
                          date={new Date(date)}
                          selectedDate={newDate}
                          disabled={
                            getHoursGapFromDateAndTime(
                              new Date(date),
                              lastDeliverySlotTime
                            ) < orderProcessingTime
                          }
                          onSelect={setNewDate}
                        />
                      ))}
                    {inDates || !newDate ? (
                      <div
                        className="flex flex-col items-center justify-center gap-1.5 bg-charcoal-3/75 text-ivory-1 rounded-xl text-xs cursor-pointer transition-colors duration-300 hover:bg-charcoal-2/75"
                        onClick={() => {
                          setShowCalendar(true);
                        }}
                      >
                        <CalendarIcon
                          width={19}
                          height={19}
                        />
                        <span>Custom Date</span>
                      </div>
                    ) : (
                      <CartItemDeliveryDateItem
                        date={new Date(newDate!)}
                        selectedDate={newDate}
                        onSelect={() => {
                          setShowCalendar(true);
                        }}
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${showCalendar ? "" : "hidden"} grid justify-stretch sm:justify-center`}
                >
                  <Calendar
                    className="px-0 w-full"
                    mode="single"
                    selected={newDate}
                    disabled={pastDates}
                    onSelect={(date?: Date) => {
                      setNewDate(date!);
                      setShowCalendar(false);
                    }}
                  />
                  <div
                    className="translate-y-8 sm:translate-y-5 w-fit cursor-pointer z-[700] text-charcoal-3/80 text-sm transition-all duration-300 hover:underline-offset-2 hover:underline hover:text-charcoal-2/90"
                    onClick={() => {
                      setShowCalendar(false);
                    }}
                  >
                    This Week
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="absolute bottom-0 grid grid-cols-2 gap-3 sm:gap-4 w-[calc(100dvw_-62px)] sm:w-[320px] ml-5 mb-5">
          <div
            className={`group col-start-2 flex items-center justify-center capitalize py-1.5 gap-0 border-[1px] cursor-pointer bg-charcoal text-ivory-1 border-transparent rounded-lg transition-all duration-200 hover:gap-1`}
            onClick={() => {
              onSelectDate(newDate);
              onChangeShowDialog(false);
            }}
          >
            <span className="font-light">{"Update"}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
