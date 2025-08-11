"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface Slide {
  image: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaHref: string;
}

const SLIDES: Slide[] = [
  {
    image: "/images/banner-slider/banner.png",
    title: "به رؤیاژه خوش آمدید",
    subtitle: "دنیای اسرارآمیز بازی‌های رومیزی و پرونده‌های حل نشده",
    ctaText: "مشاهده محصولات",
    ctaHref: "/explore",
  },
  {
    image: "/images/banner-slider/magicborad.png",
    title: "جادوی بازی‌های رومیزی",
    subtitle: "استراتژی، خلاقیت و هیجان در یک قاب",
    ctaText: "کاوش بازی‌های استراتژی",
    ctaHref: "/explore?category=strategy",
  },
  {
    image: "/images/banner-slider/top-secret.png",
    title: "پرونده‌های محرمانه",
    subtitle: "رازهای حل‌نشده منتظر کشف شدن",
    ctaText: "مشاهده پرونده‌های جنایی",
    ctaHref: "/explore?category=mystery",
  },
];

const AUTOPLAY_MS = 5000;

const HeroSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const swiped = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  const goNext = () => setIndex((i) => (i + 1) % SLIDES.length);
  const goPrev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
    swiped.current = false;
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartX.current == null || touchStartY.current == null) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - touchStartY.current;
    // Only consider horizontal swipes with enough distance and dominant X
    const threshold = 40;
    if (
      !swiped.current &&
      Math.abs(dx) > threshold &&
      Math.abs(dx) > Math.abs(dy)
    ) {
      swiped.current = true;
      if (dx < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    touchStartX.current = null;
    touchStartY.current = null;
    swiped.current = false;
  };

  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Slides */}
      <div
        className="relative h-[220px] sm:h-[260px] md:h-[300px]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/40 to-black/30" />

            <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center p-6">
              <h2 className="text-white text-2xl font-bold mb-2 drop-shadow-md">
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className="text-purple-100 mb-4 max-w-[36ch]">
                  {slide.subtitle}
                </p>
              )}
              <Link
                href={slide.ctaHref}
                className="inline-block bg-[var(--accent-gold)] text-black px-4 py-2 text-sm rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                {slide.ctaText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`رفتن به اسلاید ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === index ? "bg-[var(--accent-gold)]" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
