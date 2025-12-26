import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { email, password, token } = await req.json();

        if (!email || !password || !token) {
            return NextResponse.json({ message: "Email, password, and token are required" }, { status: 400 });
        }

        // Verify the reset token
        try {
            const decoded: any = jwt.verify(token, JWT_SECRET);
            if (decoded.email !== email || !decoded.verified) {
                return NextResponse.json({ message: "Invalid reset token" }, { status: 400 });
            }
        } catch (err) {
            return NextResponse.json({ message: "Reset token expired or invalid" }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Clear OTP fields
        user.resetPasswordOTP = undefined;
        user.resetPasswordOTPExpires = undefined;

        await user.save();

        return NextResponse.json({ message: "Password reset successfully!" });

    } catch (error: any) {
        console.error("Reset password error:", error);
        return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
    }
}
