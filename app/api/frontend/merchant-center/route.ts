export const dynamic = "force-dynamic";

import { MerchantCenterProductsType } from "@/common/types/merchantCenter";
import { Response } from "@/common/utils/api/next";
import { getMerchantCenterData } from "./controller";
import { serverErrorResponse } from "@/common/utils/api/error";
import { NextResponse } from "next/server";


export const GET = async () => {
    try {
        const products = await getMerchantCenterData();
        const headers: (keyof MerchantCenterProductsType)[] = [
            "id", "title", "description", "link",
            "image_link", "price", "availability",
            "brand", "condition", "gtin"
        ];

        const rows = products.map((r) => ([
            r.id, r.title, r.description, r.link,
            r.image_link, r.price, r.availability,
            r.brand, r.condition, r.gtin
        ].join("\t")));

        const fileContent = [
            headers.join("\t"),
            ...rows
        ].join("\n");

        const res = new NextResponse(fileContent);
        res.headers.set('Content-Disposition','attachment; filename=products.txt');
        res.headers.set('Content-Type','text/plain');
        return res;
    }
    catch (err) {
        console.error("Error", err);
        return Response<MerchantCenterProductsType[]>(serverErrorResponse);
    }
}