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
  ExternalLink,
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
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 dark:border-slate-800">
      {/* Top Banner & Header */}
      <div>
        <div className="flex items-start justify-between gap-4">
          {/* App Icon */}
          <div className="flex size-13 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 via-sky-700 to-slate-900 text-white shadow-md shadow-sky-700/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1">
            <IconComponent className="size-6 text-sky-200" />
          </div>

          {/* Status & Category */}
          <div className="flex flex-col items-end gap-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isRtl ? 'تشغيل فوري' : 'Live System'}</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 tracking-wide">
              {category}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mt-5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
              {badge}
            </span>
            {app.isFeatured && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                <Sparkles className="size-3" />
                {isRtl ? 'رئيسي' : 'Featured'}
              </span>
            )}
          </div>
          <h3 className="mt-2.5 text-lg font-bold text-slate-900 leading-snug group-hover:text-sky-700 transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-xs font-mono text-slate-400 direction-ltr text-start">
            {domain}
          </p>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
          {description}
        </p>

        {/* Organized Feature Points */}
        <div className="mt-5 space-y-1.5 border-t border-slate-100 pt-4">
          {features.slice(0, 3).map((feat, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 className="size-3.5 shrink-0 text-sky-600" />
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-6 border-t border-slate-100 pt-4">
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-700 to-sky-900 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all duration-200 hover:from-sky-800 hover:to-slate-900 hover:shadow-md group/btn"
        >
          <span>{isRtl ? 'افتح التطبيق' : 'Launch Application'}</span>
          <span className={`transition-transform duration-200 ${isRtl ? 'group-hover/btn:-translate-x-1 group-hover/btn:-translate-y-0.5' : 'group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5'}`}>
            ↗
          </span>
        </a>
      </div>
    </div>
  );
}
