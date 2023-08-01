import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';



connect();
export async function POST(req: NextRequest) {

    try {
        const { password, token } = await req.json();
        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({ message: 'Invalid Token' }, { status: 500 })
        }
        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password, salt)
        user.password = hashedPassword;


        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({ message: "password change successfully", success: true });


    } catch (error: any) {
        return NextResponse.json({ message: 'Failed to reset password' }, { status: 500 })
    }

}