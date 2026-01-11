import { LocalAddonsDocument } from "@/components/(frontend)/products/AddonsPopup/static/types";
import {
  EnhancementType,
  FlavorType
} from "@/components/(frontend)/products/CustomizeProduct/static/type";
import dummyPincodes from "@/components/(frontend)/global/SelectCity/static/pincodes.json";

export const SERVING_INFO = [
  { weight: "0.5kg", ampleCount: "4-6 people" },
  { weight: "1kg", ampleCount: "10-12 people" },
  { weight: "1.5kg", ampleCount: "14-16 people" },
  { weight: "2kg", ampleCount: "20-22 people" },
  { weight: "2.5kg", ampleCount: "24-26 people" },
  { weight: "3kg", ampleCount: "30-32 people" },
  { weight: "4kg", ampleCount: "40-42 people" }
];

export const dummyAvailablePincodes = dummyPincodes;

export const dummyImageVariantData = {
  title: "Make this Gift Extra Special",
  content: [
    {
      _id: "796sfg85r",
      link: "/",
      image: {
        url: "https://www.fnp.com/images/pr/l/v20221214202702/chocolaty-truffle-cake-half-kg-eggless_1.jpg",
        alt: ""
      },
      label: "Basic",
      price: "4645"
    },
    {
      _id: "s685g685eag",
      link: "/",
      image: {
        url: "https://www.fnp.com/images/pr/l/v20221109185551/luxury-wishes-floral-bouquet_1.jpg",
        alt: ""
      },
      label: "With Banner",
      price: "4845"
    },
    {
      _id: "7g89epag",
      link: "/",
      image: {
        url: "https://www.fnp.com/images/pr/l/v20221205202947/fudge-brownie-cake-half-kg_4.jpg",
        alt: ""
      },
      label: "With Chocolates",
      price: "4945"
    }
  ]
};

export const dummyNonImageVariantData = {
  title: "Customize the quantity as you require",
  content: [
    {
      _id: "f78s6g78sr",
      label: "1kg",
      price: "4645"
    },
    {
      _id: "897s987g9",
      label: "2kg",
      price: "4845"
    },
    {
      _id: "8sy7fg978s6rh",
      label: "3kg",
      price: "4945"
    }
  ]
};

export const dummyEnhancementsData: EnhancementType[] = [
  {
    _id: "7yv78tg",
    label: "Sugar free",
    price: 99,
    image: { url: "https://imgcdn.floweraura.com/IMG_2184.jpg", alt: "" }
  },
  {
    _id: "897sg89",
    label: "Heart shape",
    price: 79,
    image: { url: "https://imgcdn.floweraura.com/rakhi-card.jpg", alt: "" }
  },
  {
    _id: "s978g68",
    label: "Round shape",
    price: 49,
    image: { url: "https://imgcdn.floweraura.com/IMG_2184.jpg", alt: "" }
  },
  {
    _id: "s978kae",
    label: "Eggless",
    price: 25,
    image: {
      url: "https://imgcdn.floweraura.com/DSC_1243_0.jpg?tr=w-304,q-70",
      alt: ""
    }
  },
  {
    _id: "s9785fa",
    label: "Choco chips",
    price: 10,
    image: { url: "https://imgcdn.floweraura.com/cake-homepage_0.jpg", alt: "" }
  }
];

export const dummyFlavorsData: FlavorType[] = [
  { _id: "8s7jvd76", label: "Vanilla", price: 0 },
  { _id: "8s7g9ag9", label: "Strawberry", price: 79 },
  { _id: "8s7grgsa", label: "Blueberry", price: 29 },
  { _id: "8s725636", label: "Butterscotch", price: 99 },
  { _id: "8s7g9345", label: "Chocolate", price: 119 }
];

export const dummyAddons: LocalAddonsDocument[] = [
  {
    _id: "1",
    label: "Gourmet Cheese Platter",
    image: {
      url: "https://imgcdn.floweraura.com/DSC_1243_0.jpg?tr=w-304,q-70",
      alt: "Gourmet Cheese Platter"
    },
    category: "Food",
    pricePerUnit: 29
  },
  {
    _id: "2",
    label: "Organic Honey Jar",
    image: {
      url: "https://imgcdn.floweraura.com/cake-homepage_0.jpg",
      alt: "Organic Honey Jar"
    },
    category: "Food",
    pricePerUnit: 15
  },
  {
    _id: "3",
    label: "Handmade Pottery Mug",
    image: {
      url: "https://imgcdn.floweraura.com/IMG_2184.jpg",
      alt: "Handmade Pottery Mug"
    },
    category: "Homeware",
    pricePerUnit: 22
  },
  {
    _id: "4",
    label: "Scented Candle Set",
    image: {
      url: "https://imgcdn.floweraura.com/rakhi-card.jpg",
      alt: "Scented Candle Set"
    },
    category: "Homeware",
    pricePerUnit: 18
  },
  {
    _id: "5",
    label: "Luxury Bathrobe",
    image: {
      url: "https://imgcdn.floweraura.com/DSC_1243_0.jpg?tr=w-304,q-70",
      alt: "Luxury Bathrobe"
    },
    category: "Apparel",
    pricePerUnit: 55
  },
  {
    _id: "6",
    label: "Essential Oil Diffuser",
    image: {
      url: "https://imgcdn.floweraura.com/cake-homepage_0.jpg",
      alt: "Essential Oil Diffuser"
    },
    category: "Homeware",
    pricePerUnit: 35
  },
  {
    _id: "7",
    label: "Handcrafted Leather Wallet",
    image: {
      url: "https://imgcdn.floweraura.com/IMG_2184.jpg",
      alt: "Handcrafted Leather Wallet"
    },
    category: "Accessories",
    pricePerUnit: 40
  },
  {
    _id: "8",
    label: "Organic Fruit Basket",
    image: {
      url: "https://imgcdn.floweraura.com/rakhi-card.jpg",
      alt: "Organic Fruit Basket"
    },
    category: "Food",
    pricePerUnit: 25
  },
  {
    _id: "9",
    label: "Vintage Wall Clock",
    image: {
      url: "https://imgcdn.floweraura.com/cake-homepage_0.jpg",
      alt: "Vintage Wall Clock"
    },
    category: "Homeware",
    pricePerUnit: 45
  },
  {
    _id: "10",
    label: "Silk Scarf",
    image: {
      url: "https://imgcdn.floweraura.com/DSC_1243_0.jpg?tr=w-304,q-70",
      alt: "Silk Scarf"
    },
    category: "Apparel",
    pricePerUnit: 32
  },
  {
    _id: "11",
    label: "Exotic Tea Sampler",
    image: {
      url: "https://imgcdn.floweraura.com/cake-homepage_0.jpg",
      alt: "Exotic Tea Sampler"
    },
    category: "Food",
    pricePerUnit: 20
  },
  {
    _id: "12",
    label: "Handmade Wooden Coasters",
    image: {
      url: "https://imgcdn.floweraura.com/rakhi-card.jpg",
      alt: "Handmade Wooden Coasters"
    },
    category: "Homeware",
    pricePerUnit: 12
  },
  {
    _id: "13",
    label: "Designer Sunglasses",
    image: {
      url: "https://imgcdn.floweraura.com/IMG_2184.jpg",
      alt: "Designer Sunglasses"
    },
    category: "Accessories",
    pricePerUnit: 85
  },
  {
    _id: "14",
    label: "Organic Soap Collection",
    image: {
      url: "https://imgcdn.floweraura.com/DSC_1243_0.jpg?tr=w-304,q-70",
      alt: "Organic Soap Collection"
    },
    category: "Personal Care",
    pricePerUnit: 22
  },
  {
    _id: "15",
    label: "Wool Throw Blanket",
    image: {
      url: "https://imgcdn.floweraura.com/rakhi-card.jpg",
      alt: "Wool Throw Blanket"
    },
    category: "Homeware",
    pricePerUnit: 48
  },
  {
    _id: "16",
    label: "Handmade Ceramic Vase",
    image: {
      url: "https://imgcdn.floweraura.com/cake-homepage_0.jpg",
      alt: "Handmade Ceramic Vase"
    },
    category: "Homeware",
    pricePerUnit: 30
  },
  {
    _id: "17",
    label: "Fashionable Tote Bag",
    image: {
      url: "https://imgcdn.floweraura.com/rakhi-card.jpg",
      alt: "Fashionable Tote Bag"
    },
    category: "Accessories",
    pricePerUnit: 28
  },
  {
    _id: "18",
    label: "Handmade Jewelry Set",
    image: {
      url: "https://imgcdn.floweraura.com/DSC_1243_0.jpg?tr=w-304,q-70",
      alt: "Handmade Jewelry Set"
    },
    category: "Accessories",
    pricePerUnit: 60
  },
  {
    _id: "19",
    label: "Gourmet Olive Oil",
    image: {
      url: "https://imgcdn.floweraura.com/cake-homepage_0.jpg",
      alt: "Gourmet Olive Oil"
    },
    category: "Food",
    pricePerUnit: 23
  },
  {
    _id: "20",
    label: "Elegant Table Runner",
    image: {
      url: "https://imgcdn.floweraura.com/IMG_2184.jpg",
      alt: "Elegant Table Runner"
    },
    category: "Homeware",
    pricePerUnit: 34
  },
  {
    _id: "21",
    label: "Custom Portrait Painting",
    image: {
      url: "https://imgcdn.floweraura.com/cake-homepage_0.jpg",
      alt: "Custom Portrait Painting"
    },
    category: "Art",
    pricePerUnit: 150
  },
  {
    _id: "22",
    label: "Eco-Friendly Tote",
    image: {
      url: "https://imgcdn.floweraura.com/rakhi-card.jpg",
      alt: "Eco-Friendly Tote"
    },
    category: "Accessories",
    pricePerUnit: 18
  },
  {
    _id: "23",
    label: "Luxurious Spa Gift Set",
    image: {
      url: "https://imgcdn.floweraura.com/DSC_1243_0.jpg?tr=w-304,q-70",
      alt: "Luxurious Spa Gift Set"
    },
    category: "Personal Care",
    pricePerUnit: 65
  },
  {
    _id: "24",
    label: "Rustic Wooden Bowl",
    image: {
      url: "https://imgcdn.floweraura.com/IMG_2184.jpg",
      alt: "Rustic Wooden Bowl"
    },
    category: "Homeware",
    pricePerUnit: 27
  },
  {
    _id: "25",
    label: "Elegant Silk Pillowcase",
    image: {
      url: "https://imgcdn.floweraura.com/cake-homepage_0.jpg",
      alt: "Elegant Silk Pillowcase"
    },
    category: "Homeware",
    pricePerUnit: 40
  },
  {
    _id: "26",
    label: "Handmade Knit Hat",
    image: {
      url: "https://imgcdn.floweraura.com/rakhi-card.jpg",
      alt: "Handmade Knit Hat"
    },
    category: "Apparel",
    pricePerUnit: 25
  },
  {
    _id: "27",
    label: "Deluxe Coffee Maker",
    image: {
      url: "https://imgcdn.floweraura.com/DSC_1243_0.jpg?tr=w-304,q-70",
      alt: "Deluxe Coffee Maker"
    },
    category: "Appliances",
    pricePerUnit: 120
  }
];

export const dummyProductColorData = [
  { _id: "76ae56f5aeg", label: "Crimson and White" },
  { _id: "76aemj298sj", label: "Gold and silver" },
  { _id: "76ae5a83jdw", label: "Lime and Torquiose" },
  { _id: "76ae6aet983", label: "Vermillion and Black" },
  { _id: "76ae56ftaet", label: "Indigo and Mauve" }
];
