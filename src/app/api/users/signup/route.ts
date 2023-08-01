import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'

import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';



connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, password, email } = reqBody;
        const user = await User.findOne({ email })

        if (user) {
            console.log('user exist')
            return NextResponse.json({ message: 'user already exists' }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        //send verification email

        const r = await sendEmail({
            email, emailType: "VERIFY",
            userId: savedUser._id
        })

        return NextResponse.json({
            mesage: 'User created successfully',
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}
