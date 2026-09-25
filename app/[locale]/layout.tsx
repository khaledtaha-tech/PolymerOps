import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';
import { getBrand } from '@/lib/db';
import { Header,Footer } from '@/components/site-shell';
import type { Metadata } from 'next';
export const dynamic = 'force-dynamic';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;
 if(!isLocale(locale))return {};
 const brand=await getBrand();
 const description=locale==='ar'?'استشارات فنية وبرامج صناعية وتقييم خامات وكفاءات متخصصة لمصانع البلاستيك.':'Technical consulting, industrial software, materials review, and specialist talent for plastics manufacturing.';
 return {title:{default:brand,template:`%s | ${brand}`},description,alternates:{languages:{ar:'/ar',en:'/en'}},openGraph:{title:brand,description,type:'website'}};
}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) {const {locale}=await params;if(!isLocale(locale))notFound();const brand=await getBrand();return <div dir={locale==='ar'?'rtl':'ltr'} lang={locale}><Header locale={locale} brand={brand}/><main>{children}</main><Footer locale={locale} brand={brand}/></div>}
export async function generateStaticParams(){return [{locale:'ar'},{locale:'en'}]}
