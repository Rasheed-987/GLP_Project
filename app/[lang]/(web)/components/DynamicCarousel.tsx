'use client';

import React from 'react';
import Carousel from './Carousel';
import { useTestimonials } from '../../../../hooks/useTestimonials';

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

interface DynamicCarouselProps {
  lang: string;
  graduateLabel?: string;
}

export default function DynamicCarousel({ lang, graduateLabel }: DynamicCarouselProps) {
  const { data: testimonials, isLoading } = useTestimonials(lang);

  if (isLoading) return <div className="h-[500px] flex items-center justify-center">Loading...</div>;
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <Carousel 
      items={testimonials} 
      lang={lang} 
      graduateLabel={graduateLabel} 
    />
  );
}
