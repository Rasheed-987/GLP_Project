"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Locale } from "../../../../lib/i18n/config";
import Button from "../../(web)/components/Button";
import { getDictionary } from "../../../../lib/i18n/dictionaries";
import clientApi from "../../../../lib/clientApi";
import toast from "react-hot-toast";

export default function ForgetPasswordPage() {
    const params = useParams();
    const router = useRouter();
    const lang = params.lang as Locale;
    const [dict, setDict] = React.useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    React.useEffect(() => {
        getDictionary(lang).then(setDict);
    }, [lang]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Store email in sessionStorage to use in next steps
            sessionStorage.setItem("reset_email", email);

            const response = await clientApi.post("/api/auth/forgot-password", { email });
            toast.success(response.data.message || "OTP sent to your email!");
            router.push(`/${lang}/verify-otp`);
        } catch (error: any) {
            toast.error(error.message || "Failed to send OTP");
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
                        {dict.auth.forgotPassword.title}
                    </h1>
                    <p className="mt-2 text-sm text-[#00000099]">
                        {dict.auth.forgotPassword.description}
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="sr-only">
                            {dict.auth.forgotPassword.email}
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none relative block w-full px-4 py-3 border border-border-stroke placeholder-[#00000066] text-black rounded-xl focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm bg-[#F7FAF9]"
                            placeholder={dict.auth.forgotPassword.email}
                        />
                    </div>

                    <div>
                        <Button type="submit" className="w-full" loading={loading}>
                            {dict.auth.forgotPassword.sendOTP}
                        </Button>
                    </div>

                    <div className="text-center">
                        <Link
                            href={`/${lang}/sign-in`}
                            className="text-sm font-semibold text-brand-blue hover:text-brand-green transition-colors"
                        >
                            {dict.auth.forgotPassword.backToSignIn}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
