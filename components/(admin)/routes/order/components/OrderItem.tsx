// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// libraries
import moment from "moment";

// icons
import { Copy } from "lucide-react";

// constants
import { DOMAIN } from "@/common/constants/environmentVariables";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { INRSymbol } from "@/common/constants/symbols";

// utils
import { copyToClipboard } from "@/common/helpers/copyToClipboard";
import { getCustomVariantAdmin } from "../orderNew/utils/getCustomVariantAdmin";

// hooks
import { useDispatch, useSelector } from "@/store/withType";
import { useToast } from "@/components/ui/use-toast";

// redux
import {
  createContentAction,
  selectContent
} from "@/store/features/contents/contentSlice";
import { selectDeliveryType } from "@/store/features/presets/deliveryTypeSlice";
import { selectEnhancement } from "@/store/features/presets/enhancementSlice";
import { selectFlavour } from "@/store/features/presets/flavourSlice";
import { selectImage } from "@/store/features/media/imageSlice";
import { selectUnit } from "@/store/features/presets/unitSlice";
import { selectUpgrade } from "@/store/features/presets/upgradeSlice";

// components
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import OrderItemAddons from "./OrderItemAddons";
import OrderItemCustomization from "./OrderItemCustomization";

// types
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { useEffect } from "react";

export default function OrderItem({
  orderItem: {
    status,
    content: contentId,
    customVariant: customVariantId,
    pricePerUnit,
    quantity,
    delivery,
    instruction,
    addons: itemAddons,
    customization
  },
  srNo,
  isHighlighted,
  dataToCopy
}: {
  orderItem: CartItemDocument;
  srNo: number;
  isHighlighted: boolean;
  dataToCopy: string[];
}) {
  // hooks
  const dispatch = useDispatch();
  const { toast } = useToast();

  // redux states
  // const { documents: contents } = useSelector(selectContent.documentList);
  const contents = useSelector(selectContent.documents);
  const { documents: images } = useSelector(selectImage.documentList);
  const { documents: deliveryTypes } = useSelector(
    selectDeliveryType.documentList
  );
  const { documents: units } = useSelector(selectUnit.documentList);
  const { documents: enhancements } = useSelector(
    selectEnhancement.documentList
  );
  const { documents: upgrades } = useSelector(selectUpgrade.documentList);
  const { documents: flavours } = useSelector(selectFlavour.documentList);

  // variables
  const content = contents.find(({ _id }) => _id === contentId);
  const customVariant =
    content && customVariantId
      ? getCustomVariantAdmin({ units, content, variantId: customVariantId })
      : null;
  const name = customVariant ? customVariant.name : content?.name || "";
  const primaryImage = images.find(
    ({ _id }) =>
      _id ===
      (customVariant?.imageId ? customVariant.imageId : content?.media?.primary)
  );
  const deliveryType = deliveryTypes.find(({ _id }) => _id === delivery.type);
  const deliverySlot = deliveryType?.timeSlots.find(
    ({ _id }) => _id === delivery.slot
  );

  const copyableData = [
    "DELIVERY ->",
    `Delivery Date: ${moment(delivery.date).format("DD MMM YYYY")}`,
    `Delivery Time: ${deliverySlot?.label || ""}`,
    "",
    ...dataToCopy,
    "",
    "INCLUSION ->",
    `Name: ${content?.name}`,
    `Includes: ${content?.detail?.includes.join(", ")}`,
    ...(customization
      ? [
          "",
          "CUSTOMIZATIONS ->",
          ...(customization.enhancement
            ? [
                `Enhancement(s):${customization.enhancement.items.map(({ enhancement }) => ` ${enhancements.find(({ _id }) => _id === enhancement)?.label}`)}`
              ]
            : []),
          ...(customization.upgrade
            ? [
                `${customization.upgrade.label}: ${upgrades.find(({ _id }) => _id === customization.upgrade?.upgrade)?.label}`
              ]
            : []),
          ...(customization.flavour
            ? [
                `Flavour: ${flavours.find(({ _id }) => _id === customization.flavour?.flavour)?.name}`
              ]
            : []),
          ...(customization.balloonColor
            ? [`Balloon Colors: ${customization.balloonColor}`]
            : []),
          ...(customization.uploadedText
            ? [
                `${customization.uploadedText.label}: ${customization.uploadedText.text}`
              ]
            : []),
          ...(customization.uploadedImage
            ? [`Image(s): ${customization.uploadedImage.images.length}`]
            : [])
        ]
      : [])
  ];

  // side effects
  useEffect(() => {
    if (contentId && !content) {
      dispatch(
        createContentAction.fetchOrSelectDocument({
          documentId: contentId as string
        })
      );
    }
  }, [contentId, content, dispatch]);

  return (
    <section
      className={`flex flex-col gap-2 px-0 py-5 border-b border-dashed border-charcoal-3/40`}
    >
      {content && (
        <section className="grid grid-cols-[60px_1fr] sm:grid-cols-[86px_1fr_auto_90px] auto-rows-min gap-x-4">
          <div className="bg-charcoal-3/20 rounded-xl overflow-hidden relative aspect-square">
            {primaryImage && (
              <Link
                target="_blank"
                href={`${DOMAIN}${content.type === "product" ? FRONTEND_LINKS.PRODUCT_PAGE : FRONTEND_LINKS.SERVICE_PAGE}/${content.slug}`}
              >
                <Image
                  className="w-full h-full object-cover object-center"
                  src={primaryImage.url}
                  alt={primaryImage.alt || primaryImage.defaultAlt || "Image"}
                  width={150}
                  height={150}
                  unoptimized={!OPTIMIZE_IMAGE}
                  decoding="async"
                  draggable={false}
                />
              </Link>
            )}
          </div>
          <div className="flex flex-col justify-start gap-0 relative">
            <span className="font-medium text-[17px] sm:py-1">{name}</span>
            <span className="text-[17px] font-medium sm:hidden">
              {INRSymbol}
              {pricePerUnit}
              {quantity >= 1 ? ` x${quantity}` : "x0"}
            </span>
            <span className="text-sm text-charcoal-3 max-sm:hidden">
              Quantity: {quantity >= 1 ? ` x${quantity}` : "x0"}
            </span>
            <span className="text-sm text-charcoal-3 max-sm:hidden">
              Booking for: {moment(delivery.date).format("DD MMM YYYY")} (
              {deliverySlot?.label || ""})
            </span>
            <span className="text-sm text-charcoal-3 sm:hidden">
              Date: {moment(delivery.date).format("DD MMM YYYY")}
            </span>
            <span className="text-sm text-charcoal-3 sm:hidden">
              Time: {deliverySlot?.label || ""} (
              {deliveryType?.name.split(" ")[0] || ""})
            </span>
            {/* CUSTOMIZATIONS IF ANY ------------------ */}
            {customization && (
              <OrderItemCustomization customization={customization} />
            )}
            {/* INSTRUCTIONS IF ANY ------------------ */}
            {instruction && instruction.length > 0 && (
              <span className="text-sm text-charcoal-3">
                Instruction: {instruction || ""}
              </span>
            )}

            <Dialog>
              <DialogTrigger asChild>
                <div className="sm:hidden w-8 h-8 absolute -right-3 -top-1 flex items-center justify-center rounded-full bg-teal-400 transition-all duration-300 hover:bg-teal-700 cursor-pointer text-white">
                  <Copy
                    width={13}
                    height={13}
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="w-device sm:w-[450px] outline-none border border-charcoal-3/10 rounded-xl sm:rounded-3xl p-5 grid grid-cols-1 auto-rows-min gap-y-1.5 text-charcoal-3">
                {copyableData.map((data, index) => (
                  <div key={index}>{data}</div>
                ))}
                <div className="min-w-full flex flex-col items-end mt-2">
                  <span
                    className="cursor-pointer flex items-center justify-center w-fit px-5 py-2 text-sm rounded-full transition-all duration-300 bg-teal-200 text-teal-900 hover:bg-teal-700 hover:text-white gap-x-2"
                    onClick={() => {
                      copyToClipboard(copyableData.join("\n"))
                        .then(() =>
                          toast({
                            title: "Copied to clipboard",
                            variant: "success"
                          })
                        )
                        .catch((err) =>
                          toast({
                            title: "Couldn't copy",
                            description: "Try again",
                            variant: "destructive"
                          })
                        );
                    }}
                  >
                    <Copy
                      strokeWidth={1.5}
                      height={15}
                      width={15}
                    />
                    <span>Copy</span>
                  </span>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* DELIVERY TYPE ----------------- */}
          <div className="max-sm:hidden flex flex-col justify-start gap-y-3.5">
            <div className="text-white text-[13px] mt-2 bg-sienna py-0.5 px-3 rounded-lg h-fit">
              {deliveryType?.name || ""}
            </div>

            {/* COPY DATA ==================================================================== */}
            <div className="flex items-center justify-center pb-3">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex text-[13px] items-center justify-center gap-1.5 px-4 py-1 rounded-full bg-transparent transition-all duration-300 text-teal-900 hover:text-white hover:bg-teal-600 cursor-pointer">
                    <Copy
                      strokeWidth={1.5}
                      width={13}
                      height={13}
                    />
                    <span>Copyable</span>
                  </div>
                </DialogTrigger>

                <DialogContent className="w-[300px] sm:w-[450px] outline-none border border-charcoal-3/10 rounded-3xl p-5 grid grid-cols-1 auto-rows-min gap-y-1.5 text-charcoal-3">
                  {copyableData.map((data, index) => (
                    <div key={index}>{data}</div>
                  ))}
                  <div className="min-w-full flex flex-col items-end mt-2">
                    <span
                      className="cursor-pointer flex items-center justify-center w-fit px-5 py-2 text-sm rounded-full transition-all duration-300 bg-teal-200 text-teal-900 hover:bg-teal-700 hover:text-white gap-x-2"
                      onClick={() => {
                        copyToClipboard(copyableData.join("\n"))
                          .then(() =>
                            toast({
                              title: "Copied to clipboard",
                              variant: "success"
                            })
                          )
                          .catch((err) =>
                            toast({
                              title: "Couldn't copy",
                              description: "Try again",
                              variant: "destructive"
                            })
                          );
                      }}
                    >
                      <Copy
                        strokeWidth={1.5}
                        height={15}
                        width={15}
                      />
                      <span>Copy</span>
                    </span>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* PRICE PER UNIT ----------------- */}
          <div className="font-medium text-right mt-2 max-sm:hidden">
            {INRSymbol}
            {pricePerUnit}
          </div>
        </section>
      )}

      {/* ADDONS IF ANY ---------------------- */}
      {itemAddons && Boolean(itemAddons.length) && (
        <OrderItemAddons itemAddons={itemAddons} />
      )}
    </section>
  );
}
