import Link from 'next/link';
import { PageHeading } from '@/components/site-shell';
import { copy, isLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { Factory, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  const isRtl = locale === 'ar';

  return (
    <>
      <PageHeading
        eyebrow={t.consulting}
        title={t.capabilities}
        description={t.capabilitiesIntro}
      />
      <section className="shell grid gap-6 py-16 md:grid-cols-2 lg:grid-cols-3">
        {t.serviceTypes.map((s, i) => (
          <div
            className="card group flex flex-col justify-between p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg"
            key={s}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-lg bg-sky-50 font-mono text-sm font-black text-sky-700 border border-sky-200/60">
                  0{i + 1}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {isRtl ? 'استشارة صناعية' : 'Advisory'}
                </span>
              </div>
              <h2 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-sky-700 transition">
                {s}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {t.serviceDescriptions[i]}
              </p>
            </div>
            <div className="mt-6 border-t border-slate-100 pt-4">
              <Link
                href={`/${locale}/request?type=consulting&subject=${encodeURIComponent(s)}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900"
              >
                <span>{isRtl ? 'طلب استشارة حول هذا النطاق' : 'Request Consultation'}</span>
                <span>{isRtl ? '←' : '→'}</span>
              </Link>
            </div>
          </div>
        ))}
      </section>
      <div className="shell pb-20">
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center flex flex-col items-center justify-center gap-4">
          <h3 className="text-xl font-bold text-slate-900">
            {isRtl ? 'هل لديك تحدٍ تشغيلي أو استفسار محدد؟' : 'Have a specific operational challenge?'}
          </h3>
          <p className="text-sm text-slate-600 max-w-xl">
            {isRtl
              ? 'أرسل بيانات الخط أو الخامة أو المشكلة، وسيقوم فريقنا الهندسي بدراسة المتطلبات وتقديم مقترح نطاق العمل.'
              : 'Share your line data, material specifications, or process problem. Our engineering specialists will analyze the requirements.'}
          </p>
          <Link className="btn-primary mt-2" href={`/${locale}/request?type=consulting`}>
            <span>{t.request}</span>
            <span>{isRtl ? '↖' : '↗'}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
