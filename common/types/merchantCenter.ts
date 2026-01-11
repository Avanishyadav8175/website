export type MerchantCenterProductsType = {
    id: string
    title: string
    description: string
    link: string
    image_link: string
    price: string
    availability: "in stock" | "out of stock"
    condition: "new"
    brand: string
    gtin: string
}