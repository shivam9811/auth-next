import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { connect } from '@/dbConfig/dbConfig';
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        const user: any = await User.find({ email })
        const userId = user[0].id;
        await sendEmail({ email, emailType: 'RESET', userId })

        return NextResponse.json({ message: 'success' })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}