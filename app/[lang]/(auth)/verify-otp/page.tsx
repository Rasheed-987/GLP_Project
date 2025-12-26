"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Locale } from "../../../../lib/i18n/config";
import Button from "../../(web)/components/Button";
import { getDictionary } from "../../../../lib/i18n/dictionaries";
import clientApi from "../../../../lib/clientApi";
import toast from "react-hot-toast";

export default function VerifyOTPPage() {
    const params = useParams();
    const router = useRouter();
    const lang = params.lang as Locale;
    const [dict, setDict] = React.useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        getDictionary(lang).then(setDict);
        const storedEmail = sessionStorage.getItem("reset_email");
        if (!storedEmail) {
            router.push(`/${lang}/forget-password`);
        } else {
            setEmail(storedEmail);
        }
    }, [lang, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await clientApi.post("/api/auth/verify-otp", { email, otp });
            // Store reset token (shoud be returned from API)
            if (response.data.resetToken) {
                sessionStorage.setItem("reset_token", response.data.resetToken);
            }
            toast.success(response.data.message || "OTP verified successfully!");
            router.push(`/${lang}/reset-password`);
        } catch (error: any) {
            toast.error(error.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setLoading(true);
        try {
            const response = await clientApi.post("/api/auth/forgot-password", { email });
            toast.success(response.data.message || "New OTP sent!");
        } catch (error: any) {
            toast.error(error.message || "Failed to resend OTP");
        } finally {
            setLoading(false);
        }
    };

    if (!dict) return null;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md space-y-8">
                {/* Heading */}
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
                        {dict.auth.verifyOTP.title}
                    </h1>
                    <p className="mt-2 text-sm text-[#00000099]">
                        {dict.auth.verifyOTP.description}
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="otp" className="sr-only">
                            {dict.auth.verifyOTP.otp}
                        </label>
                        <input
                            id="otp"
                            name="otp"
                            type="text"
                            required
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="appearance-none relative block w-full px-4 py-3 border border-border-stroke placeholder-[#00000066] text-black rounded-xl focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm bg-[#F7FAF9] text-center tracking-widest text-lg font-bold"
                            placeholder="------"
                        />
                    </div>

                    <div>
                        <Button type="submit" className="w-full" loading={loading}>
                            {dict.auth.verifyOTP.verifyBtn}
                        </Button>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleResend}
                            className="text-sm font-semibold text-brand-blue hover:text-brand-green transition-colors"
                        >
                            {dict.auth.verifyOTP.resendOTP}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
