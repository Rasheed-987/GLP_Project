import { useQuery } from '@tanstack/react-query';
import clientApi from '../lib/clientApi';
import { Locale } from '../lib/i18n/config';

export const useDashboardStats = () => {
    return useQuery({
        queryKey: ['dashboard', 'stats'],
        queryFn: async () => {
            const { data } = await clientApi.get('/api/dashboard/stats');
            return data;
        },
        staleTime: 10 * 60 * 1000, // 10 minutes cache for stats
    });
};

export const useRecentArticles = (lang: Locale, limit: number = 3) => {
    return useQuery({
        queryKey: ['articles', 'recent', lang, limit],
        queryFn: async () => {
            const { data } = await clientApi.get(`/api/articles?lang=${lang}&limit=${limit}`);
            return data;
        },
    });
};

export const useRecentNews = (lang: Locale, limit: number = 4) => {
    return useQuery({
        queryKey: ['news', 'recent', lang, limit],
        queryFn: async () => {
            const { data } = await clientApi.get(`/api/news?lang=${lang}&limit=${limit}`);
            return data;
        },
    });
};

export const useRecentTestimonials = (lang: Locale, limit: number = 2) => {
    return useQuery({
        queryKey: ['testimonials', 'recent', lang, limit],
        queryFn: async () => {
            const { data } = await clientApi.get(`/api/testimonials?lang=${lang}&limit=${limit}`);
            return data;
        },
    });
};

export const useArticles = (lang: Locale) => {
    return useQuery({
        queryKey: ['articles', 'all'],
        queryFn: async () => {
            const { data } = await clientApi.get(`/api/articles`);
            return data;
        },
    });
};

export const useNews = (lang: Locale) => {
    return useQuery({
        queryKey: ['news', 'all'],
        queryFn: async () => {
            const { data } = await clientApi.get(`/api/news`);
            return data;
        },
    });
};

export const useTestimonials = (lang: Locale) => {
    return useQuery({
        queryKey: ['testimonials', 'all'],
        queryFn: async () => {
            const { data } = await clientApi.get(`/api/testimonials`);
            return data;
        },
    });
};
