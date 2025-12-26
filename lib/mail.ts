import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendOTPEmail = async (to: string, otp: string) => {
    const mailOptions = {
        from: `"UAE GLP Auth" <${process.env.SMTP_USER}>`,
        to,
        subject: 'Your Password Reset OTP Code',
        text: `Your OTP code for password reset is: ${otp}. It will expire in 10 minutes.`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #045A86; text-align: center;">UAE GLP</h2>
                <p>Hello,</p>
                <p>We received a request to reset your password. Use the following 6-digit One-Time Password (OTP) to proceed:</p>
                <div style="background-color: #F7FAF9; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 10px; border: 1px solid #019977; color: #000; letter-spacing: 5px;">
                    ${otp}
                </div>
                <p>This code will expire in 10 minutes.</p>
                <p>If you didn't request a password reset, please ignore this email.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px;" />
                <p style="font-size: 12px; color: #999; text-align: center;">© 2025 UAE Government Leaders Program. All rights reserved.</p>
            </div>
        `,
    };

    return transporter.sendMail(mailOptions);
};
