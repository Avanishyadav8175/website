
import { HorizontalSpacing } from "@/components/(frontend)/global/_Spacings/HorizontalSpacings";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  BadgePercent,
  ChevronDown,
  PenLine,
  Send,
  Truck,
  UserRound
} from "lucide-react";
import { useEffect, useState } from "react";
import SelectDeliveryAddressPopupUI from "./components/SelectDeliveryAddressPopupUI";
import { DeliveryDetailsType } from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";
import { useCart } from "@/hooks/useCart";
import { INRSymbol } from "@/common/constants/symbols";

export default function DeliveryAddress({
  isLoggedin,
  setShowLogin,
  openCheckout
}: {
  isLoggedin: boolean;
  setShowLogin: (newShowLogin: boolean) => void;
  openCheckout: boolean;
}) {
  const {
    cartFunctions: {
      updateCartContext: {
        updateDeliveryDetails: updateCartContextDeliveryDetails
      }
    },
    data: {
      deliveryDetails,
      occasions,
      items: cartItems,
      itemDetails: itemChoices
    }
  } = useCart();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dir, setDir] = useState<"up" | "down">("down");
  const [localDeliveryDetails, setLocalDeliveryDetails] =
    useState<DeliveryDetailsType>({
      address: "",
      city: "",
      email: "",
      mobile: "",
      name: "",
      occasion: "",
      pincode: "",
      type: "default"
    });

  useEffect(() => {
    const timer = setInterval(
      () => setDir((prev) => (prev === "down" ? "up" : "down")),
      4000
    );

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (openCheckout && !openDialog) setOpenDialog((prev) => true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCheckout]);

  useEffect(() => {
    setLocalDeliveryDetails((prev) => deliveryDetails);
  }, [deliveryDetails]);

  const savedAmount: number = cartItems
    .map(({ _id, mrp, pricePerUnit }) => ({
      diff: mrp - pricePerUnit,
      count: itemChoices.find((choice) => choice._id === _id)?.count || 0
    }))
    .reduce((total, { diff, count }) => (total += count * diff), 0);

  return (
    <>
      {/* ===[ MOBILE ]========================================== */}
      <div className="bg-ivory-1 sticky top-[44px] z-[800] pb-2.5 px-3.5 border-b border-charcoal-3/15 sm:hidden">
        <div className="rounded-xl bg-green-200/60 font-medium px-3 py-2 text-sm flex items-center justify-start gap-2.5 text-green-500">
          <BadgePercent
            strokeWidth={1.5}
            fill="#22c55e"
            stroke="#bbf7d0"
          />
          <span>
            You are saving {INRSymbol}
            {savedAmount} on this order!
          </span>
        </div>
      </div>

      {/* // ===[ DESKTOP ]========================================== */}
      <HorizontalSpacing className="max-sm:hidden my-3 text-charcoal-3/80">
        <div
          onClick={() =>
            !isLoggedin ? setShowLogin(true) : setOpenDialog((prev) => true)
          }
          className={`relative border border-charcoal-3/20 bg-ivory-1 rounded-2xl px-5 z-50 sm:row-start-2 sm:col-start-1 cursor-pointer grid grid-rows-[50px_50px] sm:grid-rows-[74px_74px] overflow-hidden sm:h-[74px] transition-all duration-300 ${isLoggedin ? "hover:border-charcoal-3/50" : ""}`}
        >
          <div
            className={`py-3.5 grid grid-cols-[auto_1fr_auto] gap-x-3 transition-all duration-500 ${dir === "down" ? "translate-y-[-74px]" : "translate-y-0"}`}
          >
            <span>
              <Truck
                strokeWidth={1.5}
                width={18}
                height={18}
              />
            </span>
            <div className="flex flex-col justify-start items-start truncate">
              <span className="text-sm font-medium text-charcoal-3/90">
                Delivery at:
              </span>
              {deliveryDetails.address ? (
                <span className="flex items-center justify-start gap-1.5">
                  {`${deliveryDetails.address}${deliveryDetails.pincode ? `, ${deliveryDetails.pincode}` : ""}${deliveryDetails.city ? `, ${deliveryDetails.city}` : ""}` ||
                    "Enter Address"}
                  <span>
                    <PenLine
                      width={17}
                      height={17}
                    />
                  </span>
                </span>
              ) : (
                <span className="text-red-500/70 font-medium flex items-center justify-start gap-1.5">
                  <span>Address Is Required</span>{" "}
                  {isLoggedin && (
                    <span>
                      <PenLine
                        width={17}
                        height={17}
                      />
                    </span>
                  )}
                  {!isLoggedin ? (
                    <span className="text-red-600/90 underline underline-offset-2 flex items-center justify-start gap-1">
                      <span>Login</span>
                      <span>
                        <PenLine
                          width={17}
                          height={17}
                        />
                      </span>
                    </span>
                  ) : (
                    <></>
                  )}
                </span>
              )}
            </div>
            <span className="self-center">
              <ChevronDown
                strokeWidth={1.5}
                width={20}
                height={20}
              />
            </span>
          </div>
          <div
            className={`py-3.5 grid grid-cols-[auto_1fr_auto] gap-x-3 transition-all duration-500 ${dir === "down" ? "translate-y-[-74px]" : "translate-y-0"}`}
          >
            <span>
              <UserRound
                strokeWidth={1.5}
                width={18}
                height={18}
              />
            </span>
            <div className="flex flex-col justify-start items-start truncate">
              <span className="text-sm font-medium text-charcoal-3/90">
                User Details:
              </span>
              {deliveryDetails.name &&
              (deliveryDetails.mobile || deliveryDetails.email) ? (
                <span className="flex items-center justify-start gap-1.5">
                  <span>{`${deliveryDetails.name} ${deliveryDetails.mobile ? `• ${deliveryDetails.mobile}` : ""} ${deliveryDetails.email ? `• ${deliveryDetails.email}` : ""}`}</span>
                  <span>
                    <PenLine
                      width={17}
                      height={17}
                    />
                  </span>
                </span>
              ) : (
                <span className="font-medium text-red-500/70 flex items-center justify-start gap-1.5">
                  <span className="flex items-center justify-start gap-1.5">
                    <span>
                      Name{" "}
                      {!deliveryDetails.mobile
                        ? "and Mobile"
                        : !deliveryDetails.email
                          ? "and Email"
                          : ""}{" "}
                      Required
                    </span>
                    {isLoggedin && (
                      <span>
                        <PenLine
                          width={17}
                          height={17}
                        />
                      </span>
                    )}
                  </span>{" "}
                  {!isLoggedin ? (
                    <span className="text-red-600/90 underline underline-offset-2 flex items-center justify-start gap-1">
                      <span>Login</span>
                      <span>
                        <PenLine
                          width={17}
                          height={17}
                        />
                      </span>
                    </span>
                  ) : (
                    <></>
                  )}
                </span>
              )}
            </div>
            <span className="self-center">
              <ChevronDown
                strokeWidth={1.5}
                width={20}
                height={20}
              />
            </span>
          </div>

          {/* LOGIN FIRST COVER -------------------------- */}
          {!isLoggedin ? (
            <div className="absolute w-full h-full bg-ash/30 text-charcoal-3 flex items-center justify-center backdrop-blur-[2px]">
              <span className="font-medium text-lg">Login first</span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </HorizontalSpacing>
      <Dialog
        open={openDialog}
        onOpenChange={setOpenDialog}
      >
        <DialogContent className="outline-none border-none p-0 bg-transparent min-w-fit">
          <SelectDeliveryAddressPopupUI
            closeDialog={() => setOpenDialog((prev) => false)}
            deliveryDetails={localDeliveryDetails}
            updateDeliveryDetails={(
              updatedDeliveryDetails: DeliveryDetailsType
            ) => setLocalDeliveryDetails((prev) => updatedDeliveryDetails)}
            onCloseAction={() =>
              updateCartContextDeliveryDetails(localDeliveryDetails)
            }
            occasions={occasions}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
