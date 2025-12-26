import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import { sendOTPEmail } from "../../../../lib/mail";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            // For security, don't reveal if user exists or not
            return NextResponse.json({ message: "If your email exists in our records, you will receive an OTP shortly." });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Set OTP and expiry (10 minutes)
        user.resetPasswordOTP = otp;
        user.resetPasswordOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        // Send Email
        try {
            await sendOTPEmail(email, otp);
        } catch (error: any) {
            console.error("Email sending error:", error);
            return NextResponse.json({ message: "Failed to send email. Please try again later." }, { status: 500 });
        }

        return NextResponse.json({ message: "OTP sent to your email!" });

    } catch (error: any) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
    }
}
