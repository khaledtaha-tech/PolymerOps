'use client';

import React, { useState, useMemo, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Search,
  LayoutGrid,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { APPLICATIONS_DATA, CATEGORIES, type ApplicationItem } from '@/lib/apps-data';
import { ServiceCard } from '@/components/service-card';
import { PromoVideoModal } from '@/components/promo-video-modal';
import type { Locale } from '@/lib/i18n';

interface ServicesGridProps {
  locale: Locale;
  initialCategory?: string;
}

export function ServicesGrid({ locale, initialCategory = 'all' }: ServicesGridProps) {
  const isRtl = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPromoApp, setSelectedPromoApp] = useState<ApplicationItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'slider'>('slider');

  // Horizontal Embla Slider for cards on the page
  const [cardsEmblaRef, cardsEmblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    direction: isRtl ? 'rtl' : 'ltr',
  });

  const scrollCardsPrev = useCallback(() => {
    if (cardsEmblaApi) cardsEmblaApi.scrollPrev();
  }, [cardsEmblaApi]);

  const scrollCardsNext = useCallback(() => {
    if (cardsEmblaApi) cardsEmblaApi.scrollNext();
  }, [cardsEmblaApi]);

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

        {/* Search Input Box & View Mode Toggle */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64 lg:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRtl ? 'ابحث في التطبيقات والأنظمة...' : 'Search apps & systems...'}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pe-4 ps-10 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 shadow-sm"
            />
            <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          </div>

          {/* View Mode Toggle (Horizontal Slider vs Grid) */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('slider')}
              aria-label={isRtl ? 'سلايدر أفقي' : 'Horizontal Slider'}
              title={isRtl ? 'عرض سلايدر أفقي للشاشات' : 'Horizontal screens slider'}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors ${
                viewMode === 'slider'
                  ? 'bg-sky-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <SlidersHorizontal className="size-3.5" />
              <span className="hidden sm:inline">{isRtl ? 'سلايدر' : 'Slider'}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              aria-label={isRtl ? 'عرض شبكي' : 'Grid View'}
              title={isRtl ? 'عرض شبكي للشاشات' : 'Grid view'}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors ${
                viewMode === 'grid'
                  ? 'bg-sky-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutGrid className="size-3.5" />
              <span className="hidden sm:inline">{isRtl ? 'شبكة' : 'Grid'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Header Count & Slider Controls */}
      <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2">
          <span>
            {isRtl
              ? `عرض ${filteredApps.length} من أصل ${APPLICATIONS_DATA.length} تطبيقاً صناعياً نشطاً`
              : `Showing ${filteredApps.length} of ${APPLICATIONS_DATA.length} active industrial applications`}
          </span>
          {viewMode === 'slider' && (
            <span className="hidden sm:inline-block rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700">
              {isRtl ? 'نمط السلايدر الأفقي' : 'Horizontal Slider Mode'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="font-bold text-sky-600 hover:underline me-2"
            >
              {isRtl ? 'إعادة ضبط البحث' : 'Clear search'}
            </button>
          )}

          {/* Quick Slider Arrow Controls when in Slider View */}
          {viewMode === 'slider' && filteredApps.length > 0 && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={scrollCardsPrev}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-800 transition-colors shadow-sm"
                aria-label="Previous card"
              >
                <ChevronLeft className="size-4 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={scrollCardsNext}
                className="flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-800 transition-colors shadow-sm"
                aria-label="Next card"
              >
                <ChevronRight className="size-4 rtl:rotate-180" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Applications Cards Display: Either Horizontal Slider or Grid */}
      {filteredApps.length > 0 ? (
        viewMode === 'slider' ? (
          /* HORIZONTAL SLIDER VIEW */
          <div className="relative group/cardslider">
            <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={cardsEmblaRef}>
              <div className="flex gap-6 pb-4 pt-1">
                {filteredApps.map((app) => (
                  <div
                    key={app.id}
                    className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                  >
                    <ServiceCard
                      app={app}
                      locale={locale}
                      onWatchPromo={(selected) => setSelectedPromoApp(selected)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Navigation Arrows on Desktop */}
            <button
              type="button"
              onClick={scrollCardsPrev}
              className="hidden lg:flex absolute start-0 top-1/2 -translate-y-1/2 -translate-x-4 rtl:translate-x-4 z-20 size-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-xl border border-slate-200 hover:bg-sky-50 hover:text-sky-700 hover:scale-105 transition-all opacity-0 group-hover/cardslider:opacity-100"
              aria-label="Previous"
            >
              <ChevronLeft className="size-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={scrollCardsNext}
              className="hidden lg:flex absolute end-0 top-1/2 -translate-y-1/2 translate-x-4 rtl:-translate-x-4 z-20 size-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-xl border border-slate-200 hover:bg-sky-50 hover:text-sky-700 hover:scale-105 transition-all opacity-0 group-hover/cardslider:opacity-100"
              aria-label="Next"
            >
              <ChevronRight className="size-5 rtl:rotate-180" />
            </button>
          </div>
        ) : (
          /* GRID VIEW */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredApps.map((app) => (
              <ServiceCard
                key={app.id}
                app={app}
                locale={locale}
                onWatchPromo={(selected) => setSelectedPromoApp(selected)}
              />
            ))}
          </div>
        )
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

      {/* Reusable Video Promo Modal with full 12-App Horizontal Slider support */}
      <PromoVideoModal
        isOpen={!!selectedPromoApp}
        onClose={() => setSelectedPromoApp(null)}
        app={selectedPromoApp}
        locale={locale}
        allApps={APPLICATIONS_DATA}
      />
    </div>
  );
}
