import { Detail } from '@/components/catalog';import { isLocale } from '@/lib/i18n';import { notFound } from 'next/navigation';
export default async function Page({params}:{params:Promise<{locale:string;slug:string}>}){const {locale,slug}=await params;if(!isLocale(locale))notFound();return await Detail({locale,kind:'insight',slug})||notFound()}
