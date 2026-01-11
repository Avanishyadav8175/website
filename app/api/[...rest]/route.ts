import { NextResponse } from "next/server"

export const GET = async () => {
    return NextResponse.json(
        {
            error: "access from unverified source",
            message: "you should not be here",
        },
        { status: 401 }
    );
}

export const POST = async () => {
    return NextResponse.json(
        {
            error: "access from unverified source",
            message: "you should not be here",
        },
        { status: 401 }
    );
}