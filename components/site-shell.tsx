'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Globe,
  Layers,
  ArrowUpRight,
  Menu,
  X,
  ShieldCheck,
  Cpu,
  Activity,
  Send,
  ExternalLink,
} from 'lucide-react';
import { copy, type Locale } from '@/lib/i18n';

const navLinks = [
  ['services', 'services'],
  ['software', 'software'],
  ['consulting', 'consulting'],
  ['materials', 'materials'],
  ['talent', 'talent'],
  ['insights', 'insights'],
] as const;

export function Header({ locale, brand }: { locale: Locale; brand: string }) {
  const t = copy[locale];
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRtl = locale === 'ar';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="shell flex min-h-20 items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-700 via-sky-600 to-amber-500 text-white shadow-md shadow-sky-600/20 font-black text-xl">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-900 leading-tight">
              {brand}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
              {isRtl ? 'المنظومة الصناعية الموحدة' : 'Industrial Ops Platform'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 xl:gap-2 text-sm font-semibold text-slate-600 lg:flex">
          {navLinks.map(([key, path]) => {
            const href = `/${locale}/${path}`;
            const isActive = pathname === href || pathname?.startsWith(`${href}/`);
            return (
              <Link
                key={key}
                href={href}
                className={`rounded-lg px-3 py-2 transition-all duration-150 ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-bold'
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {t[key]}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Lang Switcher & CTA */}
        <div className="flex items-center gap-3">
          {/* Master Vault Live Indicator */}
          <a
            href="https://master.polymerops.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="PolymerOps Master Vault"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 transition"
          >
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Master Vault</span>
            <ArrowUpRight className="size-3 text-slate-400" />
          </a>

          {/* Language Switch */}
          <Link
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
            href={`/${locale === 'ar' ? 'en' : 'ar'}`}
            title={locale === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            <Globe className="size-3.5 text-slate-500" />
            <span>{locale === 'ar' ? 'English' : 'عربي'}</span>
          </Link>

          {/* Primary Request CTA */}
          <Link
            className="btn-primary text-xs sm:text-sm font-bold shadow-sm"
            href={`/${locale}/request`}
          >
            <span>{t.request}</span>
            <span>{isRtl ? '↖' : '↗'}</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map(([key, path]) => {
              const href = `/${locale}/${path}`;
              const isActive = pathname === href || pathname?.startsWith(`${href}/`);
              return (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {t[key]}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-100 mt-2 flex flex-col gap-2">
              <a
                href="https://master.polymerops.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700"
              >
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  PolymerOps Master Vault
                </span>
                <ArrowUpRight className="size-3.5 text-slate-400" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer({ locale, brand }: { locale: Locale; brand: string }) {
  const t = copy[locale];
  const isRtl = locale === 'ar';

  return (
    <footer className="border-t border-slate-800 bg-[#071320] text-slate-300">
      {/* Top Banner / Callout */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 py-12">
        <div className="shell flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {isRtl
                ? 'جاهز لتطوير خطوط إنتاج مصنعك وخفض الهالك؟'
                : 'Ready to optimize your production lines & cut scrap?'}
            </h3>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              {isRtl
                ? 'تواصل مع فريقنا الهندسي لمراجعة البيانات التشغيلية واقتراح أفضل الحلول العملية.'
                : 'Connect with our engineering team to review process parameters and implement tailored plant solutions.'}
            </p>
          </div>
          <Link
            href={`/${locale}/request`}
            className="btn-accent shrink-0 text-sm font-bold shadow-lg"
          >
            <span>{t.request}</span>
            <span>{isRtl ? '↖' : '↗'}</span>
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="shell py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-tr from-sky-600 to-amber-500 text-white font-black">
              P
            </div>
            <span className="text-xl font-black text-white">{brand}</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-400">
            {t.footer}
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 px-3 py-1 text-[11px] font-bold text-emerald-300">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              12 Live Systems Online
            </span>
          </div>
        </div>

        {/* Applications Directory */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
            {isRtl ? 'التطبيقات والأنظمة' : 'Applications'}
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <a
                href="https://filmcalc.polymerops.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition flex items-center gap-1"
              >
                <span>Blown Film Pro</span>
                <span className="text-slate-500 text-xs">↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://pipecalc.polymerops.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition flex items-center gap-1"
              >
                <span>PVC Pipe Calculations</span>
                <span className="text-slate-500 text-xs">↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://pipe1.polymerops.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition flex items-center gap-1"
              >
                <span>Pipe Production Analytics</span>
                <span className="text-slate-500 text-xs">↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://cp.polymerops.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition flex items-center gap-1"
              >
                <span>Compounding Control</span>
                <span className="text-slate-500 text-xs">↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://master.polymerops.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition flex items-center gap-1 text-cyan-300 font-semibold"
              >
                <span>PolymerOps Master Vault</span>
                <span className="text-cyan-400 text-xs">↗</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Site Sections */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
            {isRtl ? 'أقسام المنصة' : 'Navigation'}
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            {navLinks.map(([key, path]) => (
              <li key={key}>
                <Link
                  href={`/${locale}/${path}`}
                  className="hover:text-white transition"
                >
                  {t[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Direct Engagement & Support */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
            {isRtl ? 'التواصل والخصوصية' : 'Engagement'}
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link href={`/${locale}/request`} className="hover:text-white transition">
                {t.request}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/contact`} className="hover:text-white transition">
                {t.contact}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/privacy`} className="hover:text-white transition">
                {t.privacy}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/terms`} className="hover:text-white transition">
                {t.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="shell border-t border-slate-800/80 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} {brand}.{' '}
          {isRtl ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://master.polymerops.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-200 transition"
          >
            PolymerOps DevOps Hub
          </a>
          <span>•</span>
          <Link href={`/${locale}/privacy`} className="text-slate-400 hover:text-slate-200">
            {t.privacy}
          </Link>
          <span>•</span>
          <Link href={`/${locale}/terms`} className="text-slate-400 hover:text-slate-200">
            {t.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50 to-white py-16 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="shell relative z-10">
        <p className="eyebrow mb-3.5">{eyebrow}</p>
        <h1 className="section-title max-w-3xl text-slate-900">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
