"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Locale } from "../../../../lib/i18n/config";
import Button from "../../(web)/components/Button";
import { getDictionary } from "../../../../lib/i18n/dictionaries";
import clientApi from "../../../../lib/clientApi";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
    const params = useParams();
    const router = useRouter();
    const lang = params.lang as Locale;
    const [dict, setDict] = React.useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const resetToken = sessionStorage.getItem("reset_token");
            await clientApi.post("/api/auth/reset-password", {
                email,
                password: formData.password,
                token: resetToken // If applicable
            });
            toast.success("Password reset successfully!");
            sessionStorage.removeItem("reset_email");
            sessionStorage.removeItem("reset_token");
            router.push(`/${lang}/sign-in`);
        } catch (error: any) {
            toast.error(error.message || "Failed to reset password");
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
                        {dict.auth.resetPassword.title}
                    </h1>
                    <p className="mt-2 text-sm text-[#00000099]">
                        {dict.auth.resetPassword.description}
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="password" surname-only className="sr-only">
                                {dict.auth.resetPassword.password}
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-4 py-3 border border-border-stroke placeholder-[#00000066] text-black rounded-xl focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm bg-[#F7FAF9]"
                                placeholder={dict.auth.resetPassword.password}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" surname-only className="sr-only">
                                {dict.auth.resetPassword.confirmPassword}
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-4 py-3 border border-border-stroke placeholder-[#00000066] text-black rounded-xl focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm bg-[#F7FAF9]"
                                placeholder={dict.auth.resetPassword.confirmPassword}
                            />
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="w-full" loading={loading}>
                            {dict.auth.resetPassword.resetBtn}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
