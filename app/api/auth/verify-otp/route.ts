import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
        }

        const user = await User.findOne({
            email,
            resetPasswordOTP: otp,
            resetPasswordOTPExpires: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
        }

        // Generate a temporary reset token (valid for 10 minutes)
        // This prevents users from resetting password without verifying OTP again
        const resetToken = jwt.sign(
            { email: user.email, verified: true },
            JWT_SECRET,
            { expiresIn: '10m' }
        );

        return NextResponse.json({
            message: "OTP verified successfully!",
            resetToken
        });

    } catch (error: any) {
        console.error("Verify OTP error:", error);
        return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
    }
}
