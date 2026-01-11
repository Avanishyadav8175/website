
"use client";
import { INRSymbol } from "@/common/constants/symbols";
import {
  NonVegSymbol,
  VegSymbol
} from "@/components/(_common)/Symbols/Edibles";
import { HorizontalSpacing } from "@/components/(frontend)/global/_Spacings/HorizontalSpacings";
import Heading1 from "@/components/(frontend)/global/_Typography/Heading1";
import { useEffect, useId, useState } from "react";
import {
  dummyAvailablePincodes,
  dummyEnhancementsData,
  dummyFlavorsData,
  dummyProductColorData
} from "./static/data";
import ContentMiscTabs from "@/components/(frontend)/products/MiscTabs/ContentMiscTabs";
import FrontendProductCustomization from "@/components/(frontend)/products/CustomizeProduct/CustomizeProduct";
import { BasicImageType } from "@/common/types/types";
import { isAbleToCustomize } from "./helpers/checkAbleToCustomize";
import { scrollToSection } from "@/common/helpers/scrollToSection";
import FrontendProductAddonsPopup from "@/components/(frontend)/products/AddonsPopup/ProductAddonsPopup";
import ProductBookCustomizeBar from "@/components/(frontend)/products/BookCustomizeBar/ProductBookCustomizeBar";
import { LocalPincodeDocument } from "@/components/(frontend)/global/SelectCity/static/types";
import { setAlreadySelectedCity } from "@/common/utils/checkCityIsSelected";
import { CURR_LOCATION_SESSION_KEY } from "@/common/constants/sessionKeys";
// import SelectPincodeModern from "@/components/(frontend)/products/SelectPincode/SelectPincodeModern";
import SelectDateTimeModern from "@/components/(frontend)/products/SelectDateTime/SelectDateTimeModern";
import CouponSelectionTrigger from "@/components/(frontend)/transaction/cart/CartCoupon/CouponSelectionTrigger";
import FrontendCouponsList from "@/components/(frontend)/transaction/cart/CartCoupon/CouponList";
import { CouponDocument } from "@/common/types/documentation/contents/coupon";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { ContentQualityDocument } from "@/common/types/documentation/nestedDocuments/contentQuality";
import {
  CardTitle,
  ProductTrustedInfo,
  ReviewRatings
} from "./components/scrap/ProductPageMiscUI";
import ContentVariants from "./components/variants/ContentVariants";
import { ContentEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancementItem";
import { BalloonColorGroupDocument } from "@/common/types/documentation/presets/balloonColorGroup";
import { usePathname, useRouter } from "next/navigation";
import { FlavourDocument } from "@/common/types/documentation/presets/flavour";
import { UpgradeDocument } from "@/common/types/documentation/presets/upgrade";
import { useLocation } from "@/hooks/useLocation/useLocation";
import { useCart } from "@/hooks/useCart";
import { CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { AddonDocument } from "@/common/types/documentation/contents/addon";
import { CartItemCustomizationDocument } from "@/common/types/documentation/nestedDocuments/cartItemCustomization";
import { CartItemEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/cartItemEnhancementItem";
import { CartItemEnhancementDocument } from "@/common/types/documentation/nestedDocuments/cartItemEnhancement";
import { ContentUpgradeItemDocument } from "@/common/types/documentation/nestedDocuments/contentUpgradeItem";
import { ContentFlavourItemDocument } from "@/common/types/documentation/nestedDocuments/contentFlavourItem";
import { CartItemDeliveryDocument } from "@/common/types/documentation/nestedDocuments/cartItemDelivery";
import { DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";
import { generateRandomId } from "@/components/(admin)/Images/static/data";
import {
  getCityWiseContentPrices,
  getCityWisePrices
} from "@/common/helpers/getCityWiseContentPrices";
import { LabelDocument } from "@/common/types/documentation/presets/label";
import { ContentVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentVariantCategory";
import { ContentAvailabilityDocument } from "@/common/types/documentation/nestedDocuments/contentAvailability";
import { CustomizationImageDocument } from "@/common/types/documentation/media/customizationImage";
import { BadgePercent, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import FrontendProductEarliestDeliveryBy from "@/components/(frontend)/products/EarliestDeliveryBy/ProductEarliestDeliveryBy";
import { CityDocument } from "@/common/types/documentation/presets/city";
// import { PincodeDocument } from "@/common/types/documentation/presets/pincode";
import { setLocalStorage } from "@/common/utils/storage/local";
import { DOMAIN } from "@/common/constants/domain";

export type LocalProductDateTimeType = {
  date: Date | undefined;
  deliveryType: string | undefined;
  deliveryTime: string | undefined;
  timeLabel: string;
};

const OFFER_SLIDE_DELAY = 5000;

export default function ContentDetailsUI({
  details,
  primaryImage,
  showServingInfo,
  relatedCoupons,
  isReferenceActive,
  selectedReference,
  referenceDocuments,
  selectedCustom,
  customVariantDetails,
  contentAvailability,
  customizationImages,
  timer,
  selectedCity,
  // selectedPincode,
  // onSelectPincode,
  // onSearchPincode,
  addItemToCart,
  onSelectReference,
  onSelectCustom,
  onChangeCustomizationImages
}: {
  details: ContentDocument;
  primaryImage: BasicImageType;
  showServingInfo: boolean;
  relatedCoupons?: CouponDocument[];
  isReferenceActive: boolean;
  selectedReference: string;
  referenceDocuments: ContentVariantCategoryDocument[] | undefined;
  selectedCustom: string | undefined;
  customVariantDetails:
    | {
        name: string;
        price: ContentPriceDocument;
      }
    | undefined;
  contentAvailability: ContentAvailabilityDocument;
  customizationImages: CustomizationImageDocument[];
  timer: string;
  selectedCity: CityDocument | null;
  // selectedPincode: PincodeDocument | null;
  // onSelectPincode: (pincode: PincodeDocument) => void;
  // onSearchPincode: (keyword: string) => PincodeDocument[];
  addItemToCart: (cartItem: CartItemDocument) => void;
  onSelectReference: (selectedRefId: string) => void;
  onSelectCustom: (selectedCustomId: string) => void;
  onChangeCustomizationImages: (
    customizationImages: CustomizationImageDocument[]
  ) => void;
}) {
  // const { selectedCity } = useLocation();
  // const {
  //   addToCartFunctions: { addItem: addItemToCart }
  // } = useCart();

  const currPath = usePathname();

  const [currPincode, setCurrPincode] = useState<
    LocalPincodeDocument | undefined
  >();
  const [dateTime, setDateTime] = useState<LocalProductDateTimeType>({
    date: undefined,
    deliveryTime: undefined,
    deliveryType: "",
    timeLabel: ""
  });

  const [addons, setAddons] = useState<{ id: string; count: number }[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

  // POPUP DIALOG STATES -------------------------------
  const [showCustomizationPopup, setShowCustomizationPopup] =
    useState<boolean>(false);
  const [showAddons, setShowAddons] = useState<boolean>(false);
  const [scrollToDateTime, setScrollToDateTime] = useState<boolean>(false);

  // CUSTOMIZATION STATES -------------------------------
  const [enhancements, setEnhancements] = useState<
    ContentEnhancementItemDocument[]
  >([]);
  const [flavor, setFlavor] = useState<string | undefined>(
    details.customization && details.customization.flavour
      ? ((details.customization.flavour.default as FlavourDocument)
          ._id as string)
      : undefined
  );
  const [upgrade, setUpgrade] = useState<string | undefined>(
    details.customization && details.customization.upgrade
      ? ((details.customization.upgrade.default as UpgradeDocument)
          ._id as string)
      : undefined
  );
  const [imgText, setImgText] = useState<string | undefined>();
  const [imgImages, setImgImages] = useState<BasicImageType[]>([]);
  const [selectedColor, setSelectedColor] =
    useState<BalloonColorGroupDocument>();
  const [otherColors, setOtherColors] = useState<string[]>([]);
  const [disabledBuyButtons, setDisabledBuyButtons] = useState<boolean>(false);

  // IDS ============================================================
  const dateTimeLocationContainerId = useId();
  const locationId = { borderId: useId(), textId: useId() };
  const dateTimeId = { borderId: useId(), textId: useId() };
  const responseId = { locationId: useId(), dateTimeId: useId() };

  const [price, setPrice] = useState<{ mrp: number; price: number }>(
    getCityWiseContentPrices({
      city: selectedCity,
      content: details
    })
  );
  const [variantPrice, setVariantPrice] = useState<{
    mrp: number;
    price: number;
  }>(
    customVariantDetails && customVariantDetails.price
      ? getCityWisePrices({
          city: selectedCity,
          prices: customVariantDetails.price
        })
      : { mrp: 0, price: 0 }
  );

  useEffect(() => {
    setPrice(
      getCityWiseContentPrices({
        city: selectedCity,
        content: details
      })
    );
  }, [selectedCity, details]);

  useEffect(() => {
    setVariantPrice(
      customVariantDetails && customVariantDetails.price
        ? getCityWisePrices({
            city: selectedCity,
            prices: customVariantDetails.price
          })
        : { mrp: 0, price: 0 }
    );
  }, [selectedCity, customVariantDetails]);

  const { push } = useRouter();

  useEffect(() => {
    if (scrollToDateTime) {
      scrollToSection({
        behavior: "smooth",
        targetId: dateTimeLocationContainerId,
        afterScroll: () => {
          const animate = (bg: string, id: string) =>
            (document.getElementById(id) as HTMLElement).animate(
              {
                border: `1px solid ${bg}`
              },
              { duration: 600, fill: "forwards" }
            );

          const message = (id: string, msg: string) => {
            const divId = document.getElementById(id) as HTMLElement;
            if (msg) divId.innerHTML = msg;
            divId.animate(
              {
                scale: msg ? "1" : "0",
                opacity: msg ? "1" : "0"
              },
              { duration: 400, fill: "forwards" }
            );
            if (!msg) setTimeout(() => (divId.innerHTML = msg), 600);
          };

          if (!currPincode || !currPincode._id) {
            animate("#fca5a5", locationId.borderId);
            message(responseId.locationId, "Select Location first");
          }

          if (!dateTime || !dateTime.date || !dateTime.deliveryTime) {
            animate("#fca5a5", dateTimeId.borderId);
            message(responseId.dateTimeId, "Select Date & Time first");
          }

          setTimeout(() => {
            if (!currPincode || !currPincode._id) {
              animate("#fff0", locationId.borderId);
              message(responseId.locationId, "");
            }

            if (!dateTime || !dateTime.date || !dateTime.deliveryTime) {
              animate("#fff0", dateTimeId.borderId);
              message(responseId.dateTimeId, "");
            }
          }, 1800);
        }
      });

      setScrollToDateTime((prev) => false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollToDateTime, dateTimeLocationContainerId]);

  useEffect(() => {
    const sessionPincodeId = sessionStorage.getItem(CURR_LOCATION_SESSION_KEY);
    if (sessionPincodeId && currPincode && sessionPincodeId !== currPincode._id)
      sessionStorage.setItem(CURR_LOCATION_SESSION_KEY, currPincode._id);
  }, [currPincode]);

  useEffect(() => {
    setAlreadySelectedCity(dummyAvailablePincodes, setCurrPincode);
  }, []);

  const handleCustomizationPopup = () => {
    if (isAbleToCustomize(currPincode, dateTime))
      setShowCustomizationPopup((prev) => true);
    else setScrollToDateTime((prev) => true);
  };

  const handleAddonsPopup = () => {
    if (isAbleToCustomize(currPincode, dateTime)) setShowAddons((prev) => true);
    else setScrollToDateTime((prev) => true);
  };

  const betweenCustomizationAndAddons = {
    cToA: () => {
      setShowAddons((prev) => true);
      setShowCustomizationPopup((prev) => false);
    },
    aToC: () => {
      setShowCustomizationPopup((prev) => true);
      setShowAddons((prev) => false);
    }
  };

  const handleBookNowClick = () => {
    if (details.addons === undefined || details.addons.length === 0)
      return handleGoToCart();
    handleAddonsPopup();
  };

  const handleGoToCart = () => {
    // CUSTOMIZATIONS GATHERING -------------------------------
    const selectedUpgrade =
      details.customization && details.customization.upgrade
        ? (details.customization.upgrade.default as UpgradeDocument)._id ===
          upgrade
          ? ({
              upgrade: details.customization.upgrade.default as UpgradeDocument,
              price: 0
            } as ContentUpgradeItemDocument)
          : details.customization.upgrade.options.find(
              ({ _id }) => (_id as string) === upgrade
            )
        : undefined;

    const selectedFlavor =
      details.customization && details.customization.flavour
        ? (details.customization.flavour.default as FlavourDocument)._id ===
          flavor
          ? ({
              flavour: details.customization.flavour.default as FlavourDocument,
              price: 0
            } as ContentFlavourItemDocument)
          : details.customization.flavour.options.find(
              ({ _id }) => (_id as string) === flavor
            )
        : undefined;

    const customization: CartItemCustomizationDocument | undefined = {
      enhancement:
        enhancements.length > 0
          ? ({
              label: details.customization?.enhancement?.label
                ? (details.customization?.enhancement?.label as LabelDocument)
                    .label || ""
                : "",
              items: enhancements as CartItemEnhancementItemDocument[]
            } as CartItemEnhancementDocument)
          : undefined,

      upgrade: selectedUpgrade
        ? {
            ...selectedUpgrade,
            label:
              (details.customization?.upgrade?.label as LabelDocument).label ||
              ""
          }
        : undefined,

      flavour: selectedFlavor
        ? {
            ...selectedFlavor,
            label:
              (details.customization?.flavour?.label as LabelDocument).label ||
              ""
          }
        : undefined,

      balloonColor:
        otherColors.length === 0
          ? selectedColor
            ? ((selectedColor as BalloonColorGroupDocument).colors.join(
                ","
              ) as string)
            : undefined
          : otherColors.join(","),

      uploadedText:
        imgText && imgText.length > 0
          ? {
              label:
                details.customization && details.customization.uploadText
                  ? (details.customization.uploadText?.label as LabelDocument)
                      .label || ""
                  : "",
              text: imgText
            }
          : undefined
    } as CartItemCustomizationDocument;

    // DELIVERY DETAILS GATHERING -----------------------------
    const deliveryTypeData =
      details.delivery && details.delivery.slots
        ? details.delivery.slots.find(
            ({ _id }) => (_id as string) === (dateTime.deliveryType as string)
          )
        : undefined;

    const delivery: CartItemDeliveryDocument = {
      date: new Date(dateTime.date as Date).toISOString(),
      type: deliveryTypeData
        ? (deliveryTypeData.type as DeliveryTypeDocument)
        : "",
      slot: deliveryTypeData
        ? (deliveryTypeData.type as DeliveryTypeDocument).timeSlots.find(
            ({ _id }) => (_id as string) === (dateTime.deliveryTime as string)
          )
        : ""
    } as CartItemDeliveryDocument;

    // SELECTED ADDONS -----------------------------
    const selectedAddons: CartItemAddonDocument[] | undefined =
      addons.length && details.addons && details.addons.length > 0
        ? details.addons
            .filter(({ _id }) =>
              addons.map(({ id }) => id).includes(_id as string)
            )
            .map(({ _id, addon: ad }) => {
              const adn = ad as AddonDocument;
              return {
                addon: adn,
                pricePerUnit: adn.price,
                quantity:
                  addons.find(({ id }) => id === (_id as string))?.count || 0
              } as CartItemAddonDocument;
            })
        : undefined;

    // CART RELEVANT MASTER DATA =======================================
    const selections: CartItemDocument = {
      _id: generateRandomId(20),
      status: "new",
      content: details,
      pricePerUnit:
        customVariantDetails === undefined ? price.price : variantPrice.price,
      quantity: 1,
      delivery,
      addons: selectedAddons,
      customization,
      customVariant:
        customVariantDetails === undefined ? undefined : selectedCustom,
      titleIfCustomVariant:
        customVariantDetails === undefined
          ? undefined
          : `${details.name}${customVariantDetails.name.length > 0 ? `(${customVariantDetails.name})` : ""}`
    } as CartItemDocument;

    console.log({ cartItem: selections });
    // addItemToCart(selections);
    // setTimeout(() => push("/cart"), 300);
  };

  useEffect(() => {
    setLocalStorage({
      key: "whatsapp",
      value: {
        city: currPincode?.city || "",
        name:
          `${details.name}${customVariantDetails && customVariantDetails.name.length > 0 ? ` (${customVariantDetails.name})` : ""}` ||
          "",
        link: `${DOMAIN}${currPath}`,
        price: `${INRSymbol}${customVariantDetails === undefined ? price.price : variantPrice.price}`,
        pincode: currPincode?.pincode || ""
      }
    });
  }, [
    currPath,
    currPincode,
    customVariantDetails,
    details,
    price.price,
    variantPrice.price
  ]);

  return (
    <>
      <section className="max-sm:pt-12 max-sm:rounded-t-[26px] relative flex flex-col justify-start max-sm:bg-ivory-1 max-sm:z-[999]">
        <span className="sm:hidden rounded-full h-1 w-20 bg-charcoal-3/20 absolute top-5 left-1/2 -translate-x-1/2" />

        <div className="relative sm:pl-5 flex flex-col justify-start max-sm:pb-3 max-sm:border-b border-ivory-3/50">
          {/* TITLE + VEG/NON-VEG SYMBOL ------------------------------------- */}
          <HorizontalSpacing className="flex items-start justify-start gap-x-1 sm:h-9">
            <Heading1
              label={
                `${details.name}${customVariantDetails && customVariantDetails.name.length > 0 ? ` (${customVariantDetails.name})` : ""}` ||
                "__ITEM_NAME__"
              }
              align="left"
              variant="item-name"
              useH1
            />
            {details.edible && details.edible.isEdible ? (
              details.edible.type === "veg" ? (
                <VegSymbol className="scale-75 -translate-y-1 sm:-translate-y-[2.5px]" />
              ) : details.edible.type === "non-veg" ? (
                <NonVegSymbol className="scale-75 -translate-y-1 sm:-translate-y-[2.5px]" />
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </HorizontalSpacing>

          {/* PRICE ----------------------------------------------------------------------- */}
          <HorizontalSpacing className="my-1.5 sm:my-1 flex items-baseline justify-start gap-3">
            <Heading1
              label={`${INRSymbol} ${customVariantDetails === undefined ? price.price : variantPrice.price}`}
              align="left"
              variant="item-price"
              useH2
            />
            {price.price < price.mrp ? (
              <del className="text-charcoal-3/70">
                {INRSymbol}
                {customVariantDetails === undefined
                  ? price.mrp
                  : variantPrice.mrp}
              </del>
            ) : (
              <></>
            )}

            {/* discount badge if discount > 0 -------------------------- */}
            {(
              customVariantDetails === undefined
                ? price.price < price.mrp
                : variantPrice.price < variantPrice.mrp
            ) ? (
              <div className="relative sm:ml-2 p-0.5 px-3 rounded-full bg-emerald-700 text-ivory-1 text-xs overflow-hidden">
                {Math.min(
                  99,
                  Math.ceil(
                    100 -
                      ((customVariantDetails === undefined
                        ? price.price
                        : variantPrice.price) *
                        100) /
                        (customVariantDetails === undefined
                          ? price.mrp
                          : variantPrice.mrp)
                  )
                )}
                % discount
                <div className="absolute h-full -left-[35%] w-7 scale-y-110 bg-ivory-1/65 opacity-60 rotate-12 blur-sm z-30 top-0 animate-shine-infinite-slow" />
              </div>
            ) : (
              <></>
            )}
          </HorizontalSpacing>

          <HorizontalSpacing className="text-xs text-charcoal-3/70 sm:pt-1">
            Inclusive of all taxes
          </HorizontalSpacing>

          {/* RATING AND REVIEWS ------------------------------------------------------------- */}
          {(details.quality as ContentQualityDocument)?.rating?.value ? (
            <HorizontalSpacing className="sm:mt-4">
              <ReviewRatings
                review={
                  (details.quality as ContentQualityDocument)?.rating?.count ||
                  0
                }
                rating={
                  (details.quality as ContentQualityDocument)?.rating?.value ||
                  0
                }
              />
            </HorizontalSpacing>
          ) : (
            <></>
          )}

          {relatedCoupons && relatedCoupons.length > 0 ? (
            <HorizontalSpacing className="sm:pt-6 pt-2.5 pb-1.5">
              <div className="rounded-xl overflow-hidden sm:max-w-[calc(470px_+_24px)]">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="max-sm:hidden bg-green-100/80 py-3.5 px-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-green-100">
                      <div className="flex items-center justify-start gap-x-1.5 text-green-600">
                        <BadgePercent
                          width={18}
                          height={18}
                        />
                        <span>Offers and Coupons</span>
                      </div>
                      <div className="font-semibold uppercase text-sm tracking-wide text-green-600/90">
                        View all
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="p-0 outline-none border-none w-[380px]">
                    <FrontendCouponsList
                      appliedCoupon={null}
                      availableCoupons={
                        keyword
                          ? relatedCoupons.filter(({ code }) =>
                              code.toLowerCase().includes(keyword)
                            )
                          : relatedCoupons
                      }
                      onSelectCoupon={() => {}}
                      priceSummary={{
                        addon: 0,
                        base: 0,
                        coupon: 0,
                        paymentPercentage: 100,
                        platform: 0
                      }}
                      closeDialog={() => setOpen((prev) => false)}
                      keyword={keyword}
                      setKeyword={setKeyword}
                      notInCart={true}
                    />
                  </DialogContent>
                </Dialog>

                <Drawer>
                  <DrawerTrigger asChild>
                    <div className="sm:hidden bg-green-100/80 py-3.5 px-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-green-100">
                      <div className="flex items-center justify-start gap-x-1.5 text-green-600">
                        <BadgePercent
                          width={18}
                          height={18}
                        />
                        <span>Offers and Coupons</span>
                      </div>
                      <div className="font-semibold uppercase text-sm tracking-wide text-green-600/90">
                        View all
                      </div>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="z-[996] outline-none border-none bg-ivory-1 rounded-t-3xl">
                    <FrontendCouponsList
                      appliedCoupon={null}
                      availableCoupons={
                        keyword
                          ? relatedCoupons.filter(({ code }) =>
                              code.toLowerCase().includes(keyword)
                            )
                          : relatedCoupons
                      }
                      onSelectCoupon={() => {}}
                      priceSummary={{
                        addon: 0,
                        base: 0,
                        coupon: 0,
                        paymentPercentage: 100,
                        platform: 0
                      }}
                      closeDialog={() => setOpen((prev) => false)}
                      keyword={keyword}
                      setKeyword={setKeyword}
                      notInCart={true}
                    />
                  </DrawerContent>
                </Drawer>
              </div>
            </HorizontalSpacing>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col justify-start sm:pl-5 sm:pr-2.5 max-sm:bg-ivory max-sm:shadow-inner gap-y-3 sm:gap-y-6 py-6 pt-3 sm:pt-6">
          {/* VARIANTS ------------------------------------------------------------------ */}
          {details.variants && details.variants.length > 0 ? (
            details.variants.map((variant, index) => (
              <ContentVariants
                data={variant}
                selectedCity={selectedCity}
                onSelect={(selectedId: string | undefined, type) => {
                  if (type === "reference" && selectedId)
                    onSelectReference(selectedId);
                  if (type === "custom" && selectedId)
                    onSelectCustom(selectedId);
                }}
                key={index}
                selectedId={
                  (variant.type === "custom"
                    ? selectedCustom
                    : selectedReference) || undefined
                }
                referenceDocument={
                  variant.type === "custom"
                    ? undefined
                    : referenceDocuments
                      ? referenceDocuments[0]
                      : undefined
                }
                isReferenceActive={isReferenceActive}
              />
            ))
          ) : referenceDocuments && referenceDocuments.length > 0 ? (
            referenceDocuments.map((doc, index) => (
              <ContentVariants
                data={doc}
                selectedCity={selectedCity}
                onSelect={(selectedId: string | undefined, type) => {
                  if (type === "reference" && selectedId)
                    onSelectReference(selectedId);
                }}
                key={index}
                selectedId={selectedReference || undefined}
                referenceDocument={
                  doc.type === "custom"
                    ? undefined
                    : referenceDocuments
                      ? referenceDocuments[0]
                      : undefined
                }
                isReferenceActive={isReferenceActive}
              />
            ))
          ) : (
            <></>
          )}

          {/* SELECT DATE TIME AND PINCODE ------------------------------------------------------------------ */}
          <div className="bg-ivory-1 shadow-light sm:rounded-3xl pt-5 pb-5 border-y sm:border border-sienna/40 px-4 sm:px-6  sm:max-w-[calc(470px_+_24px)]">
            <CardTitle str="Enter Delivery Details" />
            <div
              id={dateTimeLocationContainerId}
              className={`grid grid-cols-1 sm:grid-cols-2 ${dateTime.date && dateTime.deliveryTime && dateTime.deliveryType ? "" : ""} sm:gap-x-5 gap-y-2.5 sm:pt-4 max-sm:pt-3`}
            >
              {/* SELECT PINCODE ------------------------------------------------------------------ */}
              {/* <SelectPincodeModern
                textId={locationId.textId}
                borderId={locationId.borderId}
                responseId={responseId.locationId}
                contentAvailability={contentAvailability}
                selectedCity={selectedCity}
                selectedPincode={selectedPincode}
                onSelectPincodeContext={onSelectPincode}
                onSearchPincode={onSearchPincode}
                onSelectPincode={(pincode: LocalPincodeDocument | undefined) =>
                  setCurrPincode((prev) => pincode)
                }
                disableBuyButtons={(disabled: boolean) =>
                  setDisabledBuyButtons((prev) => disabled)
                }
              /> */}

              {/* SELECT DATE TIME ------------------------------------------------------------------ */}
              <SelectDateTimeModern
                parent={dateTime}
                setParent={setDateTime}
                textId={dateTimeId.textId}
                borderId={dateTimeId.borderId}
                responseId={responseId.dateTimeId}
                details={details.delivery}
              />
            </div>

            <div className="pt-6">
              <FrontendProductEarliestDeliveryBy timer={timer} />
            </div>
          </div>
        </div>

        {/* CUSTOMIZE AND BUY/BOOK NOW BUTTONS --------------------------------------------------- */}
        <div className="px-2.5 sm:pl-5 sticky bottom-0 bg-gradient-to-t from-ivory-1 from-80% sm:from-80% to-transparent pb-2.5 pt-3.5 sm:py-3 grid gap-x-2 gap-y-0.5 sm:gap-5 grid-cols-2 sm:flex sm:items-center sm:justify-start z-[900]">
          <ProductBookCustomizeBar
            onBook={handleBookNowClick}
            onCustomize={handleCustomizationPopup}
            disabled={disabledBuyButtons}
          />
        </div>

        {/* INFO AND MISC TABS --------------------------------------------------- */}
        <HorizontalSpacing className="my-6">
          <ContentMiscTabs tabData={details.detail} />
        </HorizontalSpacing>

        {/* WHY TRUSTED ICONS --------------------------------------------------- */}
        <div className="px-2.5 sm:pl-5 max-sm:mb-3">
          <ProductTrustedInfo />
        </div>
      </section>

      {/* CUSTOMIZATION POPUP ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
      {details.customization ? (
        <FrontendProductCustomization
          showDialog={showCustomizationPopup}
          setShowDialog={setShowCustomizationPopup}
          availableEnhancements={dummyEnhancementsData}
          enhancements={enhancements}
          setEnhancements={setEnhancements}
          availableFlavors={dummyFlavorsData}
          flavor={flavor}
          setFlavor={setFlavor}
          upgrade={upgrade}
          setUpgrade={setUpgrade}
          imgText={imgText}
          setImgText={setImgText}
          imgImages={imgImages}
          setImgImages={setImgImages}
          color={selectedColor}
          setColor={setSelectedColor}
          otherColors={otherColors}
          setOtherColors={setOtherColors}
          availableColors={dummyProductColorData}
          imageDimensions={{ width: 600, height: 600, size: 40960 }}
          maxImages={4}
          textLetterLimit={35}
          currPincode={currPincode}
          dateTime={dateTime}
          baseProduct={{
            name: details.name,
            image: primaryImage,
            selectedPrice:
              customVariantDetails === undefined
                ? price.price
                : variantPrice.price
          }}
          onBook={betweenCustomizationAndAddons.cToA}
          onBack={betweenCustomizationAndAddons.aToC}
          customizations={details.customization}
          contentName={details.name}
          customizationImages={customizationImages}
          onChangeCustomizationImages={onChangeCustomizationImages}
        />
      ) : (
        <></>
      )}

      {/* BOOK NOW ADDONS POPUP ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
      <FrontendProductAddonsPopup
        showDialog={showAddons}
        setShowDialog={setShowAddons}
        baseProduct={{
          name: details.name,
          image: primaryImage,
          selectedPrice:
            customVariantDetails === undefined
              ? price.price
              : variantPrice.price
        }}
        addons={addons}
        setAddons={setAddons}
        availableAddons={details.addons || []}
        afterCustomizationPrice={{
          baseAmount:
            customVariantDetails === undefined
              ? price.price
              : variantPrice.price,
          enhancement: enhancements.reduce(
            (total, num) => (total += num.price),
            0
          ),
          flavor: 0
        }}
        onClickBookNow={handleGoToCart}
      />
    </>
  );
}
