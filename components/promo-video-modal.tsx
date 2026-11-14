'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Film,
  Hammer,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  MonitorPlay,
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
  AlertCircle,
} from 'lucide-react';
import type { ApplicationItem, PromoVideoItem } from '@/lib/apps-data';
import type { Locale } from '@/lib/i18n';

export interface PromoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  app: ApplicationItem | null;
  locale: Locale;
}

// Icon mapper matching apps-data
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

export function PromoVideoModal({
  isOpen,
  onClose,
  app,
  locale,
}: PromoVideoModalProps) {
  const isRtl = locale === 'ar';
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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

  // Reset active video index when app changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveVideoIndex(0);
    }
  }, [isOpen, app?.id]);

  if (!isOpen || !app) {
    return null;
  }

  const IconComponent = ICON_MAP[app.iconName] || Layers;
  const title = isRtl ? app.title_ar : app.title_en;
  const description = isRtl ? app.description_ar : app.description_en;
  const category = isRtl ? app.category_ar : app.category_en;
  const features = isRtl ? app.features_ar : app.features_en;

  const domain = (() => {
    try {
      return new URL(app.url).hostname;
    } catch {
      return app.url;
    }
  })();

  // ═══════════════════════════════════════════════════════════════════════════
  // PROMOTIONAL & EXPLAINER VIDEOS DATA
  // Default 2 high-quality promotional videos per app (can be overridden in app.promoVideos)
  // ═══════════════════════════════════════════════════════════════════════════
  const defaultVideos: PromoVideoItem[] = [
    {
      id: 'promo-1',
      title_en: 'System Overview & Operational Tour',
      title_ar: 'نظرة عامة والبرومو التعريفي بالمنظومة',
      description_en:
        'A comprehensive overview of core capabilities, input parameters, and industrial workflows tailored for production teams.',
      description_ar:
        'استعراض شامل لأهم وظائف التطبيق، مدخلات العمليات الصناعية، ولوحات المراقبة اللحظية المصممة لمهندسي وفنيي الإنتاج.',
      duration: '01:45',
      // High-quality public sample MP4 (replace with your actual video URL or embed)
      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      posterImage: app.image,
    },
    {
      id: 'promo-2',
      title_en: 'In-Depth Engineering & Technical Walkthrough',
      title_ar: 'دليل الاستخدام الفني والتشغيل الهندسي المتقدم',
      description_en:
        'Step-by-step walkthrough covering calibration calculations, tolerance monitoring, and exporting industrial reports.',
      description_ar:
        'شرح تطبيقي مفصل لطريقة إدخال البيانات، ضبط حدود التفاوت المقبولة، وإصدار التقارير الفنية المعتمدة للمصنع.',
      duration: '02:30',
      // Second high-quality public sample MP4
      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      posterImage: app.image,
    },
  ];

  const videosList: PromoVideoItem[] =
    app.promoVideos && app.promoVideos.length > 0
      ? app.promoVideos
      : defaultVideos;

  const activeVideo = videosList[activeVideoIndex] || videosList[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
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
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-700/80 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white shadow-2xl shadow-black/70 animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-4 py-3.5 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* App Icon */}
            <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-slate-800 text-white shadow-md shadow-sky-600/20 border border-sky-500/30">
              <IconComponent className="size-5 text-sky-200" />
            </div>

            {/* Title & Meta */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  id="promo-modal-title"
                  className="text-sm sm:text-base md:text-lg font-bold text-white truncate"
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

          {/* Close Button ("X") */}
          <button
            type="button"
            onClick={onClose}
            aria-label={isRtl ? 'إغلاق النافذة' : 'Close modal'}
            className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full bg-slate-800/80 text-slate-400 transition-colors hover:bg-rose-500/20 hover:text-rose-300 hover:border hover:border-rose-500/40 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Video Selection Tabs (Switch between Video 1 and Video 2) */}
        {videosList.length > 1 && (
          <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950/60 px-4 py-2.5 sm:px-6 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 shrink-0 me-1">
              {isRtl ? 'مقاطع الفيديو:' : 'Promo Videos:'}
            </span>
            {videosList.map((vid, idx) => {
              const isSelected = activeVideoIndex === idx;
              const vidTitle = isRtl ? vid.title_ar : vid.title_en;
              return (
                <button
                  key={vid.id || idx}
                  type="button"
                  onClick={() => {
                    setActiveVideoIndex(idx);
                    if (videoRef.current) {
                      videoRef.current.load();
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                    isSelected
                      ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-md shadow-sky-600/30 border border-sky-400/40'
                      : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                  }`}
                >
                  <Play className={`size-3 ${isSelected ? 'fill-white text-white' : 'fill-slate-400 text-slate-400'}`} />
                  <span>
                    {isRtl ? `فيديو ${idx + 1}:` : `Video ${idx + 1}:`} {vidTitle}
                  </span>
                  {vid.duration && (
                    <span className="rounded bg-black/30 px-1.5 py-0.2 text-[10px] text-slate-300">
                      {vid.duration}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Video Player Section */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-black shadow-inner shadow-black">
            {/* 
              ═══════════════════════════════════════════════════════════════════
              REPLACE WITH YOUR ACTUAL PROMO VIDEO (MP4 OR IFRAME EMBED):
              
              Option 1 (Default): HTML5 Video player for self-hosted .mp4 files
              Option 2: Replace with YouTube/Vimeo iframe:
              <iframe
                src="https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID"
                title={isRtl ? activeVideo.title_ar : activeVideo.title_en}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              ═══════════════════════════════════════════════════════════════════
            */}
            {activeVideo.embedUrl ? (
              <iframe
                src={activeVideo.embedUrl}
                title={isRtl ? activeVideo.title_ar : activeVideo.title_en}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                ref={videoRef}
                key={activeVideo.videoUrl}
                controls
                playsInline
                preload="metadata"
                poster={activeVideo.posterImage || app.image}
                className="h-full w-full object-cover"
              >
                <source src={activeVideo.videoUrl} type="video/mp4" />
                <p className="p-4 text-center text-xs text-slate-400">
                  {isRtl
                    ? 'متصفحك لا يدعم تشغيل هذا الفيديو مباشرة.'
                    : 'Your browser does not support the video tag.'}
                </p>
              </video>
            )}

            {/* Video Watermark / Corner Pill */}
            <div className="absolute top-3 end-3 pointer-events-none">
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-950/75 backdrop-blur-md px-2 py-1 text-[10px] font-semibold text-sky-300 border border-sky-500/20">
                <Film className="size-3 text-sky-400" />
                <span>PolymerOps Demo</span>
              </span>
            </div>
          </div>

          {/* Active Video Info */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-sky-200">
                {isRtl ? activeVideo.title_ar : activeVideo.title_en}
              </h3>
              <span className="text-[11px] font-medium text-amber-400/90 flex items-center gap-1">
                <AlertCircle className="size-3" />
                <span>
                  {isRtl
                    ? 'الفيديو نموذج توضيحي لميزات النظام'
                    : 'Illustrative video showcasing core features'}
                </span>
              </span>
            </div>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isRtl ? activeVideo.description_ar : activeVideo.description_en}
            </p>
          </div>

          {/* App Key Capabilities Highlights */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              {isRtl ? 'أهم إمكانيات التطبيق الصناعية:' : 'Core Application Capabilities:'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {features.slice(0, 3).map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs text-slate-300"
                >
                  <CheckCircle2 className="size-3.5 shrink-0 text-sky-400" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800 bg-slate-950 px-4 py-3 sm:px-6">
          <p className="text-xs text-slate-400 text-center sm:text-start">
            {isRtl
              ? 'يمكنك الانتقال لتشغيل التطبيق والاطلاع على الواجهة الفعلية.'
              : 'You can launch the live environment and explore the active interface.'}
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Secondary Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-bold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              {isRtl ? 'إغلاق' : 'Close'}
            </button>

            {/* Primary Launch App CTA */}
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-600 via-sky-700 to-sky-800 px-5 py-2 text-xs font-bold text-white shadow-md shadow-sky-600/30 transition-all hover:from-sky-500 hover:to-sky-700 hover:shadow-sky-500/20 active:scale-[0.98]"
            >
              <span>{isRtl ? 'تشغيل التطبيق الآن' : 'Launch Application'}</span>
              <ExternalLink className="size-3.5 ms-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
