import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;
        console.log(reqBody);
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
        });
        if (!user) {
            return NextResponse.json(
                {
                    error: "invalid token",
                },
                { status: 400 }

            );
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "email verified", success: true });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            {
                status: 500,
            }
        );
    }
}
