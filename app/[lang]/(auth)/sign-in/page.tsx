"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Locale } from "@/lib/i18n/config";
import Button from "../../(web)/components/Button";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default function SignInPage() {
    const params = useParams();
    const lang = params.lang as Locale;
    const [dict, setDict] = React.useState<any>(null);
    const [showPassword, setShowPassword] = useState(false);

    React.useEffect(() => {
        getDictionary(lang).then(setDict);
    }, [lang]);

    if (!dict) return null;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md space-y-8">
                {/* Heading */}
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
                        {dict.auth.signIn.title}
                    </h1>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="sr-only">
                                {dict.auth.signIn.email}
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-border-stroke placeholder-[#00000066] text-black rounded-xl focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm bg-[#F7FAF9]"
                                placeholder={dict.auth.signIn.email}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                {dict.auth.signIn.password}
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-border-stroke placeholder-[#00000066] text-black rounded-xl focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm bg-[#F7FAF9]"
                                placeholder={dict.auth.signIn.password}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#00000066] hover:text-black transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.413 7.632 7.244 4.5 12 4.5c4.757 0 8.587 3.132 9.963 7.178.07.207.07.431 0 .639C20.587 15.368 16.756 18.5 12 18.5c-4.757 0-8.587-3.132-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="flex justify-end">
                        <Link
                            href={`/${lang}/forgot-password`}
                            className="text-sm font-semibold text-brand-blue hover:text-brand-green transition-colors"
                        >
                            {dict.auth.signIn.forgotPassword}
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <Button type="submit" className="w-full">
                            {dict.auth.signIn.signInBtn}
                        </Button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm">
                        <span className="text-[#00000099] mr-2">
                            {dict.auth.signIn.noAccount}
                        </span>
                        <Link
                            href={`/${lang}/sign-up`}
                            className="font-bold gradient-text"
                        >
                            {dict.auth.signIn.signUp}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
