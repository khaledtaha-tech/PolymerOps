'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Play,
  Film,
  Hammer,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  VolumeX,
  AlertCircle,
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
} from 'lucide-react';
import {
  APPLICATIONS_DATA,
  type ApplicationItem,
  type PromoVideoItem,
} from '@/lib/apps-data';
import type { Locale } from '@/lib/i18n';

export interface PromoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  app: ApplicationItem | null;
  locale: Locale;
  allApps?: ApplicationItem[];
  onSelectApp?: (app: ApplicationItem) => void;
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

// ═══════════════════════════════════════════════════════════════════════════
// TODO: 5-SECOND PROMO VIDEOS SETUP FOR ALL 12 APPS
//
// 1. Drop your 5-second recorded MP4 videos directly into the `public/videos/` folder:
//    - filmcalc.mp4     (Blown Film Pro Suite)
//    - pipecalc.mp4     (PVC Pipe Calculations / PipeCalc)
//    - pipe1.mp4        (PVC Pipe Production & Analytics Suite)
//    - cp.mp4           (Compounding Process Control)
//    - machines.mp4     (Process Conditions & Trial Manager)
//    - pwp.mp4          (PWP Manpower Planner)
//    - equiledger.mp4   (EquiLedger Asset & Maintenance)
//    - ppc.mp4          (Project Control Center)
//    - master.mp4       (PolymerOps Master Vault)
//    - pass.mp4         (Smart Vault Manager)
//    - mintle.mp4       (Mintle Visit Planner)
//    - jobhunter.mp4    (Smart Job Hunter)
//
// 2. Until you provide the 5-sec video files, the slider automatically plays
//    the working test video below, so every single app slide is 100% testable right now!
// ═══════════════════════════════════════════════════════════════════════════
const SAMPLE_TEST_VIDEO_URL = 'https://www.w3schools.com/html/mov_bbb.mp4';

export function PromoVideoModal({
  isOpen,
  onClose,
  app,
  locale,
  allApps = APPLICATIONS_DATA,
  onSelectApp,
}: PromoVideoModalProps) {
  const isRtl = locale === 'ar';
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const carouselStripRef = useRef<HTMLDivElement | null>(null);

  // Local state to track currently active app in the slider
  const [currentAppId, setCurrentAppId] = useState<string>(app?.id || allApps[0]?.id);

  // Sync with prop when modal opens or initial app changes
  useEffect(() => {
    if (app?.id) {
      setCurrentAppId(app.id);
    }
  }, [app?.id, isOpen]);

  // Current active app
  const activeApp =
    allApps.find((a) => a.id === currentAppId) || app || allApps[0];

  const currentIndex = allApps.findIndex((a) => a.id === activeApp.id);
  const totalApps = allApps.length;

  // Navigation handlers
  const handleSelectApp = useCallback(
    (targetApp: ApplicationItem) => {
      setCurrentAppId(targetApp.id);
      if (onSelectApp) {
        onSelectApp(targetApp);
      }
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {
          // Handled silent autoplay restrictions if any
        });
      }
    },
    [onSelectApp]
  );

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % totalApps;
    handleSelectApp(allApps[nextIdx]);
  }, [currentIndex, totalApps, allApps, handleSelectApp]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + totalApps) % totalApps;
    handleSelectApp(allApps[prevIdx]);
  }, [currentIndex, totalApps, allApps, handleSelectApp]);

  // Keyboard navigation: Escape to close, Arrow keys to slide
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        if (isRtl) {
          handlePrev();
        } else {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (isRtl) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isRtl, handleNext, handlePrev]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Scroll active thumbnail into view in the bottom slider strip
  useEffect(() => {
    if (carouselStripRef.current) {
      const activeEl = carouselStripRef.current.querySelector(
        `[data-app-id="${activeApp.id}"]`
      ) as HTMLElement | null;
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeApp.id]);

  if (!isOpen || !activeApp) {
    return null;
  }

  const IconComponent = ICON_MAP[activeApp.iconName] || Layers;
  const title = isRtl ? activeApp.title_ar : activeApp.title_en;
  const description = isRtl ? activeApp.description_ar : activeApp.description_en;
  const category = isRtl ? activeApp.category_ar : activeApp.category_en;
  const features = isRtl ? activeApp.features_ar : activeApp.features_en;

  const domain = (() => {
    try {
      return new URL(activeApp.url).hostname;
    } catch {
      return activeApp.url;
    }
  })();

  const nextApp = allApps[(currentIndex + 1) % totalApps];
  const prevApp = allApps[(currentIndex - 1 + totalApps) % totalApps];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 1. Dark Overlay Backdrop (Clicking outside closes modal) */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      />

      {/* 2. Main Modal Dialog Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-700/80 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white shadow-2xl shadow-black/85 animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header with App Info & Slider Counter */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/95 px-4 py-3 sm:px-6 sm:py-3.5">
          <div className="flex items-center gap-3 min-w-0">
            {/* App Icon */}
            <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-slate-800 text-white shadow-md shadow-sky-600/20 border border-sky-500/30">
              <IconComponent className="size-5 text-sky-200" />
            </div>

            {/* Title & Metadata */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  id="promo-modal-title"
                  className="text-sm sm:text-base font-bold text-white truncate"
                >
                  {title}
                </h2>

                {/* Under Development Badge in Warning Amber */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-amber-300 border border-amber-400/50 shadow-sm">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-amber-400"></span>
                  </span>
                  <Hammer className="size-3 text-amber-300" />
                  <span>{isRtl ? 'تحت التطوير' : 'Under Development'}</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span className="font-mono text-sky-400 direction-ltr text-start">
                  {domain}
                </span>
                <span>•</span>
                <span className="text-slate-400">{category}</span>
              </div>
            </div>
          </div>

          {/* Right Header Controls: Slide Counter & Close Button */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Slider Counter Pill */}
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-slate-800/90 border border-slate-700 px-3 py-1 text-xs font-semibold text-sky-300">
              <Film className="size-3.5 text-sky-400" />
              <span>
                {isRtl
                  ? `تطبيق ${currentIndex + 1} من ${totalApps}`
                  : `App ${currentIndex + 1} of ${totalApps}`}
              </span>
            </div>

            {/* Close Button ("X") */}
            <button
              type="button"
              onClick={onClose}
              aria-label={isRtl ? 'إغلاق النافذة' : 'Close modal'}
              className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-slate-800/80 text-slate-400 transition-colors hover:bg-rose-500/20 hover:text-rose-300 hover:border hover:border-rose-500/40 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Video Slider Section */}
        <div className="p-3 sm:p-5 space-y-4">
          {/* ════════════════════════════════════════════════════════════════════ */}
          {/* VIDEO PLAYER WITH INTERACTIVE PREV / NEXT SLIDER ARROWS */}
          {/* ════════════════════════════════════════════════════════════════════ */}
          <div className="relative aspect-video w-full max-w-full overflow-hidden rounded-xl sm:rounded-2xl border border-slate-800 bg-black shadow-2xl shadow-black/80 group/player">
            {/* Video Player Element */}
            <video
              ref={videoRef}
              key={activeApp.id}
              controls
              muted
              playsInline
              autoPlay
              preload="metadata"
              poster={activeApp.image}
              className="h-full w-full object-contain bg-black rounded-xl sm:rounded-2xl"
            >
              {/* 
                ═══════════════════════════════════════════════════════════════
                // TODO: 5-SECOND RECORDED APP VIDEO SOURCE
                // 1. Primary: dedicated 5-sec video file from public/videos/<id>.mp4
                // ═══════════════════════════════════════════════════════════════
              */}
              <source
                // TODO: REPLACE OR DROP YOUR 5-SEC VIDEO FILE AT public/videos/${activeApp.id}.mp4
                src={`/videos/${activeApp.id}.mp4`}
                type="video/mp4"
              />

              {/* 
                ═══════════════════════════════════════════════════════════════
                // 2. Fallback: functional sample video for immediate testing
                // ═══════════════════════════════════════════════════════════════
              */}
              <source
                // Sample video for testing until your 5-sec file is added
                src={SAMPLE_TEST_VIDEO_URL}
                type="video/mp4"
              />
              <p className="p-4 text-center text-xs text-slate-400">
                {isRtl
                  ? 'متصفحك لا يدعم تشغيل هذا الفيديو مباشرة.'
                  : 'Your browser does not support the video tag.'}
              </p>
            </video>

            {/* Floating Slider Arrow: PREVIOUS APP (Left / Start) */}
            <button
              type="button"
              onClick={isRtl ? handleNext : handlePrev}
              aria-label={
                isRtl
                  ? `التالي: ${nextApp.title_ar}`
                  : `Previous: ${prevApp.title_en}`
              }
              title={
                isRtl
                  ? `الانتقال إلى: ${nextApp.title_ar}`
                  : `Go to: ${prevApp.title_en}`
              }
              className="absolute start-2 sm:start-4 top-1/2 -translate-y-1/2 z-20 flex size-10 sm:size-12 items-center justify-center rounded-full bg-slate-950/75 hover:bg-sky-600 text-white backdrop-blur-md border border-white/20 shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 group-hover/player:opacity-100 opacity-90 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <ChevronLeft className="size-6 text-white rtl:rotate-180" />
            </button>

            {/* Floating Slider Arrow: NEXT APP (Right / End) */}
            <button
              type="button"
              onClick={isRtl ? handlePrev : handleNext}
              aria-label={
                isRtl
                  ? `السابق: ${prevApp.title_ar}`
                  : `Next: ${nextApp.title_en}`
              }
              title={
                isRtl
                  ? `الانتقال إلى: ${prevApp.title_ar}`
                  : `Go to: ${nextApp.title_en}`
              }
              className="absolute end-2 sm:end-4 top-1/2 -translate-y-1/2 z-20 flex size-10 sm:size-12 items-center justify-center rounded-full bg-slate-950/75 hover:bg-sky-600 text-white backdrop-blur-md border border-white/20 shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 group-hover/player:opacity-100 opacity-90 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <ChevronRight className="size-6 text-white rtl:rotate-180" />
            </button>

            {/* Top Corner Overlay Badges */}
            <div className="absolute top-3 start-3 pointer-events-none z-10 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-sky-300 border border-sky-500/30 shadow-md">
                <Film className="size-3 text-sky-400" />
                <span>
                  {isRtl
                    ? `تطبيق ${currentIndex + 1} / ${totalApps}`
                    : `App ${currentIndex + 1} / ${totalApps}`}
                </span>
              </span>
            </div>

            <div className="absolute top-3 end-3 pointer-events-none z-10 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-950/80 backdrop-blur-md px-2 py-1 text-[10px] font-semibold text-amber-300 border border-amber-500/30 shadow-sm">
                <VolumeX className="size-3 text-amber-400" />
                <span>{isRtl ? 'فيديو تجريبي 5 ثوانٍ' : '5-Sec Demo Video'}</span>
              </span>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════════ */}
          {/* HORIZONTAL CAROUSEL STRIP: SLIDE OR CLICK ANY OF THE 12 APPS */}
          {/* ════════════════════════════════════════════════════════════════════ */}
          <div className="rounded-xl border border-slate-800/90 bg-slate-950/60 p-3">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Film className="size-3.5 text-sky-400" />
                <span>
                  {isRtl
                    ? 'اسحب أو اختر التطبيق لمشاهدة الفيديو (12 تطبيقاً صناعياً):'
                    : 'Slide or select application to preview (12 apps):'}
                </span>
              </span>

              {/* Quick Prev / Next Buttons for the Carousel Strip */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex size-6 items-center justify-center rounded-md bg-slate-800 text-slate-300 hover:bg-sky-600 hover:text-white transition-colors"
                  aria-label="Previous app"
                >
                  <ChevronLeft className="size-3.5 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex size-6 items-center justify-center rounded-md bg-slate-800 text-slate-300 hover:bg-sky-600 hover:text-white transition-colors"
                  aria-label="Next app"
                >
                  <ChevronRight className="size-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>

            {/* Scrollable Track with All 12 Applications */}
            <div
              ref={carouselStripRef}
              className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700"
            >
              {allApps.map((item, idx) => {
                const isSelected = item.id === activeApp.id;
                const ItemIcon = ICON_MAP[item.iconName] || Layers;
                const itemTitle = isRtl ? item.title_ar : item.title_en;

                return (
                  <button
                    key={item.id}
                    data-app-id={item.id}
                    type="button"
                    onClick={() => handleSelectApp(item)}
                    className={`flex items-center gap-2 shrink-0 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                      isSelected
                        ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-lg shadow-sky-600/30 border border-sky-400 ring-2 ring-sky-400/40 scale-[1.02]'
                        : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800 text-sky-400'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <ItemIcon className="size-3.5 shrink-0" />
                    <span className="truncate max-w-[150px]">{itemTitle}</span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-mono ${
                        isSelected
                          ? 'bg-black/30 text-sky-200'
                          : 'bg-black/40 text-slate-400'
                      }`}
                    >
                      5s
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Application Info & Highlights */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-3.5 sm:p-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-sky-200">
                {title}
              </h3>
              <span className="text-[11px] font-medium text-amber-400/90 flex items-center gap-1">
                <AlertCircle className="size-3" />
                <span>
                  {isRtl
                    ? 'الفيديو جاهز لاستقبال تسجيلات الـ 5 ثوانٍ لكل تطبيق'
                    : 'Ready to receive your 5-sec video recording for each app'}
                </span>
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {description}
            </p>

            {/* 3 Key Bullet Features */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {features.slice(0, 3).map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 text-xs text-slate-300"
                >
                  <CheckCircle2 className="size-3.5 shrink-0 text-sky-400" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Footer with Next / Prev buttons and Direct App Launch */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800 bg-slate-950 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            {/* Prev App Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-bold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <ChevronLeft className="size-4 rtl:rotate-180" />
              <span>{isRtl ? 'التطبيق السابق' : 'Previous App'}</span>
            </button>

            {/* Next App Button */}
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-bold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <span>{isRtl ? 'التطبيق التالي' : 'Next App'}</span>
              <ChevronRight className="size-4 rtl:rotate-180" />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-bold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              {isRtl ? 'إغلاق' : 'Close'}
            </button>

            {/* Primary Launch App CTA for the current active app */}
            <a
              href={activeApp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-600 via-sky-700 to-sky-800 px-5 py-2 text-xs font-bold text-white shadow-md shadow-sky-600/30 transition-all hover:from-sky-500 hover:to-sky-700 hover:shadow-sky-500/20 active:scale-[0.98]"
            >
              <span>
                {isRtl
                  ? `تشغيل ${activeApp.name}`
                  : `Launch ${activeApp.name}`}
              </span>
              <ExternalLink className="size-3.5 ms-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
