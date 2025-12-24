"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Locale } from "../../../../lib/i18n/config";
import LoadingScreen from "../../../../components/LoadingScreen";

interface AuthCheckProps {
    children: React.ReactNode;
    lang: Locale;
}

export default function AuthCheck({ children, lang }: AuthCheckProps) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const userStr = localStorage.getItem("user");
            if (!userStr) {
                router.push(`/${lang}/sign-in`);
                return;
            }

            try {
                const user = JSON.parse(userStr);
                if (user && user.token) {
                    setIsAuthorized(true);
                } else {
                    router.push(`/${lang}/sign-in`);
                }
            } catch {
                localStorage.removeItem("user");
                router.push(`/${lang}/sign-in`);
            }
        };

        checkAuth();
    }, [lang, router]);

    if (!isAuthorized) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}
