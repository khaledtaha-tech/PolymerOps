'use client';

import React, { useState } from 'react';
import {
  Layers,
  Calculator,
  Activity,
  FlaskConical,
  SlidersHorizontal,
  Users,
  Wrench,
  Target,
  Server,
  Lock,
  ClipboardCheck,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Play,
  Hammer,
} from 'lucide-react';
import type { ApplicationItem } from '@/lib/apps-data';
import type { Locale } from '@/lib/i18n';
import { PromoVideoModal } from '@/components/promo-video-modal';

export interface ServiceCardProps {
  app: ApplicationItem;
  locale: Locale;
  onWatchPromo?: (app: ApplicationItem) => void;
}

// Icon mapper matching applications catalog
const ICON_MAP: Record<string, React.ElementType> = {
  Layers,
  Calculator,
  Activity,
  FlaskConical,
  SlidersHorizontal,
  Users,
  Wrench,
  Target,
  Server,
  Lock,
  ClipboardCheck,
  Briefcase,
};

export function ServiceCard({ app, locale, onWatchPromo }: ServiceCardProps) {
  const isRtl = locale === 'ar';
  const IconComponent = ICON_MAP[app.iconName] || Layers;
  const [imgSrc, setImgSrc] = useState(app.image);
  const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);

  const title = isRtl ? app.title_ar : app.title_en;
  const description = isRtl ? app.description_ar : app.description_en;
  const badge = isRtl ? app.badge_ar : app.badge_en;
  const category = isRtl ? app.category_ar : app.category_en;
  const features = isRtl ? app.features_ar : app.features_en;

  const domain = (() => {
    try {
      return new URL(app.url).hostname;
    } catch {
      return app.url;
    }
  })();

  const handleWatchPromoClick = () => {
    if (onWatchPromo) {
      onWatchPromo(app);
    } else {
      setIsLocalModalOpen(true);
    }
  };

  return (
    <>
      <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10">
        {/* Top Visual App Image Banner */}
        <div>
          <div className="relative h-44 w-full overflow-hidden bg-slate-950 border-b border-slate-100">
            <img
              src={imgSrc}
              alt={title}
              onError={() => {
                // Fallback to SVG if PNG fails or vice versa
                if (imgSrc.endsWith('.png')) {
                  setImgSrc(imgSrc.replace('.png', '.svg'));
                } else {
                  setImgSrc('/industry.svg');
                }
              }}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

            {/* Floating Badges on Image */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
              {/* 1. "Under Development" Badge in stylish amber warning colors */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-3 py-1 text-[11px] font-black text-slate-950 shadow-md shadow-amber-950/40 border border-amber-300 backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-200 opacity-90"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-amber-950"></span>
                </span>
                <Hammer className="size-3 text-slate-950" />
                <span>{isRtl ? 'تحت التطوير' : 'Under Development'}</span>
              </span>

              {/* Featured Badge */}
              {app.isFeatured ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-sky-300 border border-sky-500/30 shadow-sm">
                  <Sparkles className="size-3 text-sky-400" />
                  <span>{isRtl ? 'رئيسي' : 'Featured'}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-700/50 shadow-sm">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  <span>{isRtl ? 'نشط' : 'Online'}</span>
                </span>
              )}
            </div>

            {/* App Domain Pill at Bottom of Image */}
            <div className="absolute bottom-2.5 start-3 end-3 flex items-center justify-between text-white/90 z-10">
              <span className="font-mono text-xs text-sky-200 direction-ltr text-start font-medium drop-shadow-sm">
                {domain}
              </span>
              <span className="rounded bg-black/50 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-slate-200 border border-white/10">
                {category}
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 sm:p-6">
            {/* Icon & Title Row */}
            <div className="flex items-start gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 via-sky-700 to-slate-900 text-white shadow-md shadow-sky-700/20 transition-transform duration-300 group-hover:scale-105">
                <IconComponent className="size-5 text-sky-200" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wide block truncate">
                  {badge}
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-sky-700 transition-colors line-clamp-1">
                  {title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
              {description}
            </p>

            {/* Key Organized Features */}
            <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3.5">
              {features.slice(0, 3).map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="size-3.5 shrink-0 text-sky-600" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card Action Footer with Dual Buttons: Watch Promo & Launch App */}
        <div className="border-t border-slate-100 bg-slate-50/70 p-3 sm:p-4">
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {/* 2. "Watch Promo" Button */}
            <button
              type="button"
              onClick={handleWatchPromoClick}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-200 bg-white px-2.5 py-2.5 text-xs font-bold text-sky-800 shadow-sm transition-all duration-200 hover:border-sky-400 hover:bg-sky-50/80 hover:text-sky-950 hover:shadow active:scale-[0.98] group/promo"
              aria-label={
                isRtl
                  ? `مشاهدة الفيديو التعريفي لتطبيق ${title}`
                  : `Watch promo video for ${title}`
              }
            >
              <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 transition-colors group-hover/promo:bg-sky-700 group-hover/promo:text-white">
                <Play className="size-2.5 fill-current ms-0.5" />
              </div>
              <span className="truncate">
                {isRtl ? 'مشاهدة البرومو' : 'Watch Promo'}
              </span>
            </button>

            {/* Primary Launch Application Button */}
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-700 via-sky-800 to-sky-950 px-2.5 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:from-sky-800 hover:to-slate-950 hover:shadow-md active:scale-[0.98] group/btn"
              aria-label={
                isRtl ? `افتح تطبيق ${title}` : `Launch ${title}`
              }
            >
              <span className="truncate">
                {isRtl ? 'افتح التطبيق' : 'Launch App'}
              </span>
              <span
                className={`text-[11px] transition-transform duration-200 ${
                  isRtl
                    ? 'group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5'
                    : 'group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5'
                }`}
              >
                {isRtl ? '↖' : '↗'}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Standalone Fallback Modal (only rendered if no parent onWatchPromo was passed) */}
      {!onWatchPromo && (
        <PromoVideoModal
          isOpen={isLocalModalOpen}
          onClose={() => setIsLocalModalOpen(false)}
          app={app}
          locale={locale}
        />
      )}
    </>
  );
}
