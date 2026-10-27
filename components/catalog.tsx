import React from 'react';
import Link from 'next/link';
import { getContent, type ContentKind } from '@/lib/db';
import { copy, localize, type Locale } from '@/lib/i18n';
import { PageHeading } from './site-shell';
import { ServicesGrid } from '@/components/services-grid';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';

export async function Catalog({
  locale,
  kind,
}: {
  locale: Locale;
  kind: ContentKind;
}) {
  const t = copy[locale];
  const items = await getContent(kind);
  const isRtl = locale === 'ar';
  const base =
    kind === 'service'
      ? 'services'
      : kind === 'material'
      ? 'materials'
      : kind === 'insight'
      ? 'insights'
      : 'software';
  const title =
    kind === 'service'
      ? t.services
      : kind === 'material'
      ? t.materials
      : kind === 'insight'
      ? t.insights
      : t.software;

  const description =
    kind === 'material'
      ? t.materialNote
      : kind === 'software'
      ? isRtl
        ? 'منظومة التطبيقات والحلول الرقمية المتخصصة في صناعة وبثق البلاستيك مع روابط وصول مباشرة ومستمرة.'
        : 'Specialized industrial applications and engineering calculation suites for plastics manufacturing.'
      : kind === 'service'
      ? isRtl
        ? 'تطبيقات رقمية واستشارات هندسية متخصصة لتحسين خطوط الإنتاج وتقييم الخامات وخفض الهالك.'
        : 'Production software suites and expert engineering consulting for plastics manufacturing plants.'
      : undefined;

  return (
    <>
      <PageHeading eyebrow={title} title={title} description={description} />

      {/* If Services or Software, display the live Applications Grid first */}
      {(kind === 'service' || kind === 'software') && (
        <div className="shell py-12 md:py-16">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900">
              {isRtl ? 'التطبيقات والمنظومات الرقمية' : 'Digital Applications & Systems'}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {isRtl
                ? 'جميع التطبيقات المتاحة تم اختبارها وتشغيلها في بيئات صناعية حقيقية.'
                : 'All listed applications are tested and running across production industrial environments.'}
            </p>
          </div>
          <ServicesGrid locale={locale} />
        </div>
      )}

      {/* For Materials, Insights, or specific DB items */}
      {(kind === 'material' || kind === 'insight' || items.length > 0) && (
        <div className="shell py-12 md:py-16 border-t border-slate-200">
          {kind === 'service' && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {isRtl ? 'الاستشارات الهندسية المتخصصة' : 'Specialized Engineering Consulting'}
              </h2>
            </div>
          )}

          {items.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => {
                const v = localize(item, locale);
                return (
                  <Link
                    className="card group flex flex-col justify-between p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg"
                    key={item.id}
                    href={`/${locale}/${base}/${item.slug}`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="eyebrow">{v.category || title}</p>
                        {kind === 'software' && (
                          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                            {item.status}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-sky-700 transition">
                        {v.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {v.summary}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-sky-700">
                      <span>{t.read}</span>
                      <span>{isRtl ? '←' : '→'}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : kind !== 'service' && kind !== 'software' ? (
            <div className="card p-10 text-center text-slate-600">
              {t.empty}
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export async function Detail({
  locale,
  kind,
  slug,
}: {
  locale: Locale;
  kind: ContentKind;
  slug: string;
}) {
  const items = await getContent(kind);
  const item = items.find((x) => x.slug === slug);
  if (!item) return null;

  const t = copy[locale];
  const v = localize(item, locale);
  const isRtl = locale === 'ar';
  const type =
    kind === 'software' ? 'demo' : kind === 'material' ? 'material' : 'consulting';

  return (
    <>
      <PageHeading
        eyebrow={v.category || t.services}
        title={v.title}
        description={v.summary}
      />
      <article className="shell grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        <div className="article-body max-w-3xl text-lg text-slate-700 leading-relaxed">
          {v.body}
        </div>
        <aside className="space-y-6">
          <div className="card p-6 shadow-sm">
            <h4 className="font-bold text-slate-900 text-sm">
              {kind === 'software' ? t.availability : t.serviceScope}
            </h4>
            {kind === 'software' && (
              <p className="mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded inline-block">
                {item.status}
              </p>
            )}
            {kind === 'material' && (
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                {t.materialNote}
              </p>
            )}
            <Link
              className="btn-primary mt-6 w-full text-center text-xs sm:text-sm font-bold shadow-sm"
              href={`/${locale}/request?type=${type}&subject=${encodeURIComponent(
                v.title
              )}`}
            >
              <span>{kind === 'software' ? t.demo : t.request}</span>
              <span>{isRtl ? '↖' : '↗'}</span>
            </Link>
          </div>

          {/* Quick link to Master Vault */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-600">
            <p className="font-bold text-slate-900 mb-1">PolymerOps Master Vault</p>
            <p className="mb-3 text-[11px] text-slate-500">
              {isRtl
                ? 'استكشف بيئة التطبيقات السحابية الموحدة ومستودعات الأنظمة.'
                : 'Explore the centralized DevOps hub and application repos.'}
            </p>
            <a
              href="https://master.polymerops.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-sky-700 hover:underline"
            >
              <span>{isRtl ? 'فتح المنصة' : 'Open Vault'}</span>
              <span>↗</span>
            </a>
          </div>
        </aside>
      </article>
    </>
  );
}
