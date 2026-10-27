import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  BarChart3,
  Factory,
  Layers,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { copy, isLocale, localize } from '@/lib/i18n';
import { getContent } from '@/lib/db';
import { HeroSlider } from '@/components/hero-slider';
import { ServicesGrid } from '@/components/services-grid';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const isRtl = locale === 'ar';
  const t = copy[locale];
  const [software, insights] = await Promise.all([
    getContent('software'),
    getContent('insight'),
  ]);

  const ArrowNext = isRtl ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* 1. Modern Dynamic Hero Slider Section */}
      <HeroSlider locale={locale} />

      {/* 2. Applications & Services Section (Direct from master.polymerops.com) */}
      <section className="shell py-20 md:py-28" id="applications-section">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-slate-200/80 pb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200/70 mb-3.5">
              <Sparkles className="size-3.5 text-amber-600" />
              <span>01 / {isRtl ? 'البرامج والتطبيقات الصناعية' : 'Applications & Tools'}</span>
            </div>
            <h2 className="section-title text-slate-900">
              {isRtl
                ? 'منظومة التطبيقات والحلول الرقمية'
                : 'Specialized Industrial Application Suite'}
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
              {isRtl
                ? 'حلول برمجية وحاسبات هندسية مباشرة تم تطويرها لخدمة مصانع البلاستيك: من حسابات خطوط البثق والخلطات إلى إدارة الورديات والأصول الصناعية.'
                : 'Production-ready engineering calculators, cloud analytics, and management tools built specifically for plastics processing and extrusion plants.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://master.polymerops.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-slate-800 transition"
            >
              <ShieldCheck className="size-4 text-emerald-400" />
              <span>{isRtl ? 'المستودع الرئيسي (Master Vault)' : 'PolymerOps Master Vault'}</span>
              <span>{isRtl ? '↖' : '↗'}</span>
            </a>
          </div>
        </div>

        {/* Responsive Grid with Filter & Search */}
        <ServicesGrid locale={locale} />
      </section>

      {/* 3. Core Practical Engineering Consulting Services */}
      <section className="bg-gradient-to-b from-slate-100/90 to-slate-50 py-20 md:py-28 border-y border-slate-200/80">
        <div className="shell">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 border border-sky-200 mb-3">
                <Factory className="size-3.5 text-sky-600" />
                <span>02 / {t.services}</span>
              </div>
              <h2 className="section-title text-slate-900">{t.capabilities}</h2>
              <p className="mt-3.5 text-base sm:text-lg text-slate-600 max-w-2xl">
                {t.capabilitiesIntro}
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-700 hover:text-sky-900 transition"
              href={`/${locale}/services`}
            >
              <span>{t.viewAll}</span>
              <span>{isRtl ? '↖' : '↗'}</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.serviceTypes.map((title, i) => (
              <Link
                href={`/${locale}/services`}
                key={title}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-sky-50 font-mono text-sm font-black text-sky-700 border border-sky-200/60">
                      0{i + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {isRtl ? 'استشارات تخصصية' : 'Engineering Scope'}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {t.serviceDescriptions[i]}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-sky-700">
                  <span>{isRtl ? 'عرض نطاق الخدمة' : 'View Scope Details'}</span>
                  <span className={`transition-transform duration-200 ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                    {isRtl ? '←' : '→'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PolymerOps Master Vault Infrastructure Callout */}
      <section className="bg-slate-950 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
        <div className="shell relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400 backdrop-blur-md mb-4">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isRtl ? 'البنية التقنية الموحدة' : 'Unified DevOps Hub'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              {isRtl
                ? 'إدارة متكاملة لمستودعات الأكواد وبيانات الاعتماد'
                : 'Centralized Repository Reconnaissance & Secret Vault'}
            </h3>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
              {isRtl
                ? 'منصة PolymerOps Master Vault توفر مراقبة لحظية لمستودعات ومصادر الأنظمة الصناعية، مع تشفير AES-256-GCM لإدارة مفاتيح التشغيل وقواعد بيانات المصانع.'
                : 'PolymerOps Master Vault coordinates GitHub repository reconnaissance, automated status telemetry, and AES-256-GCM encrypted secrets across plant systems.'}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-400" />
                {isRtl ? 'تشفير AES-256-GCM' : 'AES-256-GCM Security'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-400" />
                {isRtl ? '12 نطاقاً وتطبيقاً نشطاً' : '12 Active Production Nodes'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-400" />
                {isRtl ? 'مزامنة مستمرة للأكواد' : 'Continuous GitHub Recon'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://master.polymerops.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent text-sm font-bold shadow-lg"
            >
              <span>{isRtl ? 'دخول Master Vault' : 'Open Master Vault'}</span>
              <span>{isRtl ? '↖' : '↗'}</span>
            </a>
            <a
              href="https://pass.polymerops.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white text-sm"
            >
              <span>{isRtl ? 'مدير كلمات السر' : 'Smart Vault'}</span>
              <span>{isRtl ? '↖' : '↗'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. Process & Methodology ("How We Work") */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200 mb-3">
              <span>03 / {t.process}</span>
            </div>
            <h2 className="section-title text-slate-900">{t.process}</h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {isRtl
                ? 'منهجية عمل هندسية مدروسة تبدأ بتحليل البيانات التشغيلية الفعلية لمصنعك وتنتهي بحلول عملية قابلة للتطبيق والقياس.'
                : 'A disciplined engineering methodology that turns your operational manufacturing challenges into measurable, reproducible outcomes.'}
            </p>
            <div className="mt-8">
              <Link className="btn-primary text-sm font-bold shadow-sm" href={`/${locale}/request`}>
                <span>{t.request}</span>
                <span>{isRtl ? '↖' : '↗'}</span>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.steps.map((step, i) => (
              <div
                key={step}
                className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-sky-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-xs font-black text-white shadow-xs">
                    0{i + 1}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {isRtl ? `المرحلة 0${i + 1}` : `Phase 0${i + 1}`}
                  </span>
                </div>
                <p className="mt-5 text-base font-bold text-slate-800 leading-snug">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Technical Insights / Knowledge Center */}
      <section className="border-t border-slate-200 bg-slate-900 py-20 text-white">
        <div className="shell flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-xs font-bold text-amber-300 mb-3">
              <span>{t.insights}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              {t.latest}
            </h2>
            <p className="mt-3.5 text-base text-slate-300 leading-relaxed">
              {insights.length ? localize(insights[0], locale).title : t.empty}
            </p>
          </div>
          <Link
            className="btn-accent shrink-0 text-sm font-bold shadow-md"
            href={`/${locale}/insights`}
          >
            <span>{t.viewAll}</span>
            <span>{isRtl ? '↖' : '↗'}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
