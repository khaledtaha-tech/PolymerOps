import Link from 'next/link';
import { PageHeading } from '@/components/site-shell';
import { copy, isLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { Briefcase, Building2, UserCheck, ArrowUpRight } from 'lucide-react';

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
        eyebrow={t.talent}
        title={t.talent}
        description={t.noGuarantee}
      />

      {/* Featured Live Platform: Smart Job Hunter */}
      <div className="shell pt-12">
        <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-900 via-slate-900 to-sky-950 p-8 md:p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 border border-sky-400/30 px-3 py-1 text-xs font-bold text-sky-300 mb-3">
              <Briefcase className="size-3.5" />
              <span>{isRtl ? 'منصة التوظيف الصناعي المباشر' : 'Live Plastics Talent Portal'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Smart Job Hunter
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              {isRtl
                ? 'بوابة رقمية متخصصة لربط مهندسي وكيميائيي ومشرفي مصانع البلاستيك بأفضل الفرص الوظيفية في قطاع التصنيع.'
                : 'Direct digital portal matching plastics extrusion engineers, formulation chemists, and plant managers with specialized industrial roles.'}
            </p>
          </div>
          <a
            href="https://jobhunter.polymerops.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent shrink-0 text-sm font-bold shadow-md"
          >
            <span>{isRtl ? 'زيارة المنصة الآن' : 'Visit Job Hunter'}</span>
            <span>{isRtl ? '↖' : '↗'}</span>
          </a>
        </div>
      </div>

      <div className="shell grid gap-6 py-12 md:py-16 md:grid-cols-2">
        <div className="card p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="eyebrow">01 / {isRtl ? 'طلب كفاءات' : 'Hire'}</span>
              <Building2 className="size-6 text-sky-700" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-slate-900">{t.talentFactory}</h2>
            <p className="mt-4 leading-relaxed text-slate-600">{t.talentFactoryBody}</p>
          </div>
          <Link className="btn-primary mt-8 w-fit" href={`/${locale}/request?type=factory-talent`}>
            <span>{t.request}</span>
            <span>{isRtl ? '↖' : '↗'}</span>
          </Link>
        </div>

        <div className="card p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="eyebrow">02 / {isRtl ? 'انضمام كفاءة' : 'Join'}</span>
              <UserCheck className="size-6 text-amber-600" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-slate-900">{t.talentCandidate}</h2>
            <p className="mt-4 leading-relaxed text-slate-600">{t.talentCandidateBody}</p>
          </div>
          <Link className="btn-outline mt-8 w-fit" href={`/${locale}/request?type=candidate`}>
            <span>{t.send}</span>
            <span>{isRtl ? '↖' : '↗'}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
