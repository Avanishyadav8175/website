import { INRSymbol } from "@/common/constants/symbols";
import { formattedDate } from "@/common/utils/formattedDate";
import { VegSymbol } from "@/components/(_common)/Symbols/Edibles";
import {
  Calendar,
  ChevronDown,
  CirclePlus,
  Clock3,
  Gift,
  PenLine,
  SparklesIcon,
  SquarePen,
  Trash2Icon,
  Truck,
  Type
} from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { CartItemChoiceType } from "../../static/types";
import { CartItemType } from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";
import { useMediaQuery, useWindowSize } from "usehooks-ts";
import { IS_MOBILE } from "@/common/constants/mediaQueries";
import FrontendCartAddonsSuggestions from "./CartAddonSuggestions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { OPTIMIZE_IMAGE } from "@/config/image";
import { EnhancementDocument } from "@/common/types/documentation/presets/enhancement";
import { FlavourDocument } from "@/common/types/documentation/presets/flavour";
import { UpgradeDocument } from "@/common/types/documentation/presets/upgrade";
import SelectDateTimePopup from "@/components/(frontend)/products/SelectDateTime/SelectDateTimePopup";
import { isToday, isTomorrow } from "@/common/helpers/dateCheck";
import { ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";
import { useToast } from "@/components/ui/use-toast";
import { TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";
import Link from "next/link";

export default function FrontendCartItem({
  itemChoice,
  cartItem,
  updateChoices,
  deleteItem,
  itemAlreadyInCartWithSelectedDate
}: {
  itemChoice: CartItemChoiceType;
  cartItem: CartItemType | undefined;
  updateChoices: (
    newCartItems: CartItemType,
    newChoices: CartItemChoiceType
  ) => void;
  deleteItem: () => void;
  itemAlreadyInCartWithSelectedDate: ({
    contentId,
    selectedDate
  }: {
    contentId: string;
    selectedDate: Date;
  }) => boolean;
}) {
  const [binClicked, setBinClicked] = useState<{
    fromIcon: boolean;
    elsewhere: boolean;
  }>({ fromIcon: false, elsewhere: false });
  const [swipeItem, setSwipeItem] = useState<boolean>(false);
  const [showTextarea, setShowTextarea] = useState<boolean>(false);

  // DATE TIME EDIT STATES -----------
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editType, setEditType] = useState<"date" | "time" | "none">("none");
  const [itemIdInQ, setItemIdInQ] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [todayDelivery, setTodayDelivery] = useState<boolean>(true);
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [selectedDeliveryType, setSelectedDeliveryType] = useState<
    string | undefined
  >();
  const [selectedTimeString, setSelectedTimeString] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const isMobile = useMediaQuery(IS_MOBILE);
  const dateTimeSlideContainerId = useId();
  const { width = 0 } = useWindowSize();
  const { toast } = useToast();

  const collapseShowingDelete = () => {
    if (binClicked.fromIcon) {
      setBinClicked((prev) => ({ elsewhere: true, fromIcon: false }));
    }
  };

  const handleCount = {
    increase: () => {
      const newCount = Math.min(999, itemChoice.count + 1);
      if (cartItem) updateChoices(cartItem, { ...itemChoice, count: newCount });
    },
    decrease: () => {
      const newCount = Math.max(1, itemChoice.count - 1);
      if (cartItem) updateChoices(cartItem, { ...itemChoice, count: newCount });
    }
  };

  const animateDelete = (selectedId: string) => {
    setBinClicked((prev) => ({ elsewhere: true, fromIcon: false }));
    setSwipeItem((prev) => true);
    setTimeout(() => {
      deleteItem();
    }, 450);
    setTimeout(() => {
      setSwipeItem((prev) => false);
      setBinClicked((prev) => ({ elsewhere: false, fromIcon: false }));
    }, 500);
  };

  const handleAddon = {
    addition: (id: string) => {
      const addonInQuestion = cartItem?.addons.find(({ _id }) => _id === id);
      if (addonInQuestion) {
        const updatedChoice: CartItemChoiceType = {
          ...itemChoice,
          addons: itemChoice.addons.find(({ _id }) => _id === id)
            ? itemChoice.addons
            : [...itemChoice.addons, { ...addonInQuestion, count: 1 }]
        };

        if (cartItem) updateChoices(cartItem, updatedChoice);
      }
    },

    updation: (id: string, type: "increase" | "decrease") => {
      const addonInQuestion = itemChoice?.addons.find(({ _id }) => _id === id);
      if (addonInQuestion) {
        const updatedChoice: CartItemChoiceType = {
          ...itemChoice,
          addons: itemChoice.addons.map((addon) =>
            addon._id === id
              ? {
                  ...addon,
                  count:
                    type === "increase"
                      ? Math.min(addon.count + 1, 999)
                      : Math.max(addon.count - 1, 1)
                }
              : addon
          )
        };

        if (cartItem) updateChoices(cartItem, updatedChoice);
      }
    },

    deletion: (id: string) => {
      const addonToDelete = itemChoice?.addons.find(({ _id }) => _id === id);
      if (addonToDelete) {
        const updatedChoice: CartItemChoiceType = {
          ...itemChoice,
          addons: itemChoice.addons.filter(({ _id }) => _id !== id)
        };

        if (cartItem) updateChoices(cartItem, updatedChoice);
      }
    }
  };

  const cleanupEditDateTime = () => {
    setOpenEdit((prev) => false);
    setItemIdInQ((prev) => null);
    setTimeout(() => setEditType((prev) => "none"), 200);
  };

  const handleEditDate = () => {
    if (selectedDate === undefined) return;

    if (
      itemAlreadyInCartWithSelectedDate({
        contentId: cartItem ? cartItem.contentId : "",
        selectedDate
      })
    ) {
      toast({
        title: "Careful!",
        description: "Cart already has the item with that date",
        variant: "destructive"
      });
      return;
    }

    if (cartItem) {
      updateChoices({ ...cartItem, date: selectedDate }, itemChoice);
      toast({
        title: "Updated!",
        description: "Date successfully updated",
        variant: "success"
      });
    }
    cleanupEditDateTime();
  };

  const handleEditTime = () => {
    if (cartItem) {
      updateChoices(
        {
          ...cartItem,
          deliveryType:
            selectedDeliveryType === undefined ? null : selectedDeliveryType,
          time: {
            ...cartItem.time,
            _id: selectedTime || ""
          } as TimeSlotDocument
        },
        itemChoice
      );
      toast({
        title: "Updated!",
        description: "Timeslot successfully updated",
        variant: "success"
      });
    }
    cleanupEditDateTime();
  };

  useEffect(() => {
    const updateStartTime = () => {
      const hrs = new Date().getHours() + 1;
      let readyTime =
        hrs +
        ((cartItem?.deliveryDocument?.processingTime as ProcessingTimeDocument)
          .hours || 0);

      if (readyTime >= 24) {
        readyTime %= 24;
        setTodayDelivery((prev) => false);
      } else setTodayDelivery((prev) => true);

      setStartTime((prev) => readyTime);
    };

    const interval = setInterval(updateStartTime, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectedDate((prev) => cartItem?.date);
    setSelectedTime((prev) => cartItem?.time._id as string);
    setSelectedDeliveryType((prev) =>
      cartItem?.deliveryDocument?.slots
        ? (cartItem?.deliveryDocument?.slots[0]._id as string)
        : ""
    );
  }, [cartItem, openEdit]);

  if (!cartItem) return <></>;

  return (
    <>
      <section
        className={`grid auto-rows-min ${swipeItem ? "transition-all duration-300 scale-0" : ""}`}
      >
        {/* PRIMARY CARD ----------------------------------------- */}
        <div
          className={`relative z-50 grid *:row-start-1 *:col-start-1 rounded-3xl overflow-hidden max-sm:shadow-light transition-all duration-300`}
        >
          {/* WHITE FRONT CARD =============================================================== */}
          <div
            onTouchMove={collapseShowingDelete}
            onTouchEnd={collapseShowingDelete}
            onClick={collapseShowingDelete}
            className={`z-30 grid grid-cols-[auto_1fr_99px] sm:grid-cols-[auto_1fr_150px] grid-rows-[repeat(9,auto)] sm:grid-rows-[repeat(9,auto)] gap-x-2.5 sm:gap-x-3.5 auto-rows-min bg-ivory-1 py-2.5 sm:py-3.5 rounded-3xl transition-all duration-300 shadow-light sm:border sm:border-charcoal-3/25 ${binClicked.fromIcon ? "-translate-x-20 sm:-translate-x-28 border-charcoal-3/25" : ""}`}
          >
            {/* IMAGE ------------------ */}
            <Link
              href={cartItem?.link || "#"}
              // prefetch
              className="ml-2.5 sm:ml-3.5 relative aspect-square rounded-2xl overflow-hidden bg-ash w-[75px] sm:w-[150px] row-span-3 sm:row-span-7"
            >
              <Image
                src={cartItem.image.url}
                alt="Content Image"
                width={300}
                height={300}
                unoptimized={!OPTIMIZE_IMAGE}
                priority
                decoding="async"
                className="w-full h-full object-cover object-center"
                draggable={false}
              />
              {cartItem.edibleType !== "non-edible" &&
              cartItem.edibleType !== "unspecified" ? (
                <span className="absolute top-1 sm:-top-1 max-sm:left-1 sm:-left-1">
                  {cartItem.edibleType === "veg" ? (
                    <VegSymbol className="w-[16px] sm:scale-[0.55]" />
                  ) : (
                    <VegSymbol className="w-[16px] sm:scale-[0.55]" />
                  )}
                </span>
              ) : (
                <></>
              )}
            </Link>

            {/* TITLE ......................... */}
            <span className="text-charcoal-3/70 text-[15px] sm:text-[17px] pt-0.5 pb-0.5 grid items-start sm:items-center justify-start gap-1">
              <span className="line-clamp-2 leading-tight">
                {cartItem.name}
              </span>
            </span>

            {/* DELETE + INCREASE/DECREASE ......................... */}
            <div className="pr-3 sm:pr-4 sm:mt-1 justify-self-end row-span-2 col-start-3 row-start-1 max-sm:pt-1 flex items-start justify-end gap-x-2 sm:gap-x-3.5">
              <div
                className={`text-red-600 translate-y-0.5 px-1 transition-all duration-300 cursor-pointer ${binClicked.fromIcon ? "pointer-events-none opacity-0" : "opacity-100"}`}
                onClick={() => {
                  setBinClicked((prev) => ({
                    fromIcon: true,
                    elsewhere: false
                  }));
                }}
              >
                <Trash2Icon
                  strokeWidth={1.5}
                  width={17}
                />
              </div>

              <div className="border sm:border-[1.5px] mb-1.5 border-sienna bg-sienna-1/10 text-sienna font-medium flex items-center justify-between gap-x-1 sm:gap-x-1.5 px-1.5 sm:px-2.5 py-0.5  rounded-lg w-fit h-fit">
                <span
                  onClick={handleCount.decrease}
                  className="cursor-pointer"
                >
                  -
                </span>
                <span className="text-center min-w-7 sm:min-w-8">
                  {itemChoice.count}
                </span>
                <span
                  onClick={handleCount.increase}
                  className="cursor-pointer"
                >
                  +
                </span>
              </div>
            </div>

            {/* PRICE ......................... */}
            <span className="text-sienna text-[18px] max-sm:font-medium mt-2 sm:my-1 sm:text-[22px] max-sm:-translate-y-1 leading-none max-sm:self-center">
              {INRSymbol} {cartItem.pricePerUnit * itemChoice.count}
            </span>

            {/* TEXT ON CAKE, IF IT EXISTS ---------------- */}
            {cartItem.customizations.data &&
            cartItem.customizations.data.uploadedText &&
            cartItem.customizations.data.uploadedText.text &&
            cartItem.customizations.data.uploadedText.text.length > 0 ? (
              <div className="text-sm text-charcoal-3/60 flex items-center justify-start gap-x-2 col-start-2 max-sm:col-start-2 sm:translate-y-[3px]">
                <SquarePen
                  strokeWidth={2}
                  height={14}
                  width={14}
                />
                <span className="truncate max-sm:max-w-[45dvw]">{`"${cartItem.customizations.data.uploadedText.text || ""}"`}</span>
              </div>
            ) : (
              <></>
            )}

            {/* DATE ---------------- */}
            <div className="text-sm text-charcoal-3/60 flex items-center justify-start gap-x-2 row-start-5 col-start-2 max-sm:row-start-4 max-sm:col-start-2">
              <Calendar
                strokeWidth={2}
                height={14}
                width={14}
              />
              <span>{formattedDate(cartItem.date, "SHORT")}</span>
            </div>

            {/* EDIT DATE ---------------- */}
            <span
              onClick={() => {
                setOpenEdit((prev) => true);
                setEditType((prev) => "date");
                setItemIdInQ((prev) => cartItem._id);
              }}
              className="pr-3 sm:pr-4 text-sm underline underline-offset-2 flex items-center justify-end gap-1 sm:row-start-5 sm:col-start-3 cursor-pointer text-charcoal-3/70 max-sm:row-start-4 max-sm:col-start-3"
            >
              <span>Edit</span>
            </span>

            {/* TIME ---------------- */}
            <div className="max-sm:my-1 text-sm mt-0.5 text-charcoal-3/60 flex items-center justify-start gap-x-2 row-start-6 col-start-2 max-sm:row-start-5 max-sm:col-start-2 max-sm:col-span-2">
              <Clock3
                strokeWidth={2}
                height={14}
                width={14}
              />
              <span>{cartItem.time.label}</span>
              <span className="flex text-xs text-ivory-2 italic items-center justify-start gap-1 py-[1px] sm:py-0.5 px-2 translate-y-[1px] rounded-md bg-sienna/80 max-sm:hidden">
                <Truck
                  strokeWidth={1.5}
                  width={13}
                  height={13}
                />{" "}
                <span>
                  {cartItem.deliveryType === null
                    ? "Normal"
                    : cartItem.deliveryType?.split(" ")[0]}
                </span>
              </span>
              <span className="sm:hidden -translate-x-0.5">
                {" "}
                {cartItem.deliveryType === null
                  ? "Normal"
                  : cartItem.deliveryType?.split(" ")[0]}
              </span>
            </div>

            {/* EDIT TIME ---------------- */}
            <span
              onClick={() => {
                setOpenEdit((prev) => true);
                setEditType((prev) => "time");
                setItemIdInQ((prev) => cartItem._id);
              }}
              className="pr-3 sm:pr-4 text-sm underline underline-offset-2 flex items-center justify-end gap-1 sm:row-start-6 sm:col-start-3 cursor-pointer text-charcoal-3/70 max-sm:row-start-5 max-sm:col-start-3"
            >
              <span>Edit</span>
            </span>

            {/* CUSTOMIZATIONS ---------------- */}
            {cartItem.customizations.count > 0 &&
            cartItem.customizations.data ? (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="text-sm sm:mt-0.5 text-blue-400 w-fit flex items-center justify-start gap-x-2 row-start-7 col-start-2 cursor-pointer">
                    <SparklesIcon
                      strokeWidth={2}
                      height={14}
                      width={14}
                    />
                    <span className="w-fit">
                      {cartItem.customizations.count} customizations
                    </span>
                    <ChevronDown
                      strokeWidth={1.5}
                      width={14}
                      className="sm:translate-y-[1px]"
                    />
                  </div>
                </PopoverTrigger>

                <PopoverContent
                  side="bottom"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  className="p-0 outline-none border-none rounded-2xl bg-transparent min-w-fit"
                >
                  <div className="flex flex-col justify-start rounded-2xl p-5 gap-3 text-charcoal-3/80 bg-[#fcfcfa] border border-sienna-2/20">
                    {[
                      ...(cartItem.customizations.data.enhancement &&
                      cartItem.customizations.data.enhancement.items &&
                      cartItem.customizations.data.enhancement.items.length > 0
                        ? cartItem.customizations.data.enhancement.items.map(
                            ({ price, enhancement }) => ({
                              label: (enhancement as EnhancementDocument).label,
                              price
                            })
                          )
                        : []),
                      ...(cartItem.customizations.data.flavour &&
                      cartItem.customizations.data.flavour.flavour
                        ? [
                            {
                              label: (
                                cartItem.customizations.data.flavour
                                  .flavour as FlavourDocument
                              ).name,
                              price: cartItem.customizations.data.flavour.price
                            }
                          ]
                        : []),
                      ...(cartItem.customizations.data.upgrade &&
                      cartItem.customizations.data.upgrade.upgrade
                        ? [
                            {
                              label: (
                                cartItem.customizations.data.upgrade
                                  .upgrade as UpgradeDocument
                              ).label,
                              price: cartItem.customizations.data.upgrade.price
                            }
                          ]
                        : []),
                      ...(cartItem.customizations.data.balloonColor &&
                      cartItem.customizations.data.balloonColor.length > 0
                        ? [
                            {
                              label: "Balloon Colors",
                              price: cartItem.customizations.data.balloonColor
                            }
                          ]
                        : [])
                    ].map(({ label, price }, index) => (
                      <div
                        className={`flex items-center justify-between ${label.toLowerCase().startsWith("balloon color") ? "border-t border-charcoal-3/20 pt-3" : ""}`}
                        key={index}
                      >
                        <span className="flex items-center justify-start gap-1.5">
                          <span>{label}</span>
                        </span>
                        {price === 0 ? (
                          <span>Default</span>
                        ) : (
                          <span>
                            {label.toLowerCase().startsWith("balloon color")
                              ? ""
                              : INRSymbol}
                            {price}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <></>
            )}

            {/* ADDONS .......................... */}
            <div className="row-start-8 col-start-1 col-span-3 flex flex-col items-stretch justify-start gap-x-5 gap-y-1 px-4 max-sm:my-3 my-2 max-sm:text-sm text-charcoal-3/50 mt-2 sm:mt-4">
              {itemChoice.addons.map(
                ({ _id, name, pricePerUnit, count }, index) => (
                  <div
                    className="flex items-center justify-between gap-3"
                    key={index}
                  >
                    <span className="flex items-center justify-start gap-2 text-charcoal-3/70">
                      <span>{name}</span>
                    </span>
                    <div className="grid grid-cols-[auto_auto_50px] items-center justify-end gap-3.5">
                      <div
                        onClick={() => handleAddon.deletion(_id)}
                        className="transition-all duration-300 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2Icon
                          strokeWidth={1.5}
                          width={15}
                        />
                      </div>
                      <div className="border sm:border-[1.5px] mb-1.5 border-ash bg-ash-1/10 text-charcoal-3/40 translate-y-[2px] font-medium flex items-center justify-between gap-x-1 sm:gap-x-1.5 px-1.5 sm:px-2.5 py-0.5  rounded-lg w-fit h-fit">
                        <span
                          onClick={() => handleAddon.updation(_id, "decrease")}
                          className="cursor-pointer"
                        >
                          -
                        </span>
                        <span className="text-center min-w-7 sm:min-w-8">
                          {count}
                        </span>
                        <span
                          onClick={() => handleAddon.updation(_id, "increase")}
                          className="cursor-pointer"
                        >
                          +
                        </span>
                      </div>
                      <span className="text-right text-charcoal-3/70">
                        {INRSymbol} {pricePerUnit}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* INSTRUCTION .......................... */}
            <div
              onClick={
                !showTextarea ? () => setShowTextarea((prev) => true) : () => {}
              }
              className="cursor-pointer row-start-9 col-start-1 col-span-3 flex items-center justify-between border-t-[2px] pt-3 pb-1 sm:pb-0.5 px-5 sm:px-4 border-dashed border-ash/50 text-charcoal-3/50"
            >
              {showTextarea ? (
                <>
                  <div className="flex items-center justify-start gap-2.5">
                    <PenLine
                      strokeWidth={1.5}
                      width={18}
                    />
                    <textarea
                      name="instruction"
                      title="instruction"
                      value={itemChoice.instruction}
                      onChange={(e) =>
                        updateChoices(cartItem, {
                          ...itemChoice,
                          instruction: e.target.value
                        })
                      }
                      autoFocus
                      className="resize-none bg-transparent outline-none border-none h-6 placeholder-charcoal-3/50 max-sm:w-[calc(100dvw_-_140px)] w-[45dvw] 1200:w-[550px] overflow-x-scroll scrollbar-hide"
                      placeholder="Add Instruction"
                    />
                  </div>
                  <div
                    onClick={() => setShowTextarea((prev) => false)}
                    className="text-sienna font-medium p-0 px-2 pl-4 border-l border-charcoal-3/40 transition-all duration-300 hover:brightness-75"
                  >
                    Done
                  </div>
                </>
              ) : itemChoice.instruction ? (
                <>
                  <span className="ml-1 truncate sm:pr-7 text-charcoal-">
                    {itemChoice.instruction}
                  </span>
                  <PenLine
                    strokeWidth={1.5}
                    width={18}
                    className="mr-1 w-[20px] translate-y-0.5"
                  />
                </>
              ) : (
                <>
                  <span>Add Instruction</span>
                  <CirclePlus strokeWidth={1.5} />
                </>
              )}
            </div>
          </div>

          {/* DELETE ITEM BAR ============================================================ */}
          <div
            onClick={isMobile ? () => animateDelete(cartItem._id) : () => {}}
            className="z-20 text-sm border border-red-500 bg-gradient-to-r from-transparent to-60% to-red-50/50 rounded-3xl text-red-500 flex items-center justify-end max-sm:px-4 px-[17px] max-sm:cursor-pointer"
          >
            <span className="sm:hidden">Remove</span>

            <div className="flex flex-col items-center justify-center max-sm:hidden">
              <span>Remove ?</span>
              <div className="flex items-center justify-center">
                <span
                  className="cursor-pointer px-2 py-1 transition-all duration-300 hover:underline hover:underline-offset-2"
                  onClick={() => animateDelete(cartItem._id)}
                >
                  Yes
                </span>
                <span
                  className="cursor-pointer px-2 py-1 transition-all duration-300 hover:underline hover:underline-offset-2"
                  onClick={() => {
                    setBinClicked((prev) => ({
                      elsewhere: true,
                      fromIcon: false
                    }));
                  }}
                >
                  No
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* INSTRUCTION ISLAND -------------------------- */}
        {/* <div className="relative z-10">
        <div className="-z-10 absolute w-[60px] translate-x-1/2 -translate-y-1/2">
          <div className="aspect-square border-[1.5px] border-r-0 border-charcoal-3/30 rounded-2xl"></div>
        </div>
        <div className="z-[999] grid grid-cols-[60px_1fr] translate-y-[10px] pr-4 sm:pr-10">
          <span></span>
          <div className="w-fit min-w-[260px] sm:max-w-[400px] p-4 bg-ivory-1 border border-charcoal-3/30 rounded-3xl">
            Instruction Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor corporis id aliquam. Cupiditate qui ratione magnam, quos necessitatibus omnis molestias placeat suscipit in ipsum aliquid consequuntur nisi veritatis amet dicta.
          </div>
        </div>
      </div> */}
      </section>

      {/* SECTION TO ADD ADDON */}
      {cartItem.addons.filter(({ _id }) =>
        itemChoice.addons.find((addon) => addon._id === _id) ? false : true
      ).length ? (
        <FrontendCartAddonsSuggestions
          cartItem={cartItem}
          itemChoice={itemChoice}
          addAddon={(id) => handleAddon.addition(id)}
          className={swipeItem ? "transition-all duration-300 scale-0" : ""}
        />
      ) : (
        <></>
      )}

      {/* DATE TIME EDIT POPUP ========================================================================================== */}
      <SelectDateTimePopup
        showDialog={openEdit}
        setShowDialog={setOpenEdit}
        currSliderIndex={editType === "date" ? 0 : 1}
        dateTimeSlideContainerId={dateTimeSlideContainerId}
        details={cartItem.deliveryDocument?.slots || []}
        isTodayTommorow={{
          isToday: isToday(cartItem.date),
          isTommorow: isTomorrow(cartItem.date)
        }}
        onClick={{
          next: editType === "date" ? handleEditDate : handleEditTime,
          prev: cleanupEditDateTime
        }}
        selectedDate={selectedDate}
        selectedDeliveryType={selectedDeliveryType}
        selectedTime={selectedTime}
        setSelectedDate={(selectedDate: Date | undefined) =>
          setSelectedDate((prev) => selectedDate)
        }
        setSelectedDeliveryType={(selectedDeliveryType: string | undefined) =>
          setSelectedDeliveryType((prev) => selectedDeliveryType)
        }
        setSelectedTime={(selectedTime: string | undefined) =>
          setSelectedTime((prev) => selectedTime)
        }
        setTimeString={(selectedTimeString: string) =>
          setSelectedTimeString((prev) => selectedTimeString)
        }
        startTime={startTime}
        todayDelivery={todayDelivery}
        asIndividualCards
      />
    </>
  );
}
