import FAQs from "@/components/(frontend)/global/_Templates/FAQs/FAQs";
import { dummyFAQData } from "@/components/pages/(frontend)/Home/static/data";

export type FrontendProductMiscDataType = {
  tabName: string;
} & (
  | {
      type: "string";
      content: string;
    }
  | {
      type: "faq";
      content: JSX.Element;
    }
  | {
      type: "package-details";
      includes: string[];
      excludes: string[];
    }
  | {
      type: "delivery-details";
      content: string;
      cancellationPolicyDetails: { heading: string; description: string };
    }
);

export const dummyMiscData: Array<FrontendProductMiscDataType> = [
  {
    tabName: "Package Includes",
    type: "package-details",
    includes: [
      "A freshly baked 8-inch round vanilla cake",
      "A cake box for easy transport",
      "A cake serving knife",
      "Colorful candles (set of 12)",
      "A greeting card for personalized messages",
      "A set of cake toppers (choose from a variety of themes)",
      "Basic cake cutting and serving instructions"
    ],
    excludes: [
      "Additional decorations beyond the included cake toppers",
      "Personalized messages on the cake itself"
    ]
  },
  {
    tabName: "FAQs",
    type: "faq",
    content: <FAQs faqData={dummyFAQData} />
  },
  {
    tabName: "Delivery Details",
    type: "delivery-details",
    content: `<ul>
    <li>The image displayed is indicative in nature.</li>
    <li>Actual product may vary in shape, colour or design as per the availability.</li>
    <li>Our balloon expert will come to your home at your chosen slot, and set up the balloons as shown in the images.</li>
    <li>You'll need to provide a stool to reach the ceiling.</li>
    <li>We can decorate a hotel room if you gain permission from the hotel.</li>
    <li>All the items used in the decoration are on rental basis and will be taken back on the next day of the event.</li>
    <li>If case of a complaint, notice must be given within 2 hours of the delivery time of the experience.</li>
    <li>No rescheduling or cancellation is possible after the decoration has been attempted.</li>
</ul>`,
    cancellationPolicyDetails: {
      heading: "ABC",
      description: `<ul>
    <li>Cancellations will be subject to the following charges:</li>
    <li>Less than 24 hours before the event: No refund.</li>
    <li>24 to 72 hours before the event: Rs 1000 or 50% of the total amount, whichever is lower.</li>
    <li>3 to 7 days before the event: Rs 500 flat cancellation charge.</li>
    <li>More than 7 days before the event: No cancellation charge.</li>
    <li>In case of unforeseen circumstances such as rain, hailstorm, or other acts of God, only rescheduling will be entertained. Perishable items cannot be refunded, cancelled, or rescheduled.</li>
    <li>No cancellations are possible for experiences booked for the following dates due to special packages:</li>
    <li>February 13th and 14th (Valentine's Day packages)</li>
    <li>December 25th, December 31st, and January 1st</li>
</ul>`
    }
  },
  {
    tabName: "Care Info",
    type: "string",
    content: `<ul>
    <li>Keep balloons away from children, as uninflated or broken balloons can pose a choking hazard.</li>
    <li>Balloons will be hung using cello tape because we do not use helium due to its asphyxiation risks.</li>
    <li>Remove the cello tape immediately after the event.</li>
    <li>If the tape causes damage to the wall, use a hair dryer to blow hot air on the tape to prevent any damage.</li>
</ul>`
  }
  /* {
    tabName: "Cancellation Policy",
    type: "string",
    content: `<ul>
    <li>Cancellations will be subject to the following charges:</li>
    <li>Less than 24 hours before the event: No refund.</li>
    <li>24 to 72 hours before the event: Rs 1000 or 50% of the total amount, whichever is lower.</li>
    <li>3 to 7 days before the event: Rs 500 flat cancellation charge.</li>
    <li>More than 7 days before the event: No cancellation charge.</li>
    <li>In case of unforeseen circumstances such as rain, hailstorm, or other acts of God, only rescheduling will be entertained. Perishable items cannot be refunded, cancelled, or rescheduled.</li>
    <li>No cancellations are possible for experiences booked for the following dates due to special packages:</li>
    <li>February 13th and 14th (Valentine's Day packages)</li>
    <li>December 25th, December 31st, and January 1st</li>
</ul>`
  } */
];
