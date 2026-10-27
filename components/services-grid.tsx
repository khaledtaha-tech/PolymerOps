'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { APPLICATIONS_DATA, CATEGORIES, type ApplicationItem } from '@/lib/apps-data';
import { ServiceCard } from '@/components/service-card';
import type { Locale } from '@/lib/i18n';

interface ServicesGridProps {
  locale: Locale;
  initialCategory?: string;
}

export function ServicesGrid({ locale, initialCategory = 'all' }: ServicesGridProps) {
  const isRtl = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredApps = useMemo(() => {
    return APPLICATIONS_DATA.filter((app) => {
      // Category check
      const matchesCategory =
        selectedCategory === 'all' ||
        app.category_en.toLowerCase() === selectedCategory.toLowerCase() ||
        app.category_ar.toLowerCase() === selectedCategory.toLowerCase();

      if (!matchesCategory) return false;

      // Search query check
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      return (
        app.name.toLowerCase().includes(q) ||
        app.title_en.toLowerCase().includes(q) ||
        app.title_ar.toLowerCase().includes(q) ||
        app.description_en.toLowerCase().includes(q) ||
        app.description_ar.toLowerCase().includes(q) ||
        app.category_en.toLowerCase().includes(q) ||
        app.category_ar.toLowerCase().includes(q) ||
        app.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div id="applications-section" className="space-y-8">
      {/* Controls Bar: Search & Category Pills */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const label = isRtl ? cat.label_ar : cat.label_en;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-700 to-sky-900 text-white shadow-md shadow-sky-800/25 ring-2 ring-sky-600/30'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full sm:w-72 lg:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isRtl ? 'ابحث في التطبيقات والأنظمة...' : 'Search apps & systems...'}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pe-4 ps-10 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 shadow-sm"
          />
          <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200/80 pb-3">
        <span>
          {isRtl
            ? `عرض ${filteredApps.length} من أصل ${APPLICATIONS_DATA.length} تطبيقاً صناعياً نشطاً`
            : `Showing ${filteredApps.length} of ${APPLICATIONS_DATA.length} active industrial applications`}
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="font-bold text-sky-600 hover:underline"
          >
            {isRtl ? 'إعادة ضبط البحث' : 'Clear search'}
          </button>
        )}
      </div>

      {/* Grid of Applications Cards */}
      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredApps.map((app) => (
            <ServiceCard key={app.id} app={app} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-base font-semibold text-slate-700">
            {isRtl ? 'لم يتم العثور على تطبيقات مطابقة' : 'No matching applications found'}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {isRtl
              ? 'جرّب تغيير كلمات البحث أو اختيار تصنيف آخر'
              : 'Try adjusting your search terms or choose another category'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 rounded-lg bg-sky-700 px-4 py-2 text-xs font-bold text-white hover:bg-sky-800"
          >
            {isRtl ? 'إظهار جميع التطبيقات' : 'Show All Applications'}
          </button>
        </div>
      )}
    </div>
  );
}
