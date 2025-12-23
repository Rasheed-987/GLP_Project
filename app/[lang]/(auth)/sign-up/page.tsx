"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Locale } from "@/lib/i18n/config";
import Button from "../../(web)/components/Button";
import { getDictionary } from "@/lib/i18n/dictionaries";
import clientApi from "@/lib/axios";
import toast from "react-hot-toast";

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.413 7.632 7.244 4.5 12 4.5c4.757 0 8.587 3.132 9.963 7.178.07.207.07.431 0 .639C20.587 15.368 16.756 18.5 12 18.5c-4.757 0-8.587-3.132-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
);

export default function SignUpPage() {
    const params = useParams();
    const router = useRouter();
    const lang = params.lang as Locale;
    const [dict, setDict] = React.useState<any>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    React.useEffect(() => {
        getDictionary(lang).then(setDict);
    }, [lang]);

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
            const { confirmPassword, ...registerData } = formData;
            const response = await clientApi.post("/api/auth/register", registerData);

            toast.success(response.data.message || "Account created successfully!");
            router.push(`/${lang}/sign-in`);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!dict) return null;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                {/* Heading */}
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
                        {dict.auth.signUp.title}
                    </h1>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="sr-only">
                                {dict.auth.signUp.fullName}
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-4 py-3 border border-border-stroke placeholder-[#00000066] text-black rounded-xl focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm bg-[#F7FAF9]"
                                placeholder={dict.auth.signUp.fullName}
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="sr-only">
                                {dict.auth.signUp.email}
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-4 py-3 border border-border-stroke placeholder-[#00000066] text-black rounded-xl focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm bg-[#F7FAF9]"
                                placeholder={dict.auth.signUp.email}
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label htmlFor="phone" className="sr-only">
                                {dict.auth.signUp.phone}
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-4 py-3 border border-border-stroke placeholder-[#00000066] text-black rounded-xl focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm bg-[#F7FAF9]"
                                placeholder={dict.auth.signUp.phone}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                {dict.auth.signUp.password}
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-4 py-3 border border-border-stroke placeholder-[#00000066] text-black rounded-xl focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm bg-[#F7FAF9]"
                                placeholder={dict.auth.signUp.password}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#00000066] hover:text-black transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="sr-only">
                                {dict.auth.signUp.confirmPassword}
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-4 py-3 border border-border-stroke placeholder-[#00000066] text-black rounded-xl focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm bg-[#F7FAF9]"
                                placeholder={dict.auth.signUp.confirmPassword}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#00000066] hover:text-black transition-colors"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Creating Account..." : dict.auth.signUp.signUpBtn}
                        </Button>
                    </div>

                    {/* Sign In Link */}
                    <div className="text-center text-sm pt-4">
                        <span className="text-[#00000099] mr-2">
                            {dict.auth.signUp.haveAccount}
                        </span>
                        <Link
                            href={`/${lang}/sign-in`}
                            className="font-bold gradient-text"
                        >
                            {dict.auth.signUp.signIn}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
