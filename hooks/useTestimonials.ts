'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Stat {
  value: string;
  label: string;
}

interface CarouselItem {
  tag: string;
  quote: string;
  author: string;
  role: string;
  image: string;
  logo: string;
  stats: Stat[];
}

export function useTestimonials(lang: string) {
  return useQuery({
    queryKey: ['testimonials', lang],
    queryFn: async () => {
      const { data } = await axios.get(`/api/testimonials?lang=${lang}`);
      
      if (!data || !Array.isArray(data)) return [];

      return data.map((t: any) => ({
        tag: t.graduateDate,
        quote: t.description,
        author: t.name,
        role: t.profession,
        image: t.image || "/images/homecenter1.png", // Fallback image
        logo: t.companyLogo || "/images/logo.png", // Fallback logo
        stats: t.achievements && t.achievements.length > 0 ? t.achievements : [
          { value: "40%", label: "Improvement in Patient Outcomes" },
          { value: "30%", label: "Reduction in Operational Costs" },
          { value: "24/7", label: "Virtual Health Support" }
        ]
      })) as CarouselItem[];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
