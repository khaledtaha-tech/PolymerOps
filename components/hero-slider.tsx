'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Layers,
  Activity,
  Cpu,
  ShieldCheck,
  Pause,
  Play,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface HeroSliderProps {
  locale: Locale;
}

interface SlideItem {
  id: string;
  tag_en: string;
  tag_ar: string;
  title_en: string;
  title_ar: string;
  highlight_en: string;
  highlight_ar: string;
  description_en: string;
  description_ar: string;
  ctaPrimary_en: string;
  ctaPrimary_ar: string;
  ctaPrimaryHref: string;
  ctaSecondary_en: string;
  ctaSecondary_ar: string;
  ctaSecondaryHref: string;
  bgGradient: string;
  accentGlow: string;
  badgeIcon: React.ElementType;
  previewImage: string;
  mockupBadge_en: string;
  mockupBadge_ar: string;
  metrics: { value: string; label_en: string; label_ar: string }[];
}

const slides: SlideItem[] = [
  {
    id: 'slide-apps',
    tag_en: 'Enterprise Industrial Hub',
    tag_ar: 'المنظومة الصناعية الموحدة',
    title_en: 'Engineering & Operations Platform for',
    title_ar: 'المنظومة الهندسية والتشغيلية المتكاملة لـ',
    highlight_en: 'Modern Plastics Plants',
    highlight_ar: 'مصانع البلاستيك الحديثة',
    description_en: '12+ purpose-built applications for pipe extrusion, blown film, compounding formulations, and real-time plant workforce planning.',
    description_ar: 'أكثر من 12 تطبيقاً عملياً متخصصاً في بثق المواسير والأفلام، هندسة الخلطات والتحضير، وتخطيط القوى العاملة والورديات لحظياً.',
    ctaPrimary_en: 'Explore Applications',
    ctaPrimary_ar: 'استكشف التطبيقات',
    ctaPrimaryHref: '#applications-section',
    ctaSecondary_en: 'Request Consultation',
    ctaSecondary_ar: 'اطلب استشارة فنية',
    ctaSecondaryHref: '/request',
    bgGradient: 'from-[#071320] via-[#0b243b] to-[#081a2c]',
    accentGlow: 'bg-cyan-500/20',
    badgeIcon: Layers,
    previewImage: '/apps/master-vault.svg',
    mockupBadge_en: 'PolymerOps Cloud Ecosystem · 12 Nodes Online',
    mockupBadge_ar: 'منظومة PolymerOps السحابية · 12 نظاماً نشطاً',
    metrics: [
      { value: '12+', label_en: 'Specialized Apps', label_ar: 'تطبيق صناعي متخصص' },
      { value: '100%', label_en: 'Direct Plant Access', label_ar: 'وصول مباشر للمصانع' },
      { value: '24/7', label_en: 'Uptime Reliability', label_ar: 'جاهزية تشغيلية مستمرة' },
    ],
  },
  {
    id: 'slide-analytics',
    tag_en: 'Manufacturing Analytics',
    tag_ar: 'تحليلات تشغيلية متقدمة',
    title_en: 'Cut Material Scrap & Optimize',
    title_ar: 'خفض معدلات الهالك وتحسين',
    highlight_en: 'Extrusion Line Throughput',
    highlight_ar: 'إنتاجية خطوط البثق',
    description_en: 'Real-time telemetry, SDR tolerance calculations, automatic weight deviation tracking, and OEE performance metrics for PVC and HDPE production.',
    description_ar: 'تتبع لحظي لخطوط البثق، حسابات نسب SDR الدقيقة، مراقبة انحرافات أوزان المواسير، وتحليلات الكفاءة الشاملة OEE لمصانع PVC و HDPE.',
    ctaPrimary_en: 'Launch PipeCalc & Analytics',
    ctaPrimary_ar: 'افتح حاسبة المواسير والتحليلات',
    ctaPrimaryHref: 'https://pipecalc.polymerops.com/',
    ctaSecondary_en: 'View Production Suite',
    ctaSecondary_ar: 'شاهد منظومة الإنتاج',
    ctaSecondaryHref: 'https://pipe1.polymerops.com/',
    bgGradient: 'from-[#071a26] via-[#0d3448] to-[#092233]',
    accentGlow: 'bg-sky-500/25',
    badgeIcon: Activity,
    previewImage: '/apps/pipe-calc.svg',
    mockupBadge_en: 'PipeCalc Engine · SDR Dimension Tolerances',
    mockupBadge_ar: 'حاسبة المواسير · حسابات أبعاد وسماكات SDR',
    metrics: [
      { value: 'SDR 11-41', label_en: 'Standards Covered', label_ar: 'تغطية المعايير القياسية' },
      { value: '±0.5%', label_en: 'Weight Tolerance', label_ar: 'دقة تفاوت الأوزان' },
      { value: '15-25%', label_en: 'Scrap Reduction Target', label_ar: 'مستهدف خفض الهالك' },
    ],
  },
  {
    id: 'slide-compounding',
    tag_en: 'Process & Formulation Control',
    tag_ar: 'هندسة العمليات والخلطات',
    title_en: 'Master High-Precision Formulation &',
    title_ar: 'تحكم متقدم في الخلطات و',
    highlight_en: 'Blown Film Engineering',
    highlight_ar: 'هندسة أفلام البثق والنفخ',
    description_en: 'Scientific compounding control for stabilizers and fillers alongside Blown Film Pro calculations for blow-up ratios (BUR) and layflat rolls.',
    description_ar: 'تحكم علمي دقيق في تركيبات المواد والمثبتات الحرارية مع حسابات متكاملة لأفلام البثق والنفخ ونسب النفخ BUR وأوزان اللفات.',
    ctaPrimary_en: 'Open Blown Film Pro',
    ctaPrimary_ar: 'افتح تطبيق Blown Film Pro',
    ctaPrimaryHref: 'https://filmcalc.polymerops.com/',
    ctaSecondary_en: 'Compounding Manager',
    ctaSecondary_ar: 'نظام الخلط والتحضير',
    ctaSecondaryHref: 'https://cp.polymerops.com/',
    bgGradient: 'from-[#081720] via-[#092e38] to-[#061e27]',
    accentGlow: 'bg-teal-500/25',
    badgeIcon: Cpu,
    previewImage: '/apps/blown-film.svg',
    mockupBadge_en: 'Blown Film Pro · BUR & Layflat Calculations',
    mockupBadge_ar: 'Blown Film Pro · حسابات نسبة النفخ وعرض الرولات',
    metrics: [
      { value: 'BUR 1.5-4.0', label_en: 'Blow-Up Optimization', label_ar: 'تحسين نسبة النفخ' },
      { value: '100%', label_en: 'Formulation Repeatability', label_ar: 'تكرارية تجانس الخلطات' },
      { value: 'Plant-Proven', label_en: 'Industrial Benchmarks', label_ar: 'معايير مصنعية معتمدة' },
    ],
  },
  {
    id: 'slide-vault',
    tag_en: 'DevOps & Industrial Cloud',
    tag_ar: 'المنصة السحابية والأمان',
    title_en: 'Centralized Master Vault &',
    title_ar: 'منصة الخزينة الموحدة و',
    highlight_en: 'Encrypted Credential Security',
    highlight_ar: 'أمان الاعتمادات المشفرة',
    description_en: 'Unified ecosystem coordinating code repositories, AST code analysis, AES-256 encrypted access secrets, and multi-app orchestration.',
    description_ar: 'مركز موحد يربط مستودعات الأكواد التقنية، تحليل بنية الأنظمة، وتشفير AES-256 لإدارة بيانات الاعتماد وربط أدوات ومصانع المنظومة.',
    ctaPrimary_en: 'Access Master Vault',
    ctaPrimary_ar: 'دخول المنصة الموحدة',
    ctaPrimaryHref: 'https://master.polymerops.com/',
    ctaSecondary_en: 'Smart Secrets Manager',
    ctaSecondary_ar: 'مدير كلمات السر المشفرة',
    ctaSecondaryHref: 'https://pass.polymerops.com/',
    bgGradient: 'from-[#0f111a] via-[#161a29] to-[#0e1220]',
    accentGlow: 'bg-amber-500/20',
    badgeIcon: ShieldCheck,
    previewImage: '/apps/smart-vault.svg',
    mockupBadge_en: 'Master Vault · AES-256 Encrypted Telemetry',
    mockupBadge_ar: 'الخزينة الرئيسية · تشفير AES-256 ومزامنة الأنظمة',
    metrics: [
      { value: 'AES-256', label_en: 'Cryptographic Security', label_ar: 'تشفير عالي الأمان' },
      { value: '12 Hosts', label_en: 'Integrated Ecosystem', label_ar: 'بيئة تطبيقات موحدة' },
      { value: 'Real-Time', label_en: 'Reconnaissance & Sync', label_ar: 'مزامنة ورصد لحظي' },
    ],
  },
];

export function HeroSlider({ locale }: HeroSliderProps) {
  const isRtl = locale === 'ar';
  const ArrowNext = isRtl ? ArrowLeft : ArrowRight;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      direction: isRtl ? 'rtl' : 'ltr',
      duration: 35,
    },
    [Autoplay({ delay: 6500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const togglePlay = useCallback(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins()?.autoplay;
    if (!autoplay) return;

    if (isPlaying) {
      autoplay.stop();
      setIsPlaying(false);
    } else {
      autoplay.play();
      setIsPlaying(true);
    }
  }, [emblaApi, isPlaying]);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white select-none">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Decorative ambient light */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Embla Viewport */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, idx) => {
            const Icon = slide.badgeIcon;
            return (
              <div
                key={slide.id}
                className={`embla__slide relative bg-gradient-to-br ${slide.bgGradient} py-16 md:py-24 lg:py-28`}
              >
                {/* Glow accent per slide */}
                <div className={`hero-glow top-1/3 end-10 w-96 h-96 ${slide.accentGlow}`} />

                <div className="shell relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    
                    {/* Column 1: Typography, Actions, Metrics (7 cols on large screens) */}
                    <div className="lg:col-span-7">
                      {/* Badge Pill */}
                      <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold backdrop-blur-md mb-6">
                        <span className="flex size-2 rounded-full bg-cyan-400 animate-pulse" />
                        <Icon className="size-4 text-cyan-300" />
                        <span className="text-cyan-200">
                          {isRtl ? slide.tag_ar : slide.tag_en}
                        </span>
                      </div>

                      {/* Headline */}
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2]">
                        {isRtl ? slide.title_ar : slide.title_en}{' '}
                        <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent block sm:inline">
                          {isRtl ? slide.highlight_ar : slide.highlight_en}
                        </span>
                      </h1>

                      {/* Description */}
                      <p className="mt-5 max-w-2xl text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal">
                        {isRtl ? slide.description_ar : slide.description_en}
                      </p>

                      {/* CTA Actions */}
                      <div className="mt-8 flex flex-wrap items-center gap-3.5">
                        {slide.ctaPrimaryHref.startsWith('http') ? (
                          <a
                            href={slide.ctaPrimaryHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-accent text-xs sm:text-sm md:text-base font-bold shadow-lg group"
                          >
                            <span>{isRtl ? slide.ctaPrimary_ar : slide.ctaPrimary_en}</span>
                            <span className={`inline-block transition-transform duration-200 ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                              {isRtl ? '↖' : '↗'}
                            </span>
                          </a>
                        ) : (
                          <a
                            href={slide.ctaPrimaryHref}
                            className="btn-accent text-xs sm:text-sm md:text-base font-bold shadow-lg group"
                          >
                            <span>{isRtl ? slide.ctaPrimary_ar : slide.ctaPrimary_en}</span>
                            <span className="inline-block transition-transform duration-200 group-hover:translate-y-0.5">
                              ↓
                            </span>
                          </a>
                        )}

                        {slide.ctaSecondaryHref.startsWith('http') ? (
                          <a
                            href={slide.ctaSecondaryHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline-white text-xs sm:text-sm md:text-base group"
                          >
                            <span>{isRtl ? slide.ctaSecondary_ar : slide.ctaSecondary_en}</span>
                            <span className={`inline-block transition-transform duration-200 ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                              {isRtl ? '↖' : '↗'}
                            </span>
                          </a>
                        ) : (
                          <Link
                            href={`/${locale}${slide.ctaSecondaryHref}`}
                            className="btn-outline-white text-xs sm:text-sm md:text-base group"
                          >
                            <span>{isRtl ? slide.ctaSecondary_ar : slide.ctaSecondary_en}</span>
                            <ArrowNext className="size-4 transition-transform group-hover:scale-110" />
                          </Link>
                        )}
                      </div>

                      {/* Metrics Bar */}
                      <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-xl">
                        {slide.metrics.map((m, mIdx) => (
                          <div key={mIdx}>
                            <div className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white tracking-tight">
                              {m.value}
                            </div>
                            <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">
                              {isRtl ? m.label_ar : m.label_en}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Prominent Visual Mockup Image (5 cols on large screens) */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative w-full max-w-md lg:max-w-none group">
                        {/* Outer Glow */}
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-500/30 to-amber-500/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

                        {/* Glassmorphic Mockup Container */}
                        <div className="relative rounded-2xl border border-white/20 bg-slate-900/90 shadow-2xl backdrop-blur-xl overflow-hidden">
                          {/* Mockup Titlebar */}
                          <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/60 px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="size-3 rounded-full bg-rose-500/80 inline-block" />
                              <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
                              <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
                            </div>
                            <span className="text-[11px] font-mono font-medium text-slate-400 truncate max-w-[200px]">
                              {isRtl ? slide.mockupBadge_ar : slide.mockupBadge_en}
                            </span>
                            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                          </div>

                          {/* App Image Graphic */}
                          <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                            <img
                              src={slide.previewImage}
                              alt={isRtl ? slide.title_ar : slide.title_en}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                          </div>

                          {/* Mockup Bottom Pill */}
                          <div className="p-3 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                              <CheckCircle2 className="size-3.5" />
                              {isRtl ? 'النظام متصل وجاهز للتشغيل' : 'Live System Online'}
                            </span>
                            {slide.ctaPrimaryHref.startsWith('http') ? (
                              <a
                                href={slide.ctaPrimaryHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-300 font-bold hover:underline inline-flex items-center gap-1 text-[11px]"
                              >
                                <span>{isRtl ? 'عرض مباشر' : 'Live Demo'}</span>
                                <span>↗</span>
                              </a>
                            ) : (
                              <a
                                href={slide.ctaPrimaryHref}
                                className="text-sky-300 font-bold hover:underline inline-flex items-center gap-1 text-[11px]"
                              >
                                <span>{isRtl ? 'استعراض' : 'Browse'}</span>
                                <span>↓</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls & Pagination Bar */}
      <div className="shell relative z-20 -mt-8 pb-6 flex items-center justify-between">
        {/* Slide Indicators / Dots */}
        <div className="flex items-center gap-2.5">
          {slides.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollTo(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`transition-all duration-300 rounded-full h-2.5 ${
                selectedIndex === dotIdx
                  ? 'w-8 bg-amber-400 shadow-md shadow-amber-400/40'
                  : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Arrow Controls & Autoplay Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="flex size-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white/80 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
          >
            {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>

          <button
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="flex size-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white/80 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
          >
            {isRtl ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </button>

          <button
            onClick={scrollNext}
            aria-label="Next slide"
            className="flex size-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white/80 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
          >
            {isRtl ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
          </button>
        </div>
      </div>

      {/* Gradient Bottom Edge */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-sky-500 to-cyan-400" />
    </section>
  );
}
