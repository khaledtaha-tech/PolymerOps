'use client';

import React from 'react';
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
} from 'lucide-react';
import type { ApplicationItem } from '@/lib/apps-data';
import type { Locale } from '@/lib/i18n';

interface ServiceCardProps {
  app: ApplicationItem;
  locale: Locale;
}

// Icon mapper
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

export function ServiceCard({ app, locale }: ServiceCardProps) {
  const isRtl = locale === 'ar';
  const IconComponent = ICON_MAP[app.iconName] || Layers;

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

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10">
      {/* Top Visual App Image Banner */}
      <div>
        <div className="relative h-44 w-full overflow-hidden bg-slate-950 border-b border-slate-100">
          <img
            src={app.image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Floating Badges on Image */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-emerald-400 border border-emerald-500/30 shadow-sm">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isRtl ? 'تشغيل فوري' : 'Live System'}</span>
            </span>

            {app.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-slate-950 shadow-sm">
                <Sparkles className="size-3" />
                <span>{isRtl ? 'رئيسي' : 'Featured'}</span>
              </span>
            )}
          </div>

          {/* App Domain Pill at Bottom of Image */}
          <div className="absolute bottom-2.5 start-3 end-3 flex items-center justify-between text-white/90">
            <span className="font-mono text-xs text-sky-200 direction-ltr text-start font-medium drop-shadow-sm">
              {domain}
            </span>
            <span className="rounded bg-black/40 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-slate-300">
              {category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Icon & Title Row */}
          <div className="flex items-start gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 via-sky-700 to-slate-900 text-white shadow-md shadow-sky-700/20 transition-transform duration-300 group-hover:scale-105">
              <IconComponent className="size-5 text-sky-200" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wide">
                {badge}
              </span>
              <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-sky-700 transition-colors">
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

      {/* Card Action Footer */}
      <div className="border-t border-slate-100 bg-slate-50/60 p-4">
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-700 to-sky-900 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all duration-200 hover:from-sky-800 hover:to-slate-900 hover:shadow-md group/btn"
        >
          <span>{isRtl ? 'افتح التطبيق' : 'Launch Application'}</span>
          <span className={`transition-transform duration-200 ${isRtl ? 'group-hover/btn:-translate-x-1 group-hover/btn:-translate-y-0.5' : 'group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5'}`}>
            {isRtl ? '↖' : '↗'}
          </span>
        </a>
      </div>
    </div>
  );
}
