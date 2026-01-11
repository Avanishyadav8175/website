import { INRSymbol } from "@/common/constants/symbols";
import { extractPrice } from "@/common/helpers/cartMappers/funnelDownToCart";
import { updateMasterCartPrices } from "@/common/helpers/cartMappers/manageCartContext";
import { AddonDocument } from "@/common/types/documentation/contents/addon";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { CartDocument } from "@/common/types/documentation/dynamic/cart";
import { OrderDocument } from "@/common/types/documentation/dynamic/order";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { CartItemUploadedTextDocument } from "@/common/types/documentation/nestedDocuments/cartItemUploadedText";
import { DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { EnhancementDocument } from "@/common/types/documentation/presets/enhancement";
import { FlavourDocument } from "@/common/types/documentation/presets/flavour";
import { UpgradeDocument } from "@/common/types/documentation/presets/upgrade";
import { SetStateType } from "@/common/types/reactTypes";
import { BasicImageType } from "@/common/types/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { OPTIMIZE_IMAGE } from "@/config/image";
import { getCustomVariant } from "@/hooks/useOptimizedCart/utils/getCustomVariant";
import {
  Check,
  ChevronDown,
  Download,
  SparklesIcon,
  Truck,
  X
} from "lucide-react";
import moment from "moment";
import Image from "next/image";

export default function OrderDetailsPopup({
  inAdmin,
  open,
  setOpen,
  order,
  adminCart,
  retryPayment,
  downloadInvoice
}: {
  inAdmin?: boolean;
  open: boolean;
  setOpen: SetStateType<boolean>;
  order: OrderDocument;
  adminCart?: CartDocument;
  retryPayment: () => void;
  downloadInvoice: () => void;
}) {
  const { id, cart: orderCart, createdAt, payment } = order;

  const cart = inAdmin
    ? (adminCart as CartDocument)
    : (orderCart as CartDocument);

  const city = cart.checkout ? cart.checkout.location.city : "Unknown";
  const bookingDate = moment(createdAt).format("DD MMM YY, hh:mm A");

  const address = cart.checkout ? cart.checkout.location.address : "";

  const orders: {
    img: BasicImageType;
    name: string;
    status: "in-progress" | "cancelled" | "ordered" | "delivered";
    addons: {
      img: BasicImageType;
      name: string;
      quantity: number;
      pricePerUnit: number;
    }[];
    date: string;
    time: string;
    quantity: number;
    pricePerUnit: number;
    customizations: {
      flavor?: { label: string; price: number };
      colors?: string;
      text?: string;
      upgrade?: { label: string; price: number };
      enhancement?: { label: string; price: number }[];
    };
  }[] = cart.items.map((item) => {
    const {
      status,
      content: itemContent,
      customVariant: customVariantId,
      titleIfCustomVariant,
      pricePerUnit
    } = item;
    const { quantity, delivery, addons, customization } = item;

    const content = itemContent as ContentDocument;
    const customVariant = item.customVariant
      ? getCustomVariant({ content, variantId: item.customVariant })
      : null;
    const itemStatus: "cancelled" | "delivered" | "ordered" | "in-progress" =
      status === "completed"
        ? "delivered"
        : status === "new"
          ? "ordered"
          : status === "preparing" || status === "on-the-way"
            ? "in-progress"
            : status;

    return {
      img: {
        alt: customVariant?.image
          ? customVariant.image.alt || customVariant.image.defaultAlt || ""
          : (content.media.primary as ImageDocument).alt ||
            (content.media.primary as ImageDocument).defaultAlt ||
            "",
        url: customVariant?.image
          ? customVariant.image.url || ""
          : (content.media.primary as ImageDocument).url || ""
      },
      name: customVariant ? customVariant.name : content.name,
      status: itemStatus,
      addons:
        addons && addons.length > 0
          ? addons.map(({ quantity, pricePerUnit, addon }) => ({
              img: {
                url: ((addon as AddonDocument).image as ImageDocument).url,
                alt:
                  ((addon as AddonDocument).image as ImageDocument).alt ||
                  ((addon as AddonDocument).image as ImageDocument)
                    .defaultAlt ||
                  ""
              },
              name: (addon as AddonDocument).name,
              quantity,
              pricePerUnit
            }))
          : [],
      date: moment(delivery.date).format("Do MMM, YYYY"),
      pricePerUnit,
      quantity,
      time:
        (delivery?.type as DeliveryTypeDocument)?.timeSlots?.length > 0
          ? (delivery.type as DeliveryTypeDocument).timeSlots.find(
              ({ _id }) => (_id as string) === delivery.slot
            )?.label || ""
          : "",
      customizations: {
        flavor:
          customization && customization.flavour
            ? {
                label: (customization.flavour.flavour as FlavourDocument).name,
                price: customization.flavour.price
              }
            : undefined,
        upgrade:
          customization && customization.upgrade
            ? {
                label: (customization.upgrade.upgrade as UpgradeDocument).label,
                price: customization.upgrade.price
              }
            : undefined,
        colors:
          customization && customization.balloonColor
            ? customization.balloonColor
            : undefined,
        text:
          customization && customization.uploadedText
            ? (customization.uploadedText as CartItemUploadedTextDocument).text
            : undefined,
        enhancement:
          customization &&
          customization.enhancement &&
          customization.enhancement.items.length > 0
            ? customization.enhancement.items.map(({ enhancement, price }) => ({
                price,
                label: (enhancement as EnhancementDocument).label
              }))
            : undefined
      }
    };
  });

  const handleRetry = () => {
    setOpen(false);
    retryPayment();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="flex flex-col justify-start items-stretch min-w-fit max-sm:w-device max-sm:h-device max-w-[850px] h-[92dvh] px-3.5 pt-6 pb-0 sm:px-6 sm:pt-8 bg-ivory-1 rounded-none sm:rounded-2xl outline-none border-none">
        <div className="flex flex-col items-stretch justify-start gap-0.5">
          {/* HEADING ----------------------------------------------------- */}
          <div className="flex items-center justify-start gap-3.5 max-sm:pt-1">
            <span className="font-medium text-charcoal-3 text-[20px] sm:block hidden">
              Order details #{id}
            </span>
            <span className="font-medium text-charcoal-3 text-[20px] sm:hidden block">
              Order #{id}
            </span>
          </div>

          {/* DATE, CITY, PAYMENT STATUS AND INVOICE -------------------------------------------------------------- */}
          <div className="flex max-sm:flex-col gap-[2px] sm:gap-2 mt-[3px] relative">
            <span className="sm:bg-sienna-1/10 sm:text-sienna text-[14px] sm:py-1 sm:px-3 sm:rounded-xl sm:-translate-x-2 font-medium max-sm:text-zinc-500/80 max-sm:w-fit">
              City: {city}
            </span>
            <span className="sm:bg-sienna-1/10 sm:text-sienna text-[14px] sm:py-1 sm:px-3 sm:rounded-xl sm:-translate-x-2 font-medium max-sm:text-zinc-500/80 max-sm:w-fit">
              Booked on: {bookingDate}
            </span>

            <div className="max-sm:flex max-sm:items-center max-sm:justify-between max-sm:mt-[20px] text-[14px] ">
              {/* PAYMENT STATUS ------------------------------------------- */}
              <div className="sm:hidden ">
                {payment.status === "pending" ? (
                  <div className="text-red-600 font-semibold flex flex-col items-start">
                    <span>Payment failed</span>
                    <span
                      className="underline underline-offset-2 cursor-pointer "
                      onClick={handleRetry}
                    >
                      Retry
                    </span>
                  </div>
                ) : (
                  <div className="text-green-600 font-semibold text-[14px]">
                    Payment successful
                  </div>
                )}
              </div>
              {/* INVOICE -------------------------------- */}
              {/* <div
                onClick={downloadInvoice}
                className="sm:absolute sm:right-0 transition-colors max-sm:border-neutral-300 max-sm:border-[1.5px] max-sm:rounded-xl max-sm:p-1.5 max-sm:px-[8.5px] hover:text-sienna cursor-pointer flex items-center justify-center gap-1.5 "
              >
                <Download
                  width={15}
                  height={15}
                />{" "}
                <span>Download Invoice</span>
              </div> */}
            </div>
          </div>
        </div>

        {/* === [ CONTENTS DATA ] ============================================================ */}
        <div className="flex flex-col items-stretch justify-start gap-[3px] mt-[16px] max-sm:max-w-[calc(100dvw_-_28px)]">
          <div className="min-h-[100px] relative flex flex-col items-stretch justify-start max-h-[calc(100dvh_-_167px)] sm:max-h-[calc(100dvh_-_208px)] max-sm:pb-[44px] overflow-y-scroll scrollbar-hide sm:*:p-3 ">
            {/* ORDER ITEM -------------------------------------- */}
            {orders.length > 0 &&
              orders.map(
                (
                  {
                    img: { url, alt },
                    name,
                    status,
                    addons,
                    date,
                    time,
                    quantity,
                    pricePerUnit,
                    customizations: {
                      colors,
                      enhancement,
                      flavor,
                      text,
                      upgrade
                    }
                  },
                  index
                ) => {
                  const totalCustomizations = [
                    flavor,
                    upgrade,
                    colors,
                    text,
                    ...(enhancement || [])
                  ].reduce(
                    (sum, val) => (val !== undefined ? (sum += 1) : (sum += 0)),
                    0
                  );

                  return (
                    <div
                      className={`grid grid-cols-[60px_auto] sm:grid-cols-[60px_4fr_1fr_1.5fr] gap-3 max-sm:py-3 items-start border-t-[1.2px] border-dashed ${index !== 0 ? "border-zinc-400" : "border-transparent"}`}
                      key={index}
                    >
                      {/* THUMBNAIL =============== */}
                      <div className="aspect-square rounded-xl relative overflow-hidden bg-zinc-400 max-sm:row-span-2">
                        <Image
                          src={url}
                          alt={alt || "Content Image"}
                          unoptimized={!OPTIMIZE_IMAGE}
                          decoding="async"
                          width={60}
                          height={60}
                          className="object-cover object-center w-full h-full"
                        />
                      </div>
                      {/* DETAILS =============== */}
                      <div className="flex flex-col items-stretch justify-center">
                        <span className="font-medium truncate">{name}</span>
                        <span className="leading-[1.3] sm:leading-tight text-zinc-500 text-sm">
                          Quantity: x{quantity}
                        </span>
                        <span className="leading-[1.3] sm:leading-tight text-zinc-500 text-sm">
                          <span className="max-sm:hidden">Booking for:</span>
                          {` ${date}${time ? ` (${time})` : ""}`}
                        </span>

                        {totalCustomizations > 0 && (
                          <span>
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="text-sm sm:mt-0.5 text-blue-400 w-fit flex items-center justify-start gap-x-2 row-start-7 col-start-2 cursor-pointer">
                                  <SparklesIcon
                                    strokeWidth={2}
                                    height={14}
                                    width={14}
                                  />
                                  <span className="w-fit">
                                    {totalCustomizations} customizations
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
                                className="p-0 outline-none border-none rounded-2xl bg-transparent min-w-fit z-[999]"
                              >
                                <div className="grid grid-cols-[auto_auto] rounded-2xl p-3 px-4 gap-x-3 gap-y-1.5 text-charcoal-3/80 bg-[#fcfcfa] border border-sienna-2/20">
                                  {enhancement && (
                                    <>
                                      <span className="col-span-2 text-sm font-medium underline underline-offset-4 text-charcoal-3/80">
                                        Selected Enhancements
                                      </span>
                                      {enhancement.map(
                                        ({ label, price }, index) => (
                                          <>
                                            <span className="whitespace-nowrap flex items-center justify-start text-sm">
                                              {label}
                                            </span>
                                            <span className="whitespace-nowrap flex items-center justify-end text-sm">
                                              {INRSymbol}
                                              {price}
                                            </span>
                                          </>
                                        )
                                      )}
                                    </>
                                  )}

                                  {flavor && (
                                    <>
                                      <span className="col-span-2 text-sm font-medium underline underline-offset-4 text-charcoal-3/80 pt-2">
                                        Selected Flavor
                                      </span>
                                      <span className="whitespace-nowrap flex items-center justify-start text-sm">
                                        {flavor.label}
                                      </span>
                                      <span className="whitespace-nowrap flex items-center justify-end text-sm">
                                        {flavor.price > 0
                                          ? `${INRSymbol}${flavor.price}`
                                          : "Default"}
                                      </span>
                                    </>
                                  )}

                                  {upgrade && (
                                    <>
                                      <span className="col-span-2 text-sm font-medium underline underline-offset-4 text-charcoal-3/80 pt-2">
                                        Selected Upgrade
                                      </span>
                                      <span className="whitespace-nowrap flex items-center justify-start text-sm">
                                        {upgrade.label}
                                      </span>
                                      <span className="whitespace-nowrap flex items-center justify-end text-sm">
                                        {upgrade.price > 0
                                          ? `${INRSymbol}${upgrade.price}`
                                          : "Default"}
                                      </span>
                                    </>
                                  )}

                                  {colors && (
                                    <>
                                      <span className="col-span-2 text-sm font-medium underline underline-offset-4 text-charcoal-3/80 pt-2">
                                        Selected Balloon Colors
                                      </span>
                                      <span className="col-span-2 text-sm">
                                        {colors
                                          .split(",")
                                          .map((x) => x.trim())
                                          .join(", ")}
                                      </span>
                                    </>
                                  )}

                                  {text && (
                                    <>
                                      <span className="col-span-2 text-sm font-medium underline underline-offset-4 text-charcoal-3/80 pt-2">
                                        Selected Text on Cake
                                      </span>
                                      <span className="col-span-2 text-sm">
                                        &quot;{text}&quot;
                                      </span>
                                    </>
                                  )}
                                </div>
                              </PopoverContent>
                            </Popover>
                          </span>
                        )}
                      </div>
                      {/* STATUS =============== */}
                      <div className="flex items-center justify-center max-sm:hidden sm:mt-1">
                        <OrderCompletionBadge status={status} />
                      </div>
                      {/* PRICE =============== */}
                      <div className="flex items-center justify-between sm:justify-end sm:mt-1">
                        <span className="font-medium">
                          {" "}
                          ₹ {pricePerUnit * quantity}
                        </span>
                        <span className="scale-95 sm:hidden">
                          <OrderCompletionBadge status={status} />
                        </span>
                      </div>

                      {/* ADDONS IF ANY ================= */}
                      {addons && addons.length ? (
                        <div className="col-span-2 sm:col-span-4 max-sm:my-[5px] flex items-center justify-start gap-[10px] sm:gap-3 scrollbar-hide overflow-x-scroll">
                          {addons.map(
                            (
                              {
                                img: { url: addonUrl, alt: addonAlt },
                                name: addonName,
                                quantity: addonQuantity,
                                pricePerUnit: addonPricePerUnit
                              },
                              addonIndex
                            ) => (
                              <div
                                className="p-2 rounded-xl bg-charcoal-3/5 text-charcoal-3 border border-charcoal-3/15 grid grid-cols-[40px_auto] gap-2.5 text-[16px] min-w-[180px] max-w-[180px]"
                                key={addonIndex}
                              >
                                <div className="aspect-square rounded-xl overflow-hidden relative bg-zinc-300">
                                  <Image
                                    src={addonUrl}
                                    alt={addonAlt || "Addon Image"}
                                    height={50}
                                    width={50}
                                    unoptimized={!OPTIMIZE_IMAGE}
                                    decoding="async"
                                    className="w-full h-full object-center object-cover"
                                  />
                                </div>
                                <div className="flex flex-col justify-start max-w-[112px]">
                                  <span className="truncate w-full text-sm font-medium">
                                    {addonName}
                                  </span>
                                  <div className="flex items-baseline justify-between text-sm">
                                    <span>
                                      ₹ {addonPricePerUnit} x {addonQuantity}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                }
              )}

            {/* OVERALL FINAL PRICE -------------------------------------------------------------- */}
            <div
              className={`grid grid-cols-[1fr_1fr] relative max-sm:pt-[80px] sm:grid-cols-[60px_4fr_1fr_1.5fr] gap-3 items-center border-t-[1.2px] border-dashed border-zinc-400`}
            >
              <span className="max-sm:hidden sm:col-span-2 flex flex-col justify-between h-full ">
                <span className="text-[15px] grid grid-cols-[20px_auto] gap-1 items-start sm:pl-1.5">
                  <Truck
                    width={16}
                    height={16}
                    className="translate-y-[3px]"
                  />
                  <span>Address: {address}</span>
                </span>
                {payment.status === "pending" ? (
                  <div className="py-[3px] px-[9px] pr-[11px] text-red-600 bg-red-200/80 rounded-xl font-semibold text-[14px] flex items-center gap-1 w-fit">
                    <X
                      width={16}
                      height={16}
                      className="translate-y-[-1px]"
                    />
                    <span>
                      {"  Payment failed: "}
                      <span
                        className="underline underline-offset-2 cursor-pointer px-1"
                        onClick={handleRetry}
                      >
                        {" Retry"}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="py-[3px] px-[9px] pr-[11px] text-green-600 bg-green-200/80 rounded-xl font-semibold text-[14px] flex items-center gap-1 w-fit">
                    <Check
                      width={16}
                      height={16}
                    />
                    {" Payment successful"}
                  </div>
                )}
              </span>
              <span className="absolute text-zinc-500 top-0 my-[18px] text-[15px] line-clamp-2 sm:hidden">
                Delivery at: {address}
              </span>
              <div className="flex flex-col justify-center items-start sm:pl-[14px] gap-[3px]">
                <span className="text-lg font-semibold whitespace-nowrap">
                  Total amount
                </span>
                {cart.price.couponDiscount ? (
                  <span className="text whitespace-nowrap text-sm">
                    Applied Coupon{" "}
                  </span>
                ) : (
                  <></>
                )}
                <span className="text-green-800 text-sm">
                  {payment.status === "pending"
                    ? "Amount Payable"
                    : "Amount Paid"}
                </span>
                <span className="text-red-500 text-sm">Amount Due</span>
              </div>
              <div className="flex flex-col justify-center items-end gap-[3px]">
                <span className="text-lg font-semibold whitespace-nowrap">
                  ₹ {cart.price.total + (cart.price.couponDiscount || 0)}
                </span>
                {cart.price.couponDiscount ? (
                  <span className="text-sm">
                    - ₹ {cart.price.couponDiscount}
                  </span>
                ) : (
                  <></>
                )}
                <span className="text-green-800 text-sm">
                  ₹ {cart.price.payable}
                </span>
                <span className="text-red-500 text-sm">₹ {cart.price.due}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function OrderCompletionBadge({
  status
}: {
  status: "in-progress" | "cancelled" | "ordered" | "delivered";
}) {
  return (
    <span
      className={`capitalize translate-y-[2px] px-[8px] py-[2px] text-white ${status === "delivered" ? "bg-green-600" : status === "cancelled" ? "bg-red-500" : status === "ordered" ? "bg-sienna" : "bg-amber-600"} rounded-lg text-center text-[13px] sm:font-medium`}
    >
      {status}
    </span>
  );
}
