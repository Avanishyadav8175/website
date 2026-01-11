// libraries
import moment from "moment";

// constants
import { INRSymbol } from "@/common/constants/symbols";

// utils
import { generateRandomId } from "@/components/(admin)/Images/static/data";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createAddonAction,
  selectAddon
} from "@/store/features/contents/addonSlice";
import {
  createCartAction,
  selectCart
} from "@/store/features/dynamic/cartSlice";
import {
  createContentAction,
  selectContent
} from "@/store/features/contents/contentSlice";
import {
  createCouponAction,
  selectCoupon
} from "@/store/features/contents/couponSlice";
import {
  createCustomerAction,
  selectCustomer
} from "@/store/features/users/customerSlice";
import {
  createCustomizationImageAction,
  selectCustomizationImage
} from "@/store/features/media/customizationImageSlice";
import {
  createDeliveryTypeAction,
  selectDeliveryType
} from "@/store/features/presets/deliveryTypeSlice";
import {
  createEnhancementAction,
  selectEnhancement
} from "@/store/features/presets/enhancementSlice";
import {
  createFlavourAction,
  selectFlavour
} from "@/store/features/presets/flavourSlice";
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";
import {
  createOccasionAction,
  selectOccasion
} from "@/store/features/presets/occasionSlice";
import {
  createOrderAction,
  selectOrder
} from "@/store/features/dynamic/orderSlice";
import {
  createUnitAction,
  selectUnit
} from "@/store/features/presets/unitSlice";
import {
  createUpgradeAction,
  selectUpgrade
} from "@/store/features/presets/upgradeSlice";
import {
  createVenueAction,
  selectVenue
} from "@/store/features/presets/venueSlice";

// components
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OrderItem from "./OrderItem";
import OrderDeliveryData from "./OrderDeliveryData";
import RightSideData from "./OrderData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

// types
import { type CartPriceDocument } from "@/common/types/documentation/nestedDocuments/cartPrice";

export default function OrderDetails({
  orderId,
  itemId
}: {
  orderId: string;
  itemId: string;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux states
  const addonStatus = useSelector(selectAddon.status);
  const cartStatus = useSelector(selectCart.status);
  const contentStatus = useSelector(selectContent.status);
  const couponStatus = useSelector(selectCoupon.status);
  const customerStatus = useSelector(selectCustomer.status);
  const customizationImageStatus = useSelector(selectCustomizationImage.status);
  const deliveryTypeStatus = useSelector(selectDeliveryType.status);
  const enhancementStatus = useSelector(selectEnhancement.status);
  const flavourStatus = useSelector(selectFlavour.status);
  const imageStatus = useSelector(selectImage.status);
  const occasionStatus = useSelector(selectOccasion.status);
  const orderStatus = useSelector(selectOrder.status);
  const unitStatus = useSelector(selectUnit.status);
  const upgradeStatus = useSelector(selectUpgrade.status);
  const venueStatus = useSelector(selectVenue.status);

  const { documents: carts } = useSelector(selectCart.documentList);
  const { documents: coupons } = useSelector(selectCoupon.documentList);
  const { documents: customers } = useSelector(selectCustomer.documentList);
  const { documents: orders } = useSelector(selectOrder.documentList);

  // variables
  const order = orders.find(({ _id }) => _id === orderId);

  const cart = carts.find(({ _id }) => _id === order?.cart);

  const cartItems = cart?.items || [];

  // side effects
  useEffect(() => {
    if (imageStatus === "idle") {
      dispatch(createImageAction.fetchDocumentList());
    }
  }, [imageStatus, dispatch]);

  useEffect(() => {
    if (contentStatus === "idle") {
      dispatch(createContentAction.fetchDocumentList());
    }
  }, [contentStatus, dispatch]);

  useEffect(() => {
    if (addonStatus === "idle") {
      dispatch(createAddonAction.fetchDocumentList());
    }
  }, [addonStatus, dispatch]);

  useEffect(() => {
    if (cartStatus === "idle") {
      dispatch(createCartAction.fetchDocumentList());
    }
  }, [cartStatus, dispatch]);

  useEffect(() => {
    if (customerStatus === "idle") {
      dispatch(createCustomerAction.fetchDocumentList());
    }
  }, [customerStatus, dispatch]);

  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(createOrderAction.fetchDocumentList());
    }
  }, [orderStatus, dispatch]);

  useEffect(() => {
    if (couponStatus === "idle") {
      dispatch(createCouponAction.fetchDocumentList());
    }
  }, [couponStatus, dispatch]);

  useEffect(() => {
    if (customizationImageStatus === "idle") {
      dispatch(createCustomizationImageAction.fetchDocumentList());
    }
  }, [customizationImageStatus, dispatch]);

  useEffect(() => {
    if (deliveryTypeStatus === "idle") {
      dispatch(createDeliveryTypeAction.fetchDocumentList());
    }
  }, [deliveryTypeStatus, dispatch]);

  useEffect(() => {
    if (enhancementStatus === "idle") {
      dispatch(createEnhancementAction.fetchDocumentList());
    }
  }, [enhancementStatus, dispatch]);

  useEffect(() => {
    if (flavourStatus === "idle") {
      dispatch(createFlavourAction.fetchDocumentList());
    }
  }, [flavourStatus, dispatch]);

  useEffect(() => {
    if (occasionStatus === "idle") {
      dispatch(createOccasionAction.fetchDocumentList());
    }
  }, [occasionStatus, dispatch]);

  useEffect(() => {
    if (unitStatus === "idle") {
      dispatch(createUnitAction.fetchDocumentList());
    }
  }, [unitStatus, dispatch]);

  useEffect(() => {
    if (upgradeStatus === "idle") {
      dispatch(createUpgradeAction.fetchDocumentList());
    }
  }, [upgradeStatus, dispatch]);

  useEffect(() => {
    if (venueStatus === "idle") {
      dispatch(createVenueAction.fetchDocumentList());
    }
  }, [venueStatus, dispatch]);

  if (order === undefined)
    return <span className="text-sm">Order unavailable</span>;

  if (cart === undefined)
    return <span className="text-sm">Cart unavailable</span>;

  const orderSummary = [
    "ID",
    order?.id || "",
    "Amount",
    `${INRSymbol} ${order?.payment?.amount || ""}`,
    "Payment",
    <div
      className={
        order?.payment?.status === "completed"
          ? "text-green-600 font-medium capitalize"
          : " capitalize"
      }
      key={generateRandomId(23)}
    >
      {order?.payment?.status || ""}
    </div>,
    "Percentage",
    <div
      className={
        order?.payment?.percentage === 100
          ? "text-green-600 font-medium capitalize"
          : " text-red-600 font-medium capitalize"
      }
      key={generateRandomId(23)}
    >
      {order?.payment?.percentage || ""}%
    </div>,
    "Ordered on",
    moment(order?.createdAt).format("DD MMM YY, hh:mm A")
  ];

  let paymentDetails: (string | JSX.Element)[] = [
    "Gateway",
    order.payment?.gateway?.name || ""
  ];

  const gatewayDetails = order.payment?.gateway?.info
    ? Object.keys(order.payment?.gateway?.info)
        .map((key) => [
          `${key.split("_").join(" ")}`,
          String((order.payment.gateway.info as Record<string, any>)[key])
        ])
        .reduce((arr, val) => (arr = [...arr, ...val]), [])
    : [];

  paymentDetails = [
    ...paymentDetails,
    ...gatewayDetails
    // .map((detail, index) =>
    //   index % 2 === 0 ? detail.split(" ").slice(1).join(" ") : detail
    // )
    // .map((detail, index) =>
    //   index % 2 === 0 ? (
    //     detail
    //   ) : (
    //     <TooltipProvider key={index}>
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <div className="whitespace-nowrap truncate cursor-pointer text-teal-900 underline underline-offset-4 w-[45dvw] sm:w-[126px]">
    //             {detail}
    //           </div>
    //         </TooltipTrigger>
    //         <TooltipContent>{detail}</TooltipContent>
    //       </Tooltip>
    //     </TooltipProvider>
    //   )
    // )
  ];

  const customerId = cart.customer as string;

  // variables
  const customer = customers.find(({ _id }) => _id === customerId);

  const customerSummary = [
    "Name",
    <div
      className="font-medium"
      key={generateRandomId(20)}
    >
      {customer?.name || ""}
    </div>,
    "Mobile No",
    customer?.mobileNumber || "",
    "Email",
    <TooltipProvider key={generateRandomId(20)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="whitespace-nowrap truncate cursor-pointer text-teal-900 underline underline-offset-4 w-[45dvw] sm:w-[126px]">
            {customer?.mail || ""}
          </div>
        </TooltipTrigger>
        <TooltipContent>{customer?.mail || ""}</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
    ...(cart?.checkout?.deliverToSomeoneElse
      ? [
          "Receiver",
          <div
            className="font-medium"
            key={generateRandomId(20)}
          >
            {cart?.checkout?.receiverName || ""}
          </div>,
          "Receiver Mobile No",
          cart?.checkout?.receiverMobileNumber || ""
        ]
      : [])
  ];

  const paymentStatus = order.payment.status;
  const price = cart.price;
  const couponId = cart.coupon as undefined | string;

  const coupon = coupons.find(({ _id }) => _id === couponId);

  const getTotalAmount = ({
    price: {
      content,
      addon,
      customization,
      deliveryCharge,
      paymentPercentage,
      couponDiscount
    }
  }: {
    price: CartPriceDocument;
  }): number =>
    content + customization + addon + deliveryCharge - couponDiscount;

  const getPaidAmount = ({
    price: {
      content,
      addon,
      customization,
      deliveryCharge,
      paymentPercentage,
      couponDiscount
    }
  }: {
    price: CartPriceDocument;
  }): number =>
    paymentStatus === "completed"
      ? paymentPercentage !== 100
        ? Math.ceil(
            (content + (customization || 0)) * (paymentPercentage / 100) +
              addon +
              deliveryCharge
          )
        : content + customization + addon + deliveryCharge - couponDiscount
      : 0;

  const getPendingAmount = ({ price }: { price: CartPriceDocument }): number =>
    getTotalAmount({ price }) -
    (paymentStatus === "completed" ? getPaidAmount({ price }) : 0);

  let priceSummary: (string | number | JSX.Element)[] = [
    "Base",
    `${INRSymbol}${price?.content || "0"}`
  ];

  if (Boolean(price?.addon))
    priceSummary = [
      ...priceSummary,
      "Addons",
      `${INRSymbol}${price?.addon || "0"}`
    ];

  if (Boolean(price?.customization))
    priceSummary = [
      ...priceSummary,
      "Customizations",
      `${INRSymbol}${price?.customization || "0"}`
    ];

  priceSummary = [
    ...priceSummary,
    "Delivery Fee",
    `${INRSymbol}${price?.deliveryCharge || "0"}`
  ];

  if (Boolean(price?.couponDiscount))
    priceSummary = [
      ...priceSummary,
      <TooltipProvider key={generateRandomId(20)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="whitespace-nowrap truncate cursor-pointer text-teal-900 underline underline-offset-4 w-[45dvw] sm:w-[126px]">
              Coupon
            </div>
          </TooltipTrigger>
          <TooltipContent>{`Code: ${coupon?.code || ""}`}</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
      `${INRSymbol}${price?.couponDiscount || "0"}`
    ];

  let priceTotalSummary = [
    <div
      className="font-medium text-[17px]"
      key={generateRandomId(20)}
    >
      Total
    </div>,
    <div
      className="font-medium text-[17px]"
      key={generateRandomId(20)}
    >{`${INRSymbol}${getTotalAmount({ price }) || "0"}`}</div>,
    "Paid",
    `${INRSymbol}${getPaidAmount({ price }) || "0"}`
  ];

  if (getPendingAmount({ price }) > 0)
    priceTotalSummary = [
      ...priceTotalSummary,
      "Pending",
      <div
        className="text-red-600"
        key={generateRandomId(20)}
      >{`${INRSymbol}${getPendingAmount({ price }) || "0"}`}</div>
    ];

  const dataToCopy = [
    "Customer ->",
    `Address: ${cart.checkout?.location?.address || ""}, ${cart.checkout?.location?.city || ""}, ${cart.checkout?.location?.pincode || ""}`,
    `Name: ${customer?.name || ""}`,
    `Mobile No: ${customer?.mobileNumber || ""}`
  ];

  return (
    <>
      <DialogHeader className="hidden">
        <DialogTitle></DialogTitle>
      </DialogHeader>
      {/* left side ------------------------ */}
      <section className="flex flex-col gap-5 sm:overflow-y-scroll scrollbar-hide">
        <section className="grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-x-8 max-sm:gap-y-5 items-start">
          {/* ORDER PRICE SUMMARY ========================================================== */}
          {cart?.checkout && (
            <div className="rounded-2xl relative bg-amber-100/50 p-5 max-sm:row-start-2 max-sm:mx-3">
              <div className="text-amber-700/90 text-xl py-2 font-medium">
                Order Bill
              </div>
              <RightSideData
                data={priceSummary}
                className="grid-cols-[auto_auto]"
              />
              <div className="h-px w-full bg-charcoal-3/30 my-1" />
              <RightSideData
                data={priceTotalSummary}
                className="grid-cols-[auto_auto] !pt-3 !pb-0"
              />

              <div className="absolute top-0 left-0 w-full flex items-center justify-center gap-x-5 *:rounded-full *:aspect-square *:bg-ivory-1 *:w-5 -translate-y-2">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}

          <div className="flex flex-col justify-start gap-y-2 max-sm:row-start-1">
            <div className="text-charcoal-3 text-2xl py-5 text-center">
              Order #{order?.id || ""}
            </div>

            {/* CHECKOUT SUMMARY ============================================================== */}
            {cart?.checkout && (
              <div className="rounded-2xl p-4 sm:p-5 bg-charcoal-3/5 max-sm:mx-3">
                <OrderDeliveryData checkout={cart.checkout} />
              </div>
            )}
          </div>
        </section>

        {/* ORDERED CONTENTS =================================================================== */}
        <section className="flex flex-col border-t border-charcoal-3/30 max-sm:mt-3">
          {cartItems.map((cartItem, i) => (
            <OrderItem
              key={cartItem._id as string}
              orderItem={cartItem}
              srNo={i + 1}
              isHighlighted={cartItem._id === itemId}
              dataToCopy={dataToCopy}
            />
          ))}
        </section>
      </section>

      {/* right side ----------------------- */}
      <section className="sm:overflow-auto scrollbar-hide flex flex-col justify-start gap-5 max-sm:border-t max-sm:py-5 sm:border-l border-charcoal-3/40 sm:pl-5">
        {/* ORDER SUMMARY ================================= */}
        {order && (
          <RightSideData
            data={orderSummary}
            title="Order Summary"
          />
        )}
        {/* CUSTOMER SUMMARY ================================= */}
        {cart && (
          <RightSideData
            data={customerSummary}
            title="Customer Summary"
          />
        )}
        {/* PAYMENT SUMMARY ================================= */}
        {order?.payment && (
          <RightSideData
            data={paymentDetails}
            title="Payment Summary"
            showTitle
          />
        )}
      </section>
    </>
  );
}
