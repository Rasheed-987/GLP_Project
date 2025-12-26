"use client";

import React, { useState, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Locale } from "../../../../lib/i18n/config";
import { getDictionary } from "../../../../lib/i18n/dictionaries";
import { Globe, Lock, Save, Loader2, User } from "lucide-react";
import clientApi from "../../../../lib/clientApi";
import toast from "react-hot-toast";

export default function SettingsPage() {
    const params = useParams();
    const lang = params.lang as Locale;
    const [dict, setDict] = useState<any>(null);
    const pathname = usePathname();
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        getDictionary(lang).then(setDict);

        // Get user from local storage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [lang]);

    const handleLanguageChange = (newLang: Locale) => {
        const redirectedPathName = (pathname: string) => {
            if (!pathname) return "/";
            const segments = pathname.split("/");
            segments[1] = newLang;
            return segments.join("/");
        };
        router.push(redirectedPathName(pathname));
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error(lang === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            toast.error(lang === 'ar' ? 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل' : 'Password must be at least 6 characters');
            return;
        }

        setIsSubmitting(true);
        try {
            await clientApi.post("/api/auth/change-password", {
                oldPassword,
                newPassword
            });

            toast.success(lang === 'ar' ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully');

            // Logout and redirect
            localStorage.removeItem("user");
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

            setTimeout(() => {
                router.push(`/${lang}/sign-in`);
            }, 1000);

        } catch (error: any) {
            const msg = error.response?.data?.error || 'Failed to update password';
            toast.error(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!dict) return null;

    return (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div>
                <h1 className="text-3xl font-bold text-black ">{dict.dashboard.sidebar.settings || (lang === 'ar' ? "الإعدادات" : "Settings")}</h1>
                <p className="text-[#00000066]">{lang === 'ar' ? "إدارة تفضيلاتك وأمان حسابك" : "Manage your preferences and account security"}</p>
            </div>

            {/* Profile Information */}
            <div className="bg-white rounded-3xl border border-border-stroke p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-black">{lang === 'ar' ? "معلومات الملف الشخصي" : "Profile Information"}</h2>
                        <p className="text-sm text-[#00000066]">{lang === 'ar' ? "تفاصيل حسابك الشخصي" : "Your personal account details"}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#00000066] uppercase tracking-wider block">
                            {lang === 'ar' ? "الاسم الكامل" : "Full Name"}
                        </label>
                        <div className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] text-black font-medium">
                            {user?.fullName || '-'}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#00000066] uppercase tracking-wider block">
                            {lang === 'ar' ? "البريد الإلكتروني" : "Email Address"}
                        </label>
                        <div className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] text-black font-medium">
                            {user?.email || '-'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Language Settings */}
            <div className="bg-white rounded-3xl border border-border-stroke p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                        <Globe className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-black">{lang === 'ar' ? "اللغة" : "Language"}</h2>
                        <p className="text-sm text-[#00000066]">{lang === 'ar' ? "اختر لغة الواجهة" : "Choose your interface language"}</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => handleLanguageChange('en')}
                        className={`cursor-pointer flex-1 h-12 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 font-bold
                            ${lang === 'en'
                                ? 'border-brand-blue bg-brand-blue/5 text-brand-blue shadow-sm'
                                : 'border-dashed border-border-stroke text-[#00000066] hover:border-brand-blue/50 hover:bg-gray-50'}`}
                    >
                        <span className="text-xl mb-[2px]">🇺🇸</span> <span>English</span>
                    </button>
                    <button
                        onClick={() => handleLanguageChange('ar')}
                        className={`cursor-pointer flex-1 h-12 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 font-bold
                            ${lang === 'ar'
                                ? 'border-brand-blue bg-brand-blue/5 text-brand-blue shadow-sm'
                                : 'border-dashed border-border-stroke text-[#00000066] hover:border-brand-blue/50 hover:bg-gray-50'}`}
                    >
                        <span className="text-xl">🇦🇪</span> <span>العربية</span>
                    </button>
                </div>
            </div>

            {/* Password Settings */}
            <div className="bg-white rounded-3xl border border-border-stroke p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                        <Lock className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-black">{lang === 'ar' ? "كلمة المرور" : "Password"}</h2>
                        <p className="text-sm text-[#00000066]">{lang === 'ar' ? "تحديث كلمة المرور الخاصة بك" : "Update your password"}</p>
                    </div>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-6 max-w-md">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#00000066] uppercase tracking-wider block">
                            {lang === 'ar' ? "كلمة المرور الحالية" : "Current Password"}
                        </label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-dashed border-border-stroke">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#00000066] uppercase tracking-wider block">
                                {lang === 'ar' ? "كلمة المرور الجديدة" : "New Password"}
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#00000066] uppercase tracking-wider block">
                                {lang === 'ar' ? "تأكيد كلمة المرور الجديدة" : "Confirm New Password"}
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-border-stroke bg-[#F7FAF9] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer w-full py-4 bg-brand-gradient text-white rounded-2xl text-sm font-bold shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-all font-outfit disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {lang === 'ar' ? "تحديث كلمة المرور" : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
