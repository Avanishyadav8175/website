import { DOMAIN } from "@/common/constants/domain";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { MongooseErrorType } from "@/common/types/apiTypes";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { MerchantCenterProductsType } from "@/common/types/merchantCenter";
import { handleError } from "@/common/utils/api/error";
import connectDB from "@/db/mongoose/connection";
import models from "@/db/mongoose/models";

const { Contents } = models;


function generateRandomGTIN14() {
    function checkDigit14(gtinArray: any) {
        var sum = 0;
        for (var index = 0; index < gtinArray.length; index++) {
            if (index % 2 !== 0) {
                sum += gtinArray[index];
            } else {
                sum += gtinArray[index] * 3;
            }
        }

        var checkDigit = 0;
        var remainder = sum % 10;

        if (remainder !== 0) {
            checkDigit = 10 - remainder;
        }

        return checkDigit;
    }

    var packageLevel = 0;
    var gs1Prefix = [0, 3];
    var labelerCode = [];
    for (var index = 0; index < 10; index++) {
        labelerCode[index] = Math.floor(Math.random() * 10);
    }
    var gtinArray = [];
    gtinArray.push(packageLevel);
    gtinArray.push(gs1Prefix[0]);
    gtinArray.push(gs1Prefix[1]);
    for (index = 0; index < 10; index++) {
        gtinArray.push(labelerCode[index]);
    }
    gtinArray.push(checkDigit14(gtinArray));
    var gtinString = "";
    for (index = 0; index < gtinArray.length; index++) {
        gtinString += "" + gtinArray[index];
    }
    return gtinString;
}


export const getMerchantCenterData = async (): Promise<MerchantCenterProductsType[]> => {
    try {
        await connectDB();

        const products = await Contents.find({
            isActive: true,
            type: "product"
        })
            .select([
                "sku",
                "name",
                "seoMeta.description",
                "slug",
                "price.base.mrp",
                "price.base.price",
                "updatedAt",
            ])
            .populate([
                { path: "media.primary", select: "url" }
            ])
            .sort({ name: 1 });

        if (!products) {
            return [];
        }

        const data: MerchantCenterProductsType[] = products.map((p) => ({
            gtin: generateRandomGTIN14(),
            availability: "in stock",
            brand: "Floriwish",
            condition: "new",

            title: (p.name || "").replace('/\t/g', ' ').replace('/\n/g', ''),
            description: (p.seoMeta?.description || "Product Description").replace('/\t/g', ' ').replace('/\n/g', ''),
            id: `FW_${p.sku.substring(2)}`,
            image_link: (p.media.primary as ImageDocument).url,
            link: `${DOMAIN}${FRONTEND_LINKS.PRODUCT_PAGE}/${p.slug}`,
            price: `${(p.price as ContentPriceDocument)?.base.price}.00 INR`
        }));

        return data;

    } catch (error: any) {
        console.error(handleError(error as MongooseErrorType));
        return [];
    }
};
