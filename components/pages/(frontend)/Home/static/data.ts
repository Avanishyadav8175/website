import { LocalProductDocument } from "@/components/(frontend)/global/_Templates/Tiles/ProductTiles/ProductTiles";

export const productList: LocalProductDocument[] = [
  {
    _id: "1",
    name: "Red Something",
    link: "/n/1",
    showVeganType: true,
    isVegan: true,
    price: {
      base: {
        _id: "1",
        mrp: 120,
        price: 100,
        currency: "USD"
      },
      cities: [
        {
          city: {
            _id: "1",
            name: "New York"
          },
          price: {
            _id: "1",
            mrp: 120,
            price: 95,
            currency: "USD"
          }
        },
        {
          city: {
            _id: "2",
            name: "Los Angeles"
          },
          price: {
            _id: "2",
            mrp: 120,
            price: 105,
            currency: "USD"
          }
        }
      ]
    },
    image: {
      url: "",
      alt: ""
    },
    tag: {
      label: "New Arrival",
      tagColor: "#FF5733"
    },
    quality: {
      rating: 4.5,
      reviews: 120
    },
    earliestDeliveryBy: new Date("2024-08-20T00:00:00.000Z")
  }
];

export const dummyFAQData = [
  {
    _id: "",
    question: "What kind of products do you sell?",
    answer:
      "If you need to use a one-off animation value that doesn't make sense to include in your theme, use square brackets to generate a property on the fly using any arbitrary value."
  }
];

export const dummyQuickLinks = [
  {
    _id: "",
    heading: "Gifts",
    content: [
      { _id: "", label: "Gifts for Husband", url: "/flower-bouquets" },
    ]
  }
];

export const dummyCustomContentData = `<p>TEST CUSTOM CONTENT HERE</p>`;
